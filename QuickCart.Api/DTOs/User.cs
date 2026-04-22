using QuickCart.Domain.Enum;

namespace QuickCart.Api.DTOs
{
    public class UserRegisterRequest
    {
        public required string UserName { get; set; }
        public required string UserEmail { get; set; }
        public required string UserPassword { get; set; }
        public UserRole UserRole { get; set; } = UserRole.User;
    }
    public class UserRegisterResponse
    {
        public int UserId { get; set; }
        public required string UserName { get; set; }
        public required string UserEmail { get; set; }
        public required string UserRole { get; set; }
    }
    public class UserLoginRequest
    {
        public required string UserEmail { get; set; }
        public required string UserPassword { get; set; }
    }

    public class UserLoginResponse
    {
        public string? AccessToken { get; set; }
    }
}
