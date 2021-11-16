using SFTL.ReactTraining.DAL.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.DAL.Interfaces
{
    public interface ICategoryRepo
    {
        Task AddCategoryAsync(ProductCategory category);

        Task<ProductCategory> GetById(Guid categoryId);

        void Delete(ProductCategory category);

        IQueryable<ProductCategory> GetCategories();

        Task Commit();
    }
}
