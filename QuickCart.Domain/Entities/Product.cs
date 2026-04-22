using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickCart.Domain.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "Product Name is required")]
        public string ProductName { get; set; }
        [Required(ErrorMessage = "Product Description is required")]
        public string ProductDescription { get; set; }
        [Required(ErrorMessage = "Product Price is required")]
        public decimal ProductPrice { get; set; }
        [Required(ErrorMessage = "Stock Quantity is required")]
        public int StockQuantity { get; set; }
        [Required(ErrorMessage = "ImageUrl is required")]
        public string ImageUrl { get; set; }

        // Foreign Key
        [Required(ErrorMessage = "CategoryId is required")]
        public int CategoryId { get; set; }

        // Product hamesha ek Category se juda hoga
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
    }
}