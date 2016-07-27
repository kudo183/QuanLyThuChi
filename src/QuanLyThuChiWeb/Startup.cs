using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using huypq.SwaMiddleware;
using Microsoft.AspNetCore.DataProtection;
using QuanLyThuChiApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace QuanLyThuChiWeb
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = @"Server=.;Database=QuanLyThuChi;Trusted_Connection=True;";
            services.AddDbContext<QuanLyThuChiContext>(
                options => options.UseSqlServer(connection), ServiceLifetime.Transient);

            services.AddDataProtection()
                .PersistKeysToFileSystem(new System.IO.DirectoryInfo(@"c:\temp-keys"))
                .ProtectKeysWithDpapi();

            services.AddRouting();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseSwa("QuanLyThuChiApi", new SwaOptions()
            {
                IsUseTokenAuthentication = true,
                TokenEnpoint = "user.token",
                AllowAnonymousActions = new System.Collections.Generic.List<string>()
                {
                    "user.register"
                },
                JsonSerializer = QuanLyThuChiApi.Helper.JsonConverter.Create()
            });
        }
    }
}
