using Newtonsoft.Json;
using QuanLyThuChiApi.Models.Entities;
using System;

namespace QuanLyThuChiApi.Models.Dto
{
    public class TaiKhoanDto : IDto<TaiKhoan>
    {
        public int ma { get; set; }
        public int maUser { get; set; }
        public string tenTaiKhoan { get; set; }
        public DateTime ngayTao { get; set; }
        public long soDuBanDau { get; set; }
        public long soDuHienTai { get; set; }

        public TaiKhoan ToEntity()
        {
            return new TaiKhoan()
            {
                Ma = ma,
                MaUser = maUser,
                TenTaiKhoan = tenTaiKhoan,
                NgayTao = ngayTao,
                SoDuBanDau = soDuBanDau,
                SoDuHienTai = soDuHienTai
            };
        }

        public static TaiKhoanDto FromJson(string json)
        {
            var result = JsonConvert.DeserializeObject<TaiKhoanDto>(json);
            return result;
        }

        public int GetKey()
        {
            return ma;
        }

        public void FromEntity(TaiKhoan taiKhoan)
        {
            ma = taiKhoan.Ma;
            maUser = taiKhoan.MaUser;
            tenTaiKhoan = taiKhoan.TenTaiKhoan;
            ngayTao = taiKhoan.NgayTao;
            soDuBanDau = taiKhoan.SoDuBanDau;
            soDuHienTai = taiKhoan.SoDuHienTai;
        }
    }
}
