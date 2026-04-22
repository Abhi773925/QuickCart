using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuickCart.Api.DTOs;
using QuickCart.Domain.Data;
using QuickCart.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuickCart.Api.Repository
{
    public class UserRepository : IUserRepository
    {
        // database connection instance.
        private readonly QuickCartDB _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public UserRepository(QuickCartDB context, IMapper mapper, IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }

        // login user repository layer logic
        public async Task<UserLoginResponse> LoginAsync(UserLoginRequest request)
        {

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserEmail.ToLower() == request.UserEmail.ToLower());

            if (user == null)
            {
                throw new Exception("Invalid email or password.");
            }
            var passwordHasher = new PasswordHasher<User>();

            var verificationResult = passwordHasher.VerifyHashedPassword(user, user.UserPassword, request.UserPassword);

            if (verificationResult == PasswordVerificationResult.Failed)
            {
                throw new Exception("Invalid email or password.");
            }

            string tokenResult = GenerateToken(user, _config);
            return new UserLoginResponse
            {
                AccessToken = tokenResult,
            };
        }

        // user registration repository layer logic
        public async Task<UserRegisterResponse> RegisterAsync(UserRegisterRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }

            // existing email check 
            var checkExistingUser = await _context.Users.FirstOrDefaultAsync(temp => temp.UserEmail == request.UserEmail);

            if (checkExistingUser != null)
            {
                throw new Exception("User with this email already exists");
            }
            // mapping kro request ko User Table se.
            var userDetails = _mapper.Map<User>(request);
            // save user data to database.

            // hash the password first before saving to database
            userDetails.UserPassword = new PasswordHasher<User>().HashPassword(userDetails, request.UserPassword);

            await _context.Users.AddAsync(userDetails);
            await _context.SaveChangesAsync();

            // wapas dto as a response bhejo
            var response = _mapper.Map<UserRegisterResponse>(userDetails);
            return response;

        }

        // token generation logic for successful logged in users
        private string GenerateToken(User user, IConfiguration _config)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.UserEmail),
                new Claim(ClaimTypes.Role, user.UserRole.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:DurationInMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
