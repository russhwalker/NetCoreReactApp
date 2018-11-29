using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public interface IModelRepository
    {
        Model Get(int modelId);
        Model Save(Model model);
        List<Model> GetModels();
    }
}