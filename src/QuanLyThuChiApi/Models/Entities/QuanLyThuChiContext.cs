using Microsoft.EntityFrameworkCore;

namespace QuanLyThuChiApi.Models.Entities
{
    public partial class QuanLyThuChiContext : DbContext
    {
        public QuanLyThuChiContext(DbContextOptions<QuanLyThuChiContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.PasswordHash).IsRequired();
            });

            modelBuilder.Entity<MucThu>(entity =>
            {
                entity.Property(e => e.TenMucThu).IsRequired();
            });

            modelBuilder.Entity<MucChi>(entity =>
            {
                entity.Property(e => e.TenMucChi).IsRequired();
                entity.HasOne(d => d.User)
                    .WithMany(p => p.MucChiN)
                    .HasForeignKey(d => d.MaUser);
            });

            modelBuilder.Entity<TaiKhoan>(entity =>
            {
                entity.Property(e => e.TenTaiKhoan).IsRequired();
                entity.Property(e => e.NgayTao).IsRequired();
                entity.Property(e => e.SoDuBanDau).IsRequired();
                entity.Property(e => e.SoDuHienTai).IsRequired();
                entity.HasOne(d => d.User)
                    .WithMany(p => p.TaiKhoanN)
                    .HasForeignKey(d => d.MaUser);
            });

            modelBuilder.Entity<Thu>(entity =>
            {
                entity.Property(e => e.SoTien).IsRequired();
                entity.Property(e => e.Ngay).IsRequired();
                entity.Property(e => e.Gio).IsRequired();
                entity.HasOne(d => d.TaiKhoan)
                    .WithMany(p => p.ThuN)
                    .HasForeignKey(d => d.MaTaiKhoan);
                entity.HasOne(d => d.MucThu)
                    .WithMany(p => p.ThuN)
                    .HasForeignKey(d => d.MaMucThu);
            });

            modelBuilder.Entity<Chi>(entity =>
            {
                entity.Property(e => e.SoTien).IsRequired();
                entity.Property(e => e.GhiChu).IsRequired();
                entity.Property(e => e.Ngay).IsRequired();
                entity.Property(e => e.Gio).IsRequired();
                entity.HasOne(d => d.TaiKhoan)
                    .WithMany(p => p.ChiN)
                    .HasForeignKey(d => d.MaTaiKhoan);
                entity.HasOne(d => d.MucChi)
                    .WithMany(p => p.ChiN)
                    .HasForeignKey(d => d.MaMucChi);
                entity.HasOne(d => d.User)
                    .WithMany(p => p.ChiN)
                    .HasForeignKey(d => d.MaUser);
            });
        }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<TaiKhoan> TaiKhoan { get; set; }
        public virtual DbSet<MucThu> MucThu { get; set; }
        public virtual DbSet<MucChi> MucChi { get; set; }
        public virtual DbSet<Thu> Thu { get; set; }
        public virtual DbSet<Chi> Chi { get; set; }
    }
}
