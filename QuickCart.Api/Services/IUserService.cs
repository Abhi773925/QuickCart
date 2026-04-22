using QuickCart.Api.DTOs;

namespace QuickCart.Api.Services
{
    public interface IUserService
    {
        public Task<UserRegisterResponse> RegisterAsync(UserRegisterRequest request);
        public Task<UserLoginResponse> LoginAsync(UserLoginRequest request);
    }
}
