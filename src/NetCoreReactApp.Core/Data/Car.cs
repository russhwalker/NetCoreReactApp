using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreReactApp.Core.Data
{
    public class Car
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CarId { get; set; }

        public int ModelId { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public string Notes { get; set; }
        public bool Visible { get; set; }

        public virtual Model Model { get; set; }
    }
}