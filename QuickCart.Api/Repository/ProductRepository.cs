using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuickCart.Api.DTOs;
using QuickCart.Domain.Data;
using QuickCart.Domain.Entities;

namespace QuickCart.Api.Repository
{
    public class ProductRepository : IProductRepository
    {
        // database connection logic
        private readonly QuickCartDB _context;
        private readonly IMapper _mapper;
        public ProductRepository(QuickCartDB context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Add Product Repository layer logic and it should be accesible to the admin only
        public async Task<ProductResponse> AddProductAsync(AddProductRequeust addProductRequeust)
        {
            try
            {
                if (addProductRequeust == null)
                {
                    throw new ArgumentNullException(nameof(addProductRequeust));
                }
                var productDetails = _mapper.Map<Product>(addProductRequeust);
                await _context.AddAsync(productDetails);
                await _context.SaveChangesAsync();

                var response = _mapper.Map<ProductResponse>(productDetails);
                return response;

            }
            catch (Exception ex)
            {
                throw new Exception("Error while adding product to database");
            }
        }

        // get all product repository layer logic any authorised user can access it
        public async Task<List<ProductResponse>> GetAllProductAsync()
        {
            try
            {
                var response = await _context.Products.ToListAsync();
                if (response.Count == 0)
                {
                    throw new Exception("No product available");
                }
                var result = _mapper.Map<List<ProductResponse>>(response);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Update product repository layer logic (Admin only)
        public async Task<ProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest, int productId)
        {
            try
            {
                if (updateProductRequest == null)
                {
                    throw new ArgumentNullException(nameof(updateProductRequest));
                }

                var existingProduct = await _context.Products
                    .FirstOrDefaultAsync(p => p.ProductId == productId);

                if (existingProduct == null)
                {
                    throw new Exception($"Product with ID {productId} not found");
                }

                existingProduct.ProductName = updateProductRequest.ProductName;
                existingProduct.ProductDescription = updateProductRequest.ProductDescription;
                existingProduct.ProductPrice = updateProductRequest.ProductPrice;
                existingProduct.StockQuantity = updateProductRequest.StockQuantity;
                existingProduct.ImageUrl = updateProductRequest.ImageUrl;
                existingProduct.CategoryId = updateProductRequest.CategoryId;

                _context.Products.Update(existingProduct);
                await _context.SaveChangesAsync();

                var response = _mapper.Map<ProductResponse>(existingProduct);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while updating product: " + ex.Message);
            }
        }

        // Delete product repository layer logic (Admin only)
        public async Task<bool> DeleteProductAsync(int productId)
        {
            try
            {
                if (productId <= 0)
                {
                    throw new ArgumentException("Product ID must be greater than zero", nameof(productId));
                }

                var existingProduct = await _context.Products
                    .FirstOrDefaultAsync(p => p.ProductId == productId);

                if (existingProduct == null)
                {
                    throw new Exception($"Product with ID {productId} not found");
                }

                _context.Products.Remove(existingProduct);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while deleting product: " + ex.Message);
            }
        }

    }
}
