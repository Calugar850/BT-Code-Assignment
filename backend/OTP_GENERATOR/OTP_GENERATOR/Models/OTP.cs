using System.ComponentModel.DataAnnotations;

namespace OTP_GENERATOR.Models
{
    public class OTP
    {
        [Key]
        public int id { get; set; }
        public string OTPValue { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }
}
