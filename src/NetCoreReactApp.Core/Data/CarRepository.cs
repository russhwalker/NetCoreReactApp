using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public class CarRepository : ICarRepository
    {
        private readonly DealerContext context;

        public CarRepository(DealerContext context)
        {
            this.context = context;
        }

        public Car Get(int carId)
        {
            return this.context.Cars.Single(c => c.CarId == carId);
        }

        public List<ViewModels.CarRow> GetCars()
        {
            return this.context.Cars.Select(c => new ViewModels.CarRow
            {
                CarId = c.CarId,
                Year = c.Year,
                Price = c.Price,
                ModelName = c.Model.ModelName
            }).ToList();
        }

        public Car Save(Car car)
        {
            if (car.CarId == 0)
            {
                this.context.Cars.Add(car);
            }
            else
            {
                this.context.Cars.Attach(car);
                this.context.Entry(car).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            this.context.SaveChanges();
            return car;
        }

        public List<Model> GetModels()
        {
            return this.context.Models.ToList();
        }
    }
}
