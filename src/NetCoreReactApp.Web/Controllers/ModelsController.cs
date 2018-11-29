using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NetCoreReactApp.Core.Data;

namespace NetCoreReactApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ModelsController : Controller
    {
        private readonly IModelRepository modelRepository;

        public ModelsController(IModelRepository modelRepository)
        {
            this.modelRepository = modelRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model> GetModels()
        {
            return modelRepository.GetModels();
        }

        [HttpGet("[action]/{modelId}")]
        public Model ModelEdit(int modelId)
        {
            return modelRepository.Get(modelId);
        }

        [HttpPost("[action]")]
        public Model Save([FromBody]Model model)
        {
            return modelRepository.Save(model);
        }
    }
}