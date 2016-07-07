using Microsoft.AspNetCore.Mvc;
using QuanLyThuChiApi.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace QuanLyThuChiApi.Controllers
{
    [Route("[controller]")]
    public class TaiKhoanController : Controller
    {
        private QuanLyThuChiContext _context;

        public TaiKhoanController(QuanLyThuChiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<string> Index()
        {
            return _context.TaiKhoan.Select(p => p.TenTaiKhoan).ToList();
        }
    }
}
