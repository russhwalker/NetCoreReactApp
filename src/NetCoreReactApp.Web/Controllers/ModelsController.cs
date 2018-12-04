using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NetCoreReactApp.Core.Data;
using NetCoreReactApp.Core.ViewModels;

namespace NetCoreReactApp.Web.Controllers
{
    [Route("api/[controller]")]
    public class ModelsController : Controller
    {
        private readonly IModelRepository modelRepository;
        private readonly IMakeRepository makeRepository;

        public ModelsController(IModelRepository modelRepository,
            IMakeRepository makeRepository)
        {
            this.modelRepository = modelRepository;
            this.makeRepository = makeRepository;
        }

        [HttpGet("[action]")]
        public IEnumerable<Model> GetModels()
        {
            return modelRepository.GetModels();
        }

        [HttpGet("[action]")]
        public IEnumerable<ModelRow> GetModelRows()
        {
            return modelRepository.GetModelRows();
        }

        [HttpGet("[action]/{modelId}")]
        public ModelEditViewModel ModelEdit(int modelId)
        {
            return new ModelEditViewModel
            {
                Model = modelId == 0 ? new Model() : modelRepository.Get(modelId),
                Makes = makeRepository.GetMakes()
            };
        }

        [HttpPost("[action]")]
        public Model Save([FromBody]Model model)
        {
            return modelRepository.Save(model);
        }
    }
}