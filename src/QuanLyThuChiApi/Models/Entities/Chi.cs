using System;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class Chi : IEntity
    {
        [Key]
        public int Ma { get; set; }
        public int MaUser { get; set; }
        public int MaMucChi { get; set; }
        public int MaTaiKhoan { get; set; }
        public long SoTien { get; set; }
        public DateTime Ngay { get; set; }
        public TimeSpan Gio { get; set; }
        public string GhiChu { get; set; }

        public virtual User User { get; set; }
        public virtual MucChi MucChi { get; set; }
        public virtual TaiKhoan TaiKhoan { get; set; }
    }
}
