using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickCart.Api.DTOs;
using QuickCart.Api.Services;

namespace QuickCart.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> AddProduct(AddProductRequeust addProductRequeust)
        {
            try
            {
                // validate model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var response = await _productService.AddProductAsync(addProductRequeust);
                return Created("", new { message = "Product added successfully", data = response });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // [Authorize]
        [HttpGet("list-all")]
        public async Task<IActionResult> GetAllProduct()
        {
            try
            {
                var respone = await _productService.GetAllProductAsync();
                if (respone.Count == 0)
                {
                    return NoContent();
                }
                return Ok(new { message = "List of all the product", data = respone });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpPut("update/{productId}")]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductRequest updateProductRequest, [FromRoute] int productId)
        {
            try
            {
                if (updateProductRequest == null)
                {
                    return BadRequest(new { message = "Request cannot be null" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var response = await _productService.UpdateProductAsync(updateProductRequest, productId);
                return Ok(new { message = "Product updated successfully", data = response });
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{productId}")]
        public async Task<IActionResult> DeleteProduct(int productId)
        {
            try
            {
                if (productId <= 0)
                {
                    return BadRequest(new { message = "Invalid Product ID" });
                }

                var result = await _productService.DeleteProductAsync(productId);
                return Ok(new { message = "Product deleted successfully", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
