using QuickCart.Api.DTOs;

namespace QuickCart.Api.Repository
{
    public interface IProductRepository
    {
        public Task<ProductResponse> AddProductAsync(AddProductRequeust addProductRequeust);
        public Task<List<ProductResponse>> GetAllProductAsync();
        public Task<ProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest, int productId);
        public Task<bool> DeleteProductAsync(int productId);
    }
}
