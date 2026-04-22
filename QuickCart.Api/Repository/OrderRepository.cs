using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuickCart.Api.DTOs;
using QuickCart.Domain.Data;
using QuickCart.Domain.Entities;

namespace QuickCart.Api.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly QuickCartDB _context;
        private readonly IMapper _mapper;

        public OrderRepository(QuickCartDB context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Add Order to database
        public async Task<OrderResponse> AddOrderAsync(PlaceOrderRequest request)
        {
            try
            {
                if (request == null)
                {
                    throw new ArgumentNullException(nameof(request));
                }

                var order = new Order
                {
                    UserId = request.UserId,
                    OrderDate = request.OrderDate,
                    TotalAmount = request.TotalAmount,
                    ShippingAddress = request.ShippingAddress,
                    Status = request.Status
                };

                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();

                // Add order items
                if (request.OrderItems != null && request.OrderItems.Count > 0)
                {
                    foreach (var item in request.OrderItems)
                    {
                        var orderItem = new OrderItem
                        {
                            OrderId = order.OrderId,
                            ProductId = item.ProductId,
                            Quantity = item.Quantity,
                            UnitPrice = item.UnitPrice
                        };
                        order.OrderItems = new List<OrderItem>() { orderItem };
                        await _context.OrderItems.AddAsync(orderItem);
                    }
                    await _context.SaveChangesAsync();
                }

                var response = _mapper.Map<OrderResponse>(order);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding order to database: " + ex.Message);
            }
        }

        // Get all orders
        public async Task<List<OrderResponse>> GetAllOrdersAsync()
        {
            try
            {
                var orders = await _context.Orders.Include(o => o.OrderItems).ToListAsync();
                if (orders.Count == 0)
                {
                    throw new Exception("No orders available");
                }

                var result = _mapper.Map<List<OrderResponse>>(orders);
                return result;
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
                var order = await _context.Orders
                    .Include(o => o.OrderItems)
                    .FirstOrDefaultAsync(o => o.OrderId == orderId);

                if (order == null)
                {
                    throw new Exception($"Order with ID {orderId} not found");
                }

                var response = _mapper.Map<OrderResponse>(order);
                return response;
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
                var orders = await _context.Orders
                    .Where(o => o.UserId == userId)
                    .Include(o => o.OrderItems)
                    .ToListAsync();

                if (orders.Count == 0)
                {
                    throw new Exception($"No orders found for user ID {userId}");
                }

                var result = _mapper.Map<List<OrderResponse>>(orders);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while fetching user orders: " + ex.Message);
            }
        }
    }
}
