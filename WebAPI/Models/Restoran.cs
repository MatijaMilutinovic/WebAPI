using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Restoran")]
    public class Restoran
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }

        [Column("Filter")]
        public string Filter { get; set; }

        public virtual List<Proizvod> Proizvodi { get; set; }

        public Dostava Dostava { get; set; }
    }
}