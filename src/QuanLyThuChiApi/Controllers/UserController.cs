using QuanLyThuChiApi.Models.Entities;
using System;
using System.Linq;
using System.Collections.Generic;
using huypq.SwaMiddleware;

namespace QuanLyThuChiApi.Controllers
{
    public class UserController : BaseController
    {
        public override SwaActionResult ActionInvoker(string actionName, Dictionary<string, object> parameter)
        {
            SwaActionResult result = null;

            switch (actionName)
            {
                case "token":
                    result = Token(parameter["json"].ToString());
                    break;
                case "register":
                    result = Register(parameter["json"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }

        private class JsonParameterModel
        {
            public string user { get; set; }
            public string password { get; set; }

            public static JsonParameterModel FromJson(string json)
            {
                var result = Helper.JsonConverter.Deserialize<JsonParameterModel>(json);
                return result;
            }
        }

        public SwaActionResult Register(string json)
        {
            var model = JsonParameterModel.FromJson(json);

            if (DBContext.User.Any(p => p.Email == model.user))
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Conflict);
            }
            var hasher = new huypq.Crypto.PasswordHash();
            var entity = new User()
            {
                Email = model.user,
                PasswordHash = hasher.HashedBase64String(model.password),
                NgayTao = DateTime.UtcNow.Date
            };
            DBContext.User.Add(entity);
            return SaveChanges();
        }

        public SwaActionResult Token(string json)
        {
            var model = JsonParameterModel.FromJson(json);
            if (model == null)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Unauthorized);
            }

            var entity = DBContext.User.FirstOrDefault(p => p.Email == model.user);
            if (entity == null)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Unauthorized);
            }

            var result = huypq.Crypto.PasswordHash.VerifyHashedPassword(entity.PasswordHash, model.password);
            if (result == false)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Unauthorized);
            }

            return CreateJsonResult(new SwaTokenModel() { User = string.Format("{0};{1}", entity.Email, entity.Ma) });
        }
    }
}
