using SFTL.ReactTraining.DAL.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.DAL.Interfaces
{
    public interface IProductRepo
    {
        Task AddProductAsync(ProductDM product);

        Task<ProductDM> GetById(Guid productId);

        void Delete(ProductDM product);

        IQueryable<ProductDM> GetProducts();

        Task Commit();
    }
}
