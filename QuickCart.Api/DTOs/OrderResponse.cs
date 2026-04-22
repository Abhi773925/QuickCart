using QuickCart.Domain.Enum;

namespace QuickCart.Api.DTOs
{
    public class OrderResponse
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string ShippingAddress { get; set; }
        public OrderStatus Status { get; set; }
        public List<OrderItemResponse> Items { get; set; }
    }
}
