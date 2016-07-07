using System;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class Thu
    {
        [Key]
        public int Ma { get; set; }
        public int MaMucThu { get; set; }
        public int MaTaiKhoan { get; set; }
        public long SoTien { get; set; }
        public DateTime Ngay { get; set; }
        public TimeSpan? Gio { get; set; }

        public virtual MucThu MucThu { get; set; }
        public virtual TaiKhoan TaiKhoan { get; set; }
    }
}
