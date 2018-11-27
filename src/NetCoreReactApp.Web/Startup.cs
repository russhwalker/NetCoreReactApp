using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace NetCoreReactApp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Core.Data.DealerContext>(opt => opt.UseInMemoryDatabase("Dealer"));
            services.AddTransient<Core.Data.ICarRepository, Core.Data.CarRepository>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            SeedDatabase(app.ApplicationServices.GetService<Core.Data.DealerContext>());

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void SeedDatabase(Core.Data.DealerContext context)
        {
            context.Models.AddRange(new[] {
                new Core.Data.Model
                {
                    ModelId = 1,
                    ModelName = "Civic"
                },
                new Core.Data.Model
                {
                    ModelId = 2,
                    ModelName = "Accord"
                },
                new Core.Data.Model
                {
                    ModelId = 3,
                    ModelName = "F150"
                }
            });
            context.Cars.AddRange(new[] {
                new Core.Data.Car
                {
                    CarId = 1,
                    ModelId = 1,
                    Price = 9999M,
                    Year = 2012,
                    Notes = "car 1"
                },
                new Core.Data.Car
                {
                    CarId = 2,
                    ModelId = 2,
                    Price = 32999M,
                    Year = 2017,
                    Notes = "car 2"
                },
                new Core.Data.Car
                {
                    CarId = 3,
                    ModelId = 3,
                    Price = 17500M,
                    Year = 2015,
                    Notes = "car 3"
                }
            });
            context.SaveChanges();
        }
    }
}