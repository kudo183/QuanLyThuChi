using huypq.SwaMiddleware;
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
                default:
                    break;
            }

            return result;
        }

        public SwaActionResult GetAll()
        {
            return CreateJsonResult(DBContext.TaiKhoan.Select(p => p.TenTaiKhoan).ToList());
        }
    }
}
