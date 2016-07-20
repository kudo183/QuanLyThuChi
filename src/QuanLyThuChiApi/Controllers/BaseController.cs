using QuanLyThuChiApi.Models.Entities;

namespace QuanLyThuChiApi.Controllers
{
    public abstract class BaseController : huypq.SwaMiddleware.SwaController
    {
        protected QuanLyThuChiContext DBContext
        {
            get { return (QuanLyThuChiContext)App.ApplicationServices.GetService(typeof(QuanLyThuChiContext)); }
        }
    }
}
