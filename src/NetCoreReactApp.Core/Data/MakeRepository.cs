using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreReactApp.Core.Data
{
    public class MakeRepository : IMakeRepository
    {
        private readonly DealerContext context;

        public MakeRepository(DealerContext context)
        {
            this.context = context;
        }

        public Make Get(int makeId)
        {
            return this.context.Makes.Single(c => c.MakeId == makeId);
        }

        public List<Make> GetMakes()
        {
            return this.context.Makes.ToList();
        }

        public Make Save(Make make)
        {
            if (make.MakeId == 0)
            {
                this.context.Makes.Add(make);
            }
            else
            {
                this.context.Makes.Attach(make);
                this.context.Entry(make).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            }
            this.context.SaveChanges();
            return make;
        }
    }
}
