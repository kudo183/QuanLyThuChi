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
        public DateTime NgayGio { get; set; }

        public virtual User User { get; set; }
        public virtual MucChi MucChi { get; set; }
        public virtual TaiKhoan TaiKhoan { get; set; }
        
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
