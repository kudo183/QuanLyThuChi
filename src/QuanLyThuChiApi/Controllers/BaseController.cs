using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Entities;
using System;

namespace QuanLyThuChiApi.Controllers
{
    public abstract class BaseController : SwaController, IDisposable
    {
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
