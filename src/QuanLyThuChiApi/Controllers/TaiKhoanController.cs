using System.Collections.Generic;
using System.Linq;

namespace QuanLyThuChiApi.Controllers
{
    public class TaiKhoanController : BaseController
    {
        public override object ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            object result = null;

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

        public IEnumerable<string> GetAll()
        {
            return DBContext.TaiKhoan.Select(p => p.TenTaiKhoan).ToList();
        }
    }
}
