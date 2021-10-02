using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    [Table("Proizvod")]
    public class Proizvod
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(255)]
        public string Ime { get; set; }
        
        [Column("Cena")]
        public int Cena { get; set; }

        public string Sastojci { get; set; }

        public Restoran Restoran { get; set; }
    }
}