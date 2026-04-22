using QuickCart.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickCart.Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        [Required(ErrorMessage = "UserId is required")]
        public int UserId { get; set; }
        [Required(ErrorMessage = "Order Date is required")]
        public DateTime OrderDate { get; set; }
        [Required(ErrorMessage = "Total Amount is required")]
        public decimal TotalAmount { get; set; }
        [Required(ErrorMessage = "Shipping Address is required")]
        public string ShippingAddress { get; set; }
        [Required(ErrorMessage = "Status is required")]
        public OrderStatus Status { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
