using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SFTL.ReactTraining.DAL.DataModels;

namespace SFTL.ReactTraining.DAL.DbContextEntities
{
    public class ProductEntityConfig : IEntityTypeConfiguration<ProductDM>
    {

            public void Configure(EntityTypeBuilder<ProductDM> builder)
            {
                builder.ToTable("Product");

                builder.HasKey(x => x.Id);

                builder.Property(t => t.Name).IsRequired();


                builder.Property(t => t.CreateDate)
                       .IsRequired();

                builder.Property(t => t.Description);

            builder.Property(t => t.CreatedByUserId);

            builder.Property(t => t.CreatedByUserName);


            builder.Property(t => t.CategoryId)
                       .IsRequired();

            builder.HasOne(t => t.Category)
                       .WithMany()
                       .HasForeignKey(c => c.CategoryId);
            }
        }

}
