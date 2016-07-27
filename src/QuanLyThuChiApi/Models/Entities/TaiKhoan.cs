using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class TaiKhoan : IEntity
    {
        public TaiKhoan()
        {
            ThuN = new HashSet<Thu>();
            ChiN = new HashSet<Chi>();
        }

        [Key]
        public int Ma { get; set; }
        public int MaUser { get; set; }
        public string TenTaiKhoan { get; set; }
        public DateTime NgayTao { get; set; }
        public long SoDuBanDau { get; set; }
        public long SoDuHienTai { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Thu> ThuN { get; set; }
        public virtual ICollection<Chi> ChiN { get; set; }

        public int GetKey()
        {
            return Ma;
        }

        public int GetUserID()
        {
            return MaUser;
        }

        public void SetUserID(int userID)
        {
            MaUser = userID;
        }
    }
}
