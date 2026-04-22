using Microsoft.EntityFrameworkCore;
using QuickCart.Domain.Entities;

namespace QuickCart.Domain.Data
{
    public class QuickCartDB : DbContext
    {
        public QuickCartDB()
        {

        }
        public QuickCartDB(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
    }
}
