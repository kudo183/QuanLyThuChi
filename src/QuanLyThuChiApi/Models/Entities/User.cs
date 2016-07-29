using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public class User
    {
        public User()
        {
            TaiKhoanN = new HashSet<TaiKhoan>();
        }

        [Key]
        public int Ma { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public System.DateTime NgayTao { get; set; }

        public virtual ICollection<MucChi> MucChiN { get; set; }
        public virtual ICollection<TaiKhoan> TaiKhoanN { get; set; }
    }
}
