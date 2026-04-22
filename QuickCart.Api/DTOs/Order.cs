using QuickCart.Domain.Enum;

namespace QuickCart.Api.DTOs
{
    public class PlaceOrderRequest
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderItemRequest> OrderItems { get; set; } = new List<OrderItemRequest>();
    }
}
