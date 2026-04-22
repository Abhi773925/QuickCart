using QuickCart.Api.DTOs;

namespace QuickCart.Api.Services
{
    public interface IOrderService
    {
        Task<OrderResponse> PlaceOrderAsync(PlaceOrderRequest request);
        Task<List<OrderResponse>> GetAllOrdersAsync();
        Task<OrderResponse> GetOrderByIdAsync(int orderId);
        Task<List<OrderResponse>> GetOrdersByUserIdAsync(int userId);
    }
}
