using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OTP_GENERATOR.Models;
using OTP_GENERATOR.Services;

namespace OTP_GENERATOR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OTPController : ControllerBase
    {
        private OTPService otpService;

        public OTPController(OTPService otpService)
        {
            this.otpService = otpService;
        }

        [HttpPost("generate")]
        [ProducesResponseType(200)]
        public IActionResult GenerateOTP([FromBody] string password)
        {
            string otp = otpService.GenerateRandomOTP(password);
            return Ok(new { otp });
        }

        [HttpPost("validate")]
        [ProducesResponseType(200)]
        public IActionResult ValidateOTP([FromBody] string UserOTP)
        {
            // Implement OTP validation logic here
            bool isValid = otpService.ValidateUserOTP(UserOTP);
            return Ok(new { isValid });
        }
    }
}
