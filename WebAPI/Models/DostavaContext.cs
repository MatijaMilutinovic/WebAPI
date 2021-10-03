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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restoran>()
                .HasOne(i => i.Dostava)
                .WithMany(u => u.Restorani);
               // .HasForeignKey(i => i.MailTo);


            modelBuilder.Entity<Proizvod>()
                .HasOne(s => s.Restoran)
                .WithMany(u => u.Proizvodi);
              //  .HasForeignKey(s => s.MailFrom);
                

            // modelBuilder.Entity<Deleted>()
            //     .HasOne(d => d.ADeletedUser)
            //     .WithMany(u => u.ADeleted)
            //     .HasForeignKey(d => d.MailFrom);

        }
    }
}