using QuickCart.Domain.Enum;
using System.ComponentModel.DataAnnotations;

namespace QuickCart.Domain.Entities
{
    public class User
    {
        public int UserId { get; set; }
        [Required(ErrorMessage = "User Name is required")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "User Email is required")]
        public string UserEmail { get; set; }
        [Required(ErrorMessage = "User Password is required")]
        public string UserPassword { get; set; }
        [Required(ErrorMessage = "User Role is required")]
        public UserRole UserRole { get; set; }

        //relationship of users to the orders one to many relationship
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }


}
