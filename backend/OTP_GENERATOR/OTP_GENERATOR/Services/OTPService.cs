using OTP_GENERATOR.Context;
using OTP_GENERATOR.Models;
using System.Collections;
using System.Security.Cryptography;
using System.Text;

namespace OTP_GENERATOR.Services
{
    public class OTPService
    {
        private const int OtpLength = 6;

        private OPTDbContext _otpDbContext;

        public OTPService(OPTDbContext otpDbContext)
        {
            _otpDbContext = otpDbContext;
        }

        public string GenerateRandomOTP(string key)
        {
            Random random = new Random();
            int otpValue = random.Next(100000, 999999);
            string optString = otpValue.ToString("D" + OtpLength);
            string optEncrypted = EncryptOtp(optString, key);
            _otpDbContext.OTP.Add(new OTP() { OTPValue = optEncrypted, CreatedDateTime = DateTime.Now });
            _otpDbContext.SaveChanges();
            return optEncrypted;
        }

        private string EncryptOtp(string otp, string password)
        {
            using (Aes aesAlg = Aes.Create())
            {
                byte[] salt = new byte[16];
                byte[] key = DeriveKeyFromPassword(password, salt, 32);
                aesAlg.Key = key;
                aesAlg.IV = new byte[16];

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(otp);
                        }
                        return Convert.ToBase64String(msEncrypt.ToArray());
                    }
                }
            }
        }

        private byte[] DeriveKeyFromPassword(string password, byte[] salt, int keySizeInBytes)
        {
            const int iterations = 10000;
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations))
            {
                return pbkdf2.GetBytes(keySizeInBytes);
            }
        }

        public bool ValidateUserOTP(string userOTP)
        {
            OTP encryptedOTP = _otpDbContext.OTP.OrderByDescending(o => o.id).FirstOrDefault()!;
            if ((DateTime.Now - encryptedOTP.CreatedDateTime).TotalSeconds > 60)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
