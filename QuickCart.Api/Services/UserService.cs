using QuickCart.Api.DTOs;
using QuickCart.Api.Repository;
using QuickCart.Api.Utility;
using QuickCart.Domain.Enum;

namespace QuickCart.Api.Services
{
    public class UserService : IUserService
    {
        // Repository layer calling instance.
        private readonly IUserRepository _repository;
        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        // User registration service layer logic..........
        public async Task<UserRegisterResponse> RegisterAsync(UserRegisterRequest request)
        {
            // check if the request is null or not.
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            // field validation check
            var errorList = new List<string>();

            if (string.IsNullOrWhiteSpace(request.UserName))
            {
                errorList.Add("User Name is Empty");
            }
            if (string.IsNullOrWhiteSpace(request.UserEmail))
            {
                errorList.Add("User Email is Empty");
            }
            if (string.IsNullOrWhiteSpace(request.UserPassword))
            {
                errorList.Add("User Password is Empty");
            }
            if (!Enum.IsDefined(typeof(UserRole), request.UserRole))
            {
                errorList.Add("User Role is Invalid");
            }

            // check for email validation and password validation with Email Helper and password Helper.

            var emailResult = ValidationHelper.EmailValidation(request.UserEmail);

            if (emailResult.isValid == false)
            {
                errorList.Add(emailResult.errMsg);
            }

            var passwordResult = ValidationHelper.PasswordValidation(request.UserPassword);
            if (passwordResult.isValid == false)
            {
                errorList.Add(passwordResult.errMsg);
            }

            // check if any error is there
            if (errorList.Count > 0)
            {
                throw new Exception(string.Join(" | ", errorList));
            }


            // if everything passed then 
            var response = await _repository.RegisterAsync(request);
            return response;
        }

        // login user service layer logic
        public async Task<UserLoginResponse> LoginAsync(UserLoginRequest request)
        {
            // calling the next repository layer logic
            var response = await _repository.LoginAsync(request);
            return response;
        }
    }
}
