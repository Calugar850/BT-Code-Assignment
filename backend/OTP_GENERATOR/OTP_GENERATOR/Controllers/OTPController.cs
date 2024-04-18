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
        public IActionResult GenerateOTP([FromBody] OTPRequest request)
        {
            string otp = otpService.GenerateRandomOTP(request.password);
            return Ok(new { otp });
        }

        [HttpPost("validate")]
        [ProducesResponseType(200)]
        public IActionResult ValidateOTP([FromBody] OTPValidate UserOTP)
        {
            // Implement OTP validation logic here
            bool isValid = otpService.ValidateUserOTP(UserOTP.UserOTP);
            return Ok(new { isValid });
        }
    }
}
