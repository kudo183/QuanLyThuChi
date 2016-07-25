using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using QuanLyThuChiApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using huypq.SwaMiddleware;
using Microsoft.AspNetCore.DataProtection;

namespace QuanLyThuChiApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = @"Server=.;Database=QuanLyThuChi;Trusted_Connection=True;";
            services.AddDbContext<QuanLyThuChiContext>(options => options.UseSqlServer(connection));
            services.AddDataProtection()
                .PersistKeysToFileSystem(new System.IO.DirectoryInfo(@"c:\temp-keys"))
                .ProtectKeysWithDpapi();
            services.AddRouting();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder => builder.WithOrigins("http://localhost:5000").AllowAnyHeader().AllowAnyMethod());
            
            app.UseSwa("QuanLyThuChiApi", new SwaOptions()
            {
                IsUseTokenAuthentication = true,
                TokenEnpoint = "user.token",
                AllowAnonymousActions = new System.Collections.Generic.List<string>()
                {
                    "user.register"
                }
            });
        }
    }
}
