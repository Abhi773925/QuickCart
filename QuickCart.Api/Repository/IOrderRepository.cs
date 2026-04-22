using QuickCart.Api.DTOs;

namespace QuickCart.Api.Repository
{
    public interface IOrderRepository
    {
        Task<OrderResponse> AddOrderAsync(PlaceOrderRequest request);
        Task<List<OrderResponse>> GetAllOrdersAsync();
        Task<OrderResponse> GetOrderByIdAsync(int orderId);
        Task<List<OrderResponse>> GetOrdersByUserIdAsync(int userId);
    }
}
