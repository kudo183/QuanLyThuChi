using QuanLyThuChiApi.Models.Entities;
using System;

namespace QuanLyThuChiApi.Models.Dto
{
    public class ChiDto : IDto<Chi>
    {
        public int ma { get; set; }
        public int maUser { get; set; }
        public int maTaiKhoan { get; set; }
        public int maMucChi { get; set; }
        public long soTien { get; set; }
        public DateTime ngay { get; set; }
        public TimeSpan gio { get; set; }
        public string ghiChu { get; set; }

        public Chi ToEntity()
        {
            return new Chi()
            {
                Ma = ma,
                MaUser = maUser,
                MaTaiKhoan = maTaiKhoan,
                MaMucChi = maMucChi,
                SoTien = soTien,
                Ngay = ngay,
                Gio = gio,
                GhiChu = ghiChu
            };
        }

        public int GetKey()
        {
            return ma;
        }

        public void FromEntity(Chi chi)
        {
            ma = chi.Ma;
            maUser = chi.MaUser;
            maTaiKhoan = chi.MaTaiKhoan;
            maMucChi = chi.MaMucChi;
            soTien = chi.SoTien;
            ngay = chi.Ngay;
            gio = chi.Gio;
            ghiChu = chi.GhiChu;
        }
    }
}
