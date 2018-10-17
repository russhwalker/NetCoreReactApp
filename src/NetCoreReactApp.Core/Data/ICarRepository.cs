using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public interface ICarRepository
    {
        List<Car> GetCars();
        Car Get(int carId);
        Car Save(Car car);
    }
}