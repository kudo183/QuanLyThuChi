using huypq.SwaMiddleware;
using Microsoft.EntityFrameworkCore;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuanLyThuChiApi.Controllers
{
    public abstract class BaseController : SwaController, IDisposable
    {
        protected class PagingResult<T>
        {
            public int totalItemCount { get; set; }
            public int pageIndex { get; set; }
            public int pageCount { get; set; }
            public List<T> items { get; set; }
        }

        protected class ChangedItem<T>
        {
            public string State { get; set; }
            public T Data { get; set; }
        }

        private QuanLyThuChiContext _dBContext;
        protected QuanLyThuChiContext DBContext
        {
            get
            {
                if (_dBContext == null)
                {
                    _dBContext = (QuanLyThuChiContext)App.ApplicationServices.GetService(typeof(QuanLyThuChiContext));
                }
                return _dBContext;
            }
        }

        private string _email = null;
        protected string Email
        {
            get
            {
                if (_email == null)
                {
                    _email = TokenModel.User.Split(';')[0];
                }
                return _email;
            }
        }

        private int _userId = 0;
        protected int UserId
        {
            get
            {
                if (_userId == 0)
                {
                    _userId = int.Parse(TokenModel.User.Split(';')[1]);
                }
                return _userId;
            }
        }

        protected SwaActionResult SaveChanges()
        {
            try
            {
                DBContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }
            //need return an json object, if just return status code, jquery will treat as fail.
            return CreateJsonResult("OK");
        }

        protected SwaActionResult Save<T, T1>(string json)
            where T : class, IDto<T1>
            where T1 : class, IEntity
        {
            var items = Helper.JsonConverter.Deserialize<List<ChangedItem<T>>>(json);

            var added = new List<T1>();

            foreach (var changeItem in items)
            {
                T1 item = changeItem.Data.ToEntity();

                switch (changeItem.State)
                {
                    case Constant.ChangeState.Insert:
                        item.SetUserID(UserId);
                        DBContext.Set<T1>().Add(item);
                        added.Add(item);
                        break;
                    case Constant.ChangeState.Update:
                        if (item.GetUserID() != UserId)
                        {
                            return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
                        }
                        DBContext.Entry(item).State = EntityState.Modified;
                        break;
                    case Constant.ChangeState.Delete:
                        if (item.GetUserID() != UserId)
                        {
                            return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
                        }
                        DBContext.Set<T1>().Remove(item);
                        break;
                    default:
                        return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
                }
            }

            try
            {
                DBContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }

            return CreateJsonResult(added.Select(p => p.GetKey()));
        }

        public void Dispose()
        {
            if (_dBContext != null)
            {
                _dBContext.Dispose();
                _dBContext = null;
            }
        }
    }
}
