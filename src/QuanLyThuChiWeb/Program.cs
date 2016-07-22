using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace QuanLyThuChiWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var hostBuilder = new WebHostBuilder()
                .UseKestrel()
#if DEBUG
                .UseContentRoot(Directory.GetCurrentDirectory())
#elif RELEASE
                .UseContentRoot(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
#endif
                .UseIISIntegration()
                .UseStartup<Startup>();

            if (args.Length > 0)
            {
                hostBuilder.UseUrls(args[0]);
            }

            hostBuilder.Build().Run();
        }
    }
}
