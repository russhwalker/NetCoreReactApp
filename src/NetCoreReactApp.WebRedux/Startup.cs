using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace NetCoreReactApp.WebRedux
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
            services.AddTransient<Core.Data.IMakeRepository, Core.Data.MakeRepository>();
            services.AddTransient<Core.Data.IModelRepository, Core.Data.ModelRepository>();

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
            var make1 = new Core.Data.Make
            {
                MakeName = "Honda"
            };
            var make2 = new Core.Data.Make
            {
                MakeName = "Ford"
            };

            context.Makes.AddRange(new[] {
                make1,
                make2
            });

            var model1 = new Core.Data.Model
            {
                ModelName = "Civic",
                Make = make1
            };
            var model2 = new Core.Data.Model
            {
                ModelName = "Accord",
                Make = make1
            };
            var model3 = new Core.Data.Model
            {
                ModelName = "F150",
                Make = make2
            };

            context.Models.AddRange(new[] {
                model1,
                model2,
                model3
            });

            context.Cars.AddRange(new[] {
                new Core.Data.Car
                {
                    Model = model1,
                    Price = 9999M,
                    Year = 2012,
                    Notes = "car 1",
                    Visible = true
                },
                new Core.Data.Car
                {
                    Model = model2,
                    Price = 32999M,
                    Year = 2017,
                    Notes = "car 2",
                    Visible = true
                },
                new Core.Data.Car
                {
                    Model = model3,
                    Price = 17500M,
                    Year = 2015,
                    Notes = "car 3",
                    Visible = true
                },
                new Core.Data.Car
                {
                    Model = model3,
                    Price = 0M,
                    Year = 2010,
                    Notes = "car 4",
                    Visible = false
                }
            });
            context.SaveChanges();
        }
    }
}