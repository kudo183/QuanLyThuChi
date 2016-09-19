using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class MucChi : IEntity
    {
        public MucChi()
        {
            ChiN = new HashSet<Chi>();
        }

        [Key]
        public int Ma { get; set; }
        public int MaUser { get; set; }
        public string TenMucChi { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Chi> ChiN { get; set; }
    }
}
