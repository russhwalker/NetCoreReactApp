using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetCoreReactApp.Core.Data
{
    public class DealerContext : DbContext
    {

        public DealerContext(DbContextOptions<DealerContext> options) : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; }
    }
}