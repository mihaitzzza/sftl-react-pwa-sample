using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SFTL.ReactTraining.DAL.DataModels
{
    public class ProductDM
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreatedByUserId { get; set; }

        public string CreatedByUserName { get; set; }
        public Guid CategoryId { get; set; }

        public ProductCategory Category { get; set; }
    }
}
