using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NetCoreReactApp.Core.Data;
using NetCoreReactApp.Core.ViewModels;

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
        public IEnumerable<CarRow> Inventory()
        {
            return carRepository.GetCars();
        }

        [HttpGet("[action]/{carId}")]
        public CarEditViewModel CarEdit(int carId)
        {
            return new CarEditViewModel
            {
                Car = carRepository.Get(carId),
                Models = carRepository.GetModels()
            };
        }

        [HttpGet("[action]/{carId}")]
        public Car Car(int carId)
        {
            return carRepository.Get(carId);
        }

        [HttpPost("[action]")]
        public Car Save([FromBody]Car car)
        {
            return carRepository.Save(car);
        }
    }
}