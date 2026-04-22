using System.ComponentModel.DataAnnotations;

namespace QuickCart.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        [Required(ErrorMessage = "Category Name is required")]
        public string CategoryName { get; set; }

        // Relationship Ek category mein multiple products ho sakte hain
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    }
}