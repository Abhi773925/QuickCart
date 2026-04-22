using QuickCart.Api.DTOs;
using QuickCart.Api.Repository;

namespace QuickCart.Api.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        // service layer logic to add the product to database
        public async Task<ProductResponse> AddProductAsync(AddProductRequeust addProductRequeust)
        {
            try
            {
                if (addProductRequeust == null)
                {
                    throw new ArgumentNullException(nameof(addProductRequeust));
                }

                // field validation check
                var errorList = new List<string>();
                if (string.IsNullOrWhiteSpace(addProductRequeust.ProductName))
                {
                    errorList.Add("Product name is empty");
                }
                if (string.IsNullOrWhiteSpace(addProductRequeust.ProductDescription))
                {
                    errorList.Add("Product description is empty");
                }
                if (addProductRequeust.ProductPrice <= 0)
                {
                    errorList.Add("Product Price is empty");
                }
                if (addProductRequeust.StockQuantity <= 0)
                {
                    errorList.Add("Stock quantity is empty");
                }
                if (string.IsNullOrWhiteSpace(addProductRequeust.ImageUrl))
                {
                    errorList.Add("Image url is empty");
                }
                if (addProductRequeust.CategoryId <= 0)
                {
                    errorList.Add("Category Id is required");
                }

                if (errorList.Count > 0)
                {
                    throw new Exception(string.Join(" | ", errorList));
                }
                var response = await _repository.AddProductAsync(addProductRequeust);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // service layer logic to get all the products
        public async Task<List<ProductResponse>> GetAllProductAsync()
        {
            // return the response;
            var response = await _repository.GetAllProductAsync();
            return response;
        }

        // service layer logic to update the product
        public async Task<ProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest, int productId)
        {
            try
            {
                if (updateProductRequest == null)
                {
                    throw new ArgumentNullException(nameof(updateProductRequest));
                }

                // field validation check
                var errorList = new List<string>();
                if (productId <= 0)
                {
                    errorList.Add("Product ID is invalid");
                }
                if (string.IsNullOrWhiteSpace(updateProductRequest.ProductName))
                {
                    errorList.Add("Product name is empty");
                }
                if (string.IsNullOrWhiteSpace(updateProductRequest.ProductDescription))
                {
                    errorList.Add("Product description is empty");
                }
                if (updateProductRequest.ProductPrice <= 0)
                {
                    errorList.Add("Product Price is invalid");
                }
                if (updateProductRequest.StockQuantity < 0)
                {
                    errorList.Add("Stock quantity cannot be negative");
                }
                if (string.IsNullOrWhiteSpace(updateProductRequest.ImageUrl))
                {
                    errorList.Add("Image url is empty");
                }
                if (updateProductRequest.CategoryId <= 0)
                {
                    errorList.Add("Category Id is invalid");
                }

                if (errorList.Count > 0)
                {
                    throw new Exception(string.Join(" | ", errorList));
                }

                var response = await _repository.UpdateProductAsync(updateProductRequest, productId);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // service layer logic to delete the product
        public async Task<bool> DeleteProductAsync(int productId)
        {
            try
            {
                if (productId <= 0)
                {
                    throw new ArgumentException("Product ID must be greater than zero", nameof(productId));
                }

                var result = await _repository.DeleteProductAsync(productId);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting product: " + ex.Message);
            }
        }
    }
}