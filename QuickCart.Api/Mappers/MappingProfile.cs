using AutoMapper;
using QuickCart.Api.DTOs;
using QuickCart.Domain.Entities;

namespace QuickCart.Api.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // mapping of user registration
            CreateMap<UserRegisterRequest, User>();
            CreateMap<User, UserRegisterResponse>();

            // mapping of product adding and product list view
            CreateMap<AddProductRequeust, Product>();
            CreateMap<UpdateProductRequest, Product>();
            CreateMap<Product, ProductResponse>();

            // mapping of order with items
            CreateMap<Order, OrderResponse>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems));

            CreateMap<OrderItem, OrderItemResponse>();
            CreateMap<OrderItemRequest, OrderItem>();
        }
    }
}
