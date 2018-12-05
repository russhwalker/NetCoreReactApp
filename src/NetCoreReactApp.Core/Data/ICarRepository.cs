using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public interface ICarRepository
    {
        List<ViewModels.CarRow> GetCarRows(bool visibleCarsOnly);
        Car Get(int carId);
        Car Save(Car car);
        List<Model> GetModels();
    }
}