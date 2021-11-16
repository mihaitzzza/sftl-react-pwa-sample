using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SFTL.ReactTraining.API.Models;
using SFTL.ReactTraining.DAL.DataModels;
using SFTL.ReactTraining.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepo _categoryRepo;

        public CategoryController(ICategoryRepo categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryVM>>> Get()
        {
            return Ok(await _categoryRepo
                .GetCategories()
                .Select(t => new CategoryVM { 
                    Id = t.Id.ToString(),
                    Name = t.Name
                })
                .ToListAsync()
                );
        }

        [HttpPost("add")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult> AddCategory(CategoryVM product)
        {
            ProductCategory categoryDM = new ProductCategory
            {
                Name = product.Name
            };
            await _categoryRepo.AddCategoryAsync(categoryDM);
            await _categoryRepo.Commit();
            return new ObjectResult(categoryDM)
            {
                StatusCode = (int)HttpStatusCode.Created
            };
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete]
        public async Task<ActionResult> DeleteProduct(string categoryId)
        {
            var category = await _categoryRepo.GetById(Guid.Parse(categoryId));

            if (category == null)
            {
                throw new ArgumentOutOfRangeException(nameof(category));
            }
            _categoryRepo.Delete(category);
            await _categoryRepo.Commit();

            return NoContent();
        }
    }
}
