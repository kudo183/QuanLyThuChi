using System.Collections.Generic;
using System.Linq;
using huypq.SwaMiddleware;
using QuanLyThuChiApi.Models.Dto;
using QuanLyThuChiApi.Models.Entities;

namespace QuanLyThuChiApi.Controllers
{
    public class MucChiController : BaseController
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

        private IQueryable<MucChi> _mucChiByUser
        {
            get
            {
                return DBContext.MucChi.Where(p => p.MaUser == UserId);
            }
        }

        public SwaActionResult GetAll()
        {
            var result = new PagingResult<MucChiDto>();
            result.items = _mucChiByUser.AsEnumerable().Select(p =>
            {
                var dto = new MucChiDto();
                dto.FromEntity(p);
                return dto;
            }).ToList();

            result.totalItemCount = result.items.Count;
            result.pageCount = 1;
            result.pageIndex = 1;
            return CreateJsonResult(result);
        }

        public SwaActionResult Save(string json)
        {
            return base.Save<MucChiDto, MucChi>(json);
        }
    }
}
