using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using OTP_GENERATOR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace OTP_GENERATOR.Context
{
    public class OPTDbContext : DbContext
    {
        public OPTDbContext(DbContextOptions<OPTDbContext> options) : base(options) 
        { 
        }

        public DbSet<OTP> OTP { get; set; }
    }
}
