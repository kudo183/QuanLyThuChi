using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QuanLyThuChiApi.Controllers
{
    public class TaiKhoanController : BaseController
    {
        public override SwaActionResult ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            SwaActionResult result = null;

            switch (actionName)
            {
                case "getall":
                    result = GetAll();
                    break;
                case "save":
                    result = Save(parameter["json"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }

        private IQueryable<TaiKhoan> _taiKhoanByUser
        {
            get
            {
                return DBContext.TaiKhoan.Where(p => p.MaUser == UserId);
            }
        }

        public SwaActionResult GetAll()
        {
            var result = new PagingResult<TaiKhoanDto>();
            result.items = _taiKhoanByUser.AsEnumerable().Select(p =>
            {
                TaiKhoanDto tk = new TaiKhoanDto();
                tk.FromEntity(p);
                return tk;
            }).ToList();

            result.totalItemCount = result.items.Count;
            result.pageCount = 1;
            result.pageIndex = 1;
            return CreateJsonResult(result);
        }

        public SwaActionResult Save(string json)
        {
            return base.Save<TaiKhoanDto, TaiKhoan>(json);
        }
    }
}
