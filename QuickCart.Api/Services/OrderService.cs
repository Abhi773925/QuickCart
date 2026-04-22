using QuickCart.Api.DTOs;
using QuickCart.Api.Repository;
using QuickCart.Api.Utility;
using QuickCart.Domain.Enum;

namespace QuickCart.Api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        // Place order service layer logic
        public async Task<OrderResponse> PlaceOrderAsync(PlaceOrderRequest request)
        {
            try
            {
                // Check if request is null
                if (request == null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                // Field validation check
                var errorList = new List<string>();

                if (request.UserId <= 0)
                {
                    errorList.Add("User ID is invalid");
                }
                if (request.TotalAmount <= 0)
                {
                    errorList.Add("Total Amount must be greater than zero");
                }
                if (string.IsNullOrWhiteSpace(request.ShippingAddress))
                {
                    errorList.Add("Shipping Address is required");
                }
                if (request.OrderDate == default(DateTime))
                {
                    errorList.Add("Order Date is required");
                }
                if (!Enum.IsDefined(typeof(OrderStatus), request.Status))
                {
                    errorList.Add("Order Status is invalid");
                }
                if (request.OrderItems == null || request.OrderItems.Count == 0)
                {
                    errorList.Add("Order Items cannot be empty");
                }

                // If there are validation errors, throw exception
                if (errorList.Count > 0)
                {
                    throw new Exception(string.Join(", ", errorList));
                }

                // Call repository to add order
                var response = await _orderRepository.AddOrderAsync(request);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while placing order: " + ex.Message);
            }
        }

        // Get all orders
        public async Task<List<OrderResponse>> GetAllOrdersAsync()
        {
            try
            {
                var orders = await _orderRepository.GetAllOrdersAsync();
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching orders: " + ex.Message);
            }
        }

        // Get order by ID
        public async Task<OrderResponse> GetOrderByIdAsync(int orderId)
        {
            try
            {
                if (orderId <= 0)
                {
                    throw new ArgumentException("Order ID must be greater than zero", nameof(orderId));
                }

                var order = await _orderRepository.GetOrderByIdAsync(orderId);
                return order;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching order: " + ex.Message);
            }
        }

        // Get orders by user ID
        public async Task<List<OrderResponse>> GetOrdersByUserIdAsync(int userId)
        {
            try
            {
                if (userId <= 0)
                {
                    throw new ArgumentException("User ID must be greater than zero", nameof(userId));
                }

                var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching user orders: " + ex.Message);
            }
        }
    }
}
