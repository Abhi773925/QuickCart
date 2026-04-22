using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuickCart.Api.DTOs;
using QuickCart.Api.Services;
using QuickCart.Domain.Enum;

namespace QuickCart.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Register user api endpoint
        /// </summary>
        /// <param name="registerRequest"></param>
        /// <returns></returns>
        // [Authorize(Roles ="User")]
        // [Authorize(Roles = nameof(UserRole.User))]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(UserRegisterRequest registerRequest)
        {
            try
            {
                // validate model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var response = await _userService.RegisterAsync(registerRequest);
                return Created("", new { message = "User Registered Successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Login Api Endpoint
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(UserLoginRequest loginRequest)
        {
            try
            {
                //validate model state
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var response = await _userService.LoginAsync(loginRequest);
                return Ok(new { message = "user logged in successfully", data = response });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
