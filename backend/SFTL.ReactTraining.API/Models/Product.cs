using SFTL.ReactTraining.DAL.DataModels;
using System;

namespace SFTL.ReactTraining.API.Models
{
    public class ProductVM
    {
        public ProductVM(ProductDM model)
        {
            Id = model.Id;
            Description = model.Description;
            Name = model.Name;
            CreateDate = model.CreateDate;
            CreatedByUserId = model.CreatedByUserId;
            CreatedByUserName = model.CreatedByUserName;
            Category = model.Category?.Name;
        }

        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreatedByUserId { get; set; }

        public string CreatedByUserName { get; set; }
        public string Category { get; set; }

        public string CategoryId { get; set; }
    }
}
