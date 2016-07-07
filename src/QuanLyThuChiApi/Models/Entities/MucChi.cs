using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class MucChi
    {
        public MucChi()
        {
            ChiN = new HashSet<Chi>();
        }

        [Key]
        public int Ma { get; set; }
        public string TenMucChi { get; set; }

        public virtual ICollection<Chi> ChiN { get; set; }
    }
}
