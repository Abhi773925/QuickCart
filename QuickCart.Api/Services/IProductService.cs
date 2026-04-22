using QuickCart.Api.DTOs;

namespace QuickCart.Api.Services
{
    public interface IProductService
    {
        public Task<ProductResponse> AddProductAsync(AddProductRequeust addProductRequeust);
        public Task<List<ProductResponse>> GetAllProductAsync();
        public Task<ProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest, int productId);
        public Task<bool> DeleteProductAsync(int productId);
    }
}
