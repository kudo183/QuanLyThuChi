using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class MucThu
    {
        public MucThu()
        {
            ThuN = new HashSet<Thu>();
        }

        [Key]
        public int Ma { get; set; }
        public string TenMucThu { get; set; }

        public virtual ICollection<Thu> ThuN { get; set; }
    }
}
