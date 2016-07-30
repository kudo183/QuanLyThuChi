using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System.Collections.Generic;

namespace QuanLyThuChiApi.Controllers
{
    public class TaiKhoanController : BaseEntityController<TaiKhoanDto,TaiKhoan>
    {
        public override SwaActionResult ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            SwaActionResult result = null;

            switch (actionName)
            {
                case "getall":
                    var query = EntitiesFilteredByUser;
                    result = GetAll(query);
                    break;
                case "save":
                    result = Save(parameter["json"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }    
    }
}
