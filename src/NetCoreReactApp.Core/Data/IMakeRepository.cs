using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public interface IMakeRepository
    {
        Make Get(int makeId);
        Make Save(Make make);
        List<Make> GetMakes();
    }
}