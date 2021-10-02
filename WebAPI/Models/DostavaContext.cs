using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class DostavaContext : DbContext
    {
        public DbSet<Restoran> Restorani { get; set; }
        public DbSet<Proizvod> Proizvodi { get; set; }
        public DbSet<Dostava> Dostave { get; set; }

        public DostavaContext(DbContextOptions options) : base(options)
        {
            
        }       
    }
}