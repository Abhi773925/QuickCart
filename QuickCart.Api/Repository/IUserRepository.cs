using QuickCart.Api.DTOs;

namespace QuickCart.Api.Repository
{
    public interface IUserRepository
    {
        public Task<UserRegisterResponse> RegisterAsync(UserRegisterRequest request);
        public Task<UserLoginResponse> LoginAsync(UserLoginRequest request);
    }
}
