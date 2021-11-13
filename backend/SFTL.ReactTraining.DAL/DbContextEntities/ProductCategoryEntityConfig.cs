using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SFTL.ReactTraining.DAL.DataModels;

namespace SFTL.ReactTraining.DAL.DbContextEntities
{
    public class ProductCategoryEntityConfig : IEntityTypeConfiguration<ProductCategory>
    {

        public void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            builder.ToTable("ProductCategory");

            builder.HasKey(x => x.Id);

            builder.Property(t => t.Name).IsRequired();
 
        }
    }

}
