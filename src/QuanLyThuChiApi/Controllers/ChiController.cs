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
                case "add":
                    result = Add(parameter["json"].ToString());
                    break;
                case "update":
                    result = Update(parameter["json"].ToString());
                    break;
                case "remove":
                    result = Remove(parameter["json"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }

        public SwaActionResult Add(string json)
        {
            var temp = Helper.JsonConverter.Deserialize<ChiDto>(json);
            var item = temp.ToEntity();
            item.Ma = 0;
            item.MaUser = UserId;
            DBContext.Chi.Add(item);

            try
            {
                DBContext.SaveChanges();
            }
            catch (System.Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }

            return GetAll(EntitiesFilteredByUser);
        }

        public SwaActionResult Update(string json)
        {
            var temp = Helper.JsonConverter.Deserialize<ChiDto>(json);
            var item = temp.ToEntity();

            if (item.MaUser != UserId)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
            }
            DBContext.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            try
            {
                DBContext.SaveChanges();
            }
            catch (System.Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }

            return GetAll(EntitiesFilteredByUser);
        }

        public SwaActionResult Remove(string json)
        {
            var temp = Helper.JsonConverter.Deserialize<ChiDto>(json);
            var item = temp.ToEntity();
            if (item.MaUser != UserId)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Forbidden);
            }

            DBContext.Chi.Remove(item);

            try
            {
                DBContext.SaveChanges();
            }
            catch (System.Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }

            return GetAll(EntitiesFilteredByUser);
        }
    }
}
