using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCoreReactApp.Core.Data
{
    public class Make
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MakeId { get; set; }

        public string MakeName { get; set; }
    }
}