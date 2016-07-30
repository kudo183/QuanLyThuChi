using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;
using System.Collections.Generic;

namespace QuanLyThuChiApi.Controllers
{
    public class ChiController : BaseEntityController<ChiDto, Chi>
    {
        public override SwaActionResult ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            SwaActionResult result = null;

            switch (actionName)
            {
                case "get":
                    var query = EntitiesFilteredByUser;
                    result = Get(parameter["json"].ToString(), query);
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
