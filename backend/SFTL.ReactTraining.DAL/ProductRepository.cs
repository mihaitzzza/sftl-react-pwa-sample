using Microsoft.EntityFrameworkCore;
using SFTL.ReactTraining.DAL.DataModels;
using SFTL.ReactTraining.DAL.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.DAL
{
    public class ProductRepository : IProductRepo
    {
        private readonly DataContext _dbContext;

        public ProductRepository(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddProductAsync(ProductDM product)
        {
            await _dbContext.Products.AddAsync(product);
        }

        public async Task Commit()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Delete(ProductDM product)
        {
            _dbContext.Products.Remove(product);
        }

        public async Task<ProductDM> GetById(Guid productId)
        {
            return await _dbContext
                .Products
                .FirstOrDefaultAsync(r => r.Id == productId);
        }

        public IQueryable<ProductDM> GetProducts()
        {
            return _dbContext.Products;
        }
    }
}
