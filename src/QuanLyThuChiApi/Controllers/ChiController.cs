using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace QuanLyThuChiApi.Controllers
{
    public class ChiController : BaseController
    {
        public override SwaActionResult ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            SwaActionResult result = null;

            switch (actionName)
            {
                case "get":
                    result = Get(parameter["json"].ToString());
                    break;
                case "save":
                    result = Save(parameter["json"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }

        private IQueryable<Chi> _chiByUser
        {
            get
            {
                return DBContext.Chi.Where(p => p.MaUser == UserId);
            }
        }

        public SwaActionResult Get(string json)
        {
            var query = _chiByUser;
            return base.Get<ChiDto, Chi>(json, query);
        }

        public SwaActionResult Save(string json)
        {
            return base.Save<ChiDto, Chi>(json);
        }
    }
}
