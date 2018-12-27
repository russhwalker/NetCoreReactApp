using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreReactApp.Core
{
    public static class StartupHelper
    {
        public static void SeedDatabase(Data.DealerContext context)
        {
            var make1 = new Data.Make
            {
                MakeName = "Honda"
            };
            var make2 = new Data.Make
            {
                MakeName = "Ford"
            };

            context.Makes.AddRange(new[] {
                make1,
                make2
            });

            var model1 = new Data.Model
            {
                ModelName = "Civic",
                Make = make1
            };
            var model2 = new Data.Model
            {
                ModelName = "Accord",
                Make = make1
            };
            var model3 = new Data.Model
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
                new Data.Car
                {
                    Model = model1,
                    Price = 9999M,
                    Year = 2012,
                    Notes = "car 1",
                    Visible = true
                },
                new Data.Car
                {
                    Model = model2,
                    Price = 32999M,
                    Year = 2017,
                    Notes = "car 2",
                    Visible = true
                },
                new Data.Car
                {
                    Model = model3,
                    Price = 17500M,
                    Year = 2015,
                    Notes = "car 3",
                    Visible = true
                },
                new Data.Car
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
