using System;
using System.Collections.Generic;
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
            return carRepository.GetCars();
        }

        [HttpGet("[action]/{carId}")]
        public Car Car(int carId)
        {
            return carRepository.Get(carId);
        }

        [HttpPost("[action]")]
        public void Save([FromBody]Car car)
        {
            carRepository.Save(car);
        }
    }
}