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

        public List<Car> GetCars()
        {
            return this.context.Cars.ToList();
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

    }
}
