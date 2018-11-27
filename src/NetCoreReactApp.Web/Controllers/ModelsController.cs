using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NetCoreReactApp.Core.Data;

namespace NetCoreReactApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ModelsController : Controller
    {
        private readonly ICarRepository carRepository;

        public ModelsController(ICarRepository carRepository)
        {
            this.carRepository = carRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model> Get()
        {
            return carRepository.GetModels();
        }
    }
}