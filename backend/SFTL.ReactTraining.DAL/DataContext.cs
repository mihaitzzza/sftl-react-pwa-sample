using Microsoft.EntityFrameworkCore;
using SFTL.ReactTraining.DAL.DataModels;
using SFTL.ReactTraining.DAL.DbContextEntities;

namespace SFTL.ReactTraining.DAL
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DbSet<ProductDM> Products { get; set; }
        public DbSet<ProductCategory> Categories { get; set; }
        public DataContext(DbContextOptions<DataContext> contextOptions) : base(contextOptions)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            if (!options.IsConfigured)
            {
                options.UseSqlServer("A FALLBACK CONNECTION STRING");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new ProductEntityConfig());
            modelBuilder.ApplyConfiguration(new ProductCategoryEntityConfig());
        }
    }
}
