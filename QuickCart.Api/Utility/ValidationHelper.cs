using System.Text.RegularExpressions;

namespace QuickCart.Api.Utility
{
    public static class ValidationHelper
    {
        // validation helper for the password strength
        public static (bool isValid, string errMsg) PasswordValidation(string password)
        {
            // Null or White Space Check
            if (string.IsNullOrWhiteSpace(password))
            {
                return (false, "Password cannot be empty.");
            }

            // Length Check
            if (password.Length < 8)
            {
                return (false, "Password must be at least 8 characters long.");
            }

            // Character Diversity Checks
            bool hasUpper = password.Any(char.IsUpper);
            bool hasLower = password.Any(char.IsLower);
            bool hasDigit = password.Any(char.IsDigit);
            bool hasSpecial = password.Any(ch => !char.IsLetterOrDigit(ch));

            if (!hasUpper) return (false, "Password must contain at least one uppercase letter.");
            if (!hasLower) return (false, "Password must contain at least one lowercase letter.");
            if (!hasDigit) return (false, "Password must contain at least one digit.");
            if (!hasSpecial) return (false, "Password must contain at least one special character.");

            // if all the validation passed
            return (true, string.Empty);
        }

        // validation helper for email
        public static (bool isValid, string errMsg) EmailValidation(string email)
        {
            // Basic Null/Empty check
            if (string.IsNullOrWhiteSpace(email))
            {
                return (false, "Email address is required.");
            }


            // regex for email address and format validations
            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]{2,}$";

            bool isMatch = Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);

            if (!isMatch)
            {
                return (false, "Please enter a valid email address (e.g., name@example.com).");
            }

            // length check of the email
            if (email.Length > 254)
            {
                return (false, "Email address is too long.");
            }

            return (true, string.Empty);
        }
    }
}
