

using Microsoft.EntityFrameworkCore;
using SFTL.ReactTraining.DAL.DataModels;
using SFTL.ReactTraining.DAL.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.DAL
{
    public class ProductCategoryRepository : ICategoryRepo
    {
        private readonly DataContext _dbContext;

        public ProductCategoryRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddCategoryAsync(ProductCategory category)
        {
            await _dbContext.Categories.AddAsync(category);
        }

        public async Task Commit()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Delete(ProductCategory product)
        {
            _dbContext.Categories.Remove(product);
        }

        public async Task<ProductCategory> GetById(Guid categoryId)
        {
            return await _dbContext
                .Categories
                .FirstOrDefaultAsync(r => r.Id == categoryId);
        }

        public IQueryable<ProductCategory> GetCategories()
        {
            return _dbContext.Categories;
        }
    }
}
