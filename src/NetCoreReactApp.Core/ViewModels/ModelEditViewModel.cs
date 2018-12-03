using NetCoreReactApp.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.ViewModels
{
    public class ModelEditViewModel
    {
        public Model Model { get; set; }
        public List<Make> Makes { get; set; }
    }
}