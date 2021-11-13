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
using System.Security.Claims;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.API.Controllers
{
    [Route("[controller]")]

    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IProductRepo _productsRepo;

        public ProductController(IProductRepo productsRepo)
        {
            _productsRepo = productsRepo;
        }

        [Route("test2")]
        [Authorize(Policy="AdminOnly")]
        public ObjectResult Get2()
        {
            var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToArray();
            var response = new { message = "Hello API", claims };
            return new ObjectResult(response);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductVM>>> Get()
        {
            return Ok(await _productsRepo
                .GetProducts()   
                .Include(x=> x.Category)
                .Select(t=> new ProductVM(t))
                .ToListAsync()
                );
        }

        [HttpPost("add")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult> AddProduct(ProductVM product)
        {
            //
            ProductDM productDM = new ProductDM
            {
                CategoryId = Guid.Parse(product.CategoryId),
                CreateDate = System.DateTime.Now,
                CreatedByUserName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                //CreatedByUserId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.SubjectId)?.Value,
                Description = product.Description,
                Name = product.Name
            };
            await _productsRepo.AddProductAsync(productDM);
            await _productsRepo.Commit();
            return new ObjectResult(productDM)
            {
                StatusCode = (int)HttpStatusCode.Created
            };
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete]
        public async Task<ActionResult> DeleteProduct(string productId)
        {
            var product = await _productsRepo.GetById(Guid.Parse(productId));

            if (product == null)
            {
                throw new ArgumentOutOfRangeException(nameof(product));
            }
             _productsRepo.Delete(product);
            await _productsRepo.Commit();

            return NoContent();
        }
    }
}
