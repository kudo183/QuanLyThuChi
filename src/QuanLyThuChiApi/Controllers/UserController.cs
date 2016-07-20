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
                    result = Token(parameter["user"].ToString(), parameter["password"].ToString());
                    break;
                case "register":
                    result = Register(parameter["user"].ToString(), parameter["password"].ToString());
                    break;
                default:
                    break;
            }

            return result;
        }

        public SwaActionResult Register(string user, string password)
        {
            if (DBContext.User.Any(p => p.Email == user))
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Conflict);
            }
            var hasher = new huypq.Crypto.PasswordHash();
            var entity = new User()
            {
                Email = user,
                PasswordHash = hasher.HashedBase64String(password)
            };
            DBContext.User.Add(entity);
            try
            {
                DBContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.InternalServerError);
            }
            return CreateStatusResult();
        }

        public SwaActionResult Token(string user, string password)
        {
            var entity = DBContext.User.FirstOrDefault(p => p.Email == user);
            if (entity == null)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Unauthorized);
            }

            var result = huypq.Crypto.PasswordHash.VerifyHashedPassword(entity.PasswordHash, password);
            if (result == false)
            {
                return CreateStatusResult(System.Net.HttpStatusCode.Unauthorized);
            }

            return CreateJsonResult(new SwaTokenModel() { User = user });
        }
    }
}
