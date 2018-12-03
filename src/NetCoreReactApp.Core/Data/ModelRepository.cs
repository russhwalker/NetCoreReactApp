
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public class ModelRepository : IModelRepository
    {
        private readonly DealerContext context;

        public ModelRepository(DealerContext context)
        {
            this.context = context;
        }

        public Model Get(int modelId)
        {
            return this.context.Models.Single(c => c.ModelId == modelId);
        }

        public List<Model> GetModels()
        {
            return this.context.Models.ToList();
        }

        public List<ViewModels.ModelRow> GetModelRows()
        {
            return this.context.Models.Select(m => new ViewModels.ModelRow
            {
                ModelId = m.ModelId,
                ModelName = m.ModelName,
                MakeName = m.Make.MakeName
            }).ToList();
        }

        public Model Save(Model model)
        {
            if (model.ModelId == 0)
            {
                this.context.Models.Add(model);
            }
            else
            {
                this.context.Models.Attach(model);
                this.context.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            this.context.SaveChanges();
            return model;
        }
    }
}
