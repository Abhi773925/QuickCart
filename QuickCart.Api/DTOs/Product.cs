namespace QuickCart.Api.DTOs
{
    // accesible this dto for the admin only
    public class AddProductRequeust
    {
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }
        public required decimal ProductPrice { get; set; }
        public required int StockQuantity { get; set; }
        public required string ImageUrl { get; set; }
        public required int CategoryId { get; set; }
    }

    // Update product DTO for admin
    public class UpdateProductRequest
    {
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }
        public required decimal ProductPrice { get; set; }
        public required int StockQuantity { get; set; }
        public required string ImageUrl { get; set; }
        public required int CategoryId { get; set; }
    }

    // accessible for admin and user both
    public class ProductResponse
    {
        public required int ProductId { get; set; }
        public required string ProductName { get; set; }
        public required string ProductDescription { get; set; }
        public required decimal ProductPrice { get; set; }
        public required int StockQuantity { get; set; }
        public required string ImageUrl { get; set; }
        public required int CategoryId { get; set; }
    }
}
