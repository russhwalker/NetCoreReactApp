using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NetCoreReactApp.Core.Data;

namespace NetCoreReactApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class CarsController : Controller
    {
        private readonly ICarRepository carRepository;

        public CarsController(ICarRepository carRepository)
        {
            this.carRepository = carRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Car> Inventory()
        {
            return this.carRepository.GetCars();
        }

        [HttpGet("[action]/{carId}")]
        public Car Car(int carId)
        {
            return this.carRepository.Get(carId);
        }

        [HttpPost("[action]")]
        public void Save(Car car)
        {
            this.carRepository.Save(car);
        }
    }
}