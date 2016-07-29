using QuanLyThuChiApi.Models.Entities;

namespace QuanLyThuChiApi.Models.Dto
{
    public class MucChiDto : IDto<MucChi>
    {
        public int ma { get; set; }
        public int maUser { get; set; }
        public string tenMucChi { get; set; }
        
        public void FromEntity(MucChi entity)
        {
            ma = entity.Ma;
            maUser = entity.MaUser;
            tenMucChi = entity.TenMucChi;
        }
        
        public int GetKey()
        {
            return ma;
        }

        public MucChi ToEntity()
        {
            return new MucChi()
            {
                Ma = ma,
                MaUser = maUser,
                TenMucChi = tenMucChi
            };
        }
    }
}
