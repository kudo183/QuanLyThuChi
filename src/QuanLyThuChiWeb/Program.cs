using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace QuanLyThuChiWeb
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
#if DEBUG
                .UseContentRoot(Directory.GetCurrentDirectory())
#elif RELEASE
                .UseContentRoot(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
#endif
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
