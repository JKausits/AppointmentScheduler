using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/Authentication")]
    [EnableCors("SiteCorsPolicy")]
    public class AuthenticationController : Controller
    {

        public IConfiguration _configuration { get; }
        private readonly ProfessorRespository _respository;


        public AuthenticationController(AppointmentSchedulerContext context, IConfiguration configuration, EmailService emailService)
        {
            _respository = new ProfessorRespository(context, emailService);
            _configuration = configuration;
        }


        [HttpPost, AllowAnonymous]
        public IActionResult Login([FromBody] TokenRequest request) {
            var professor = Authenticate(request);
            if (professor == null)
            {
                return new ObjectResult(new { success = false, message = "Could not authenticate using email/password combination." });
            }
            else if (!professor.Active) {
                return new ObjectResult(new { success = false, message = "This account is currently deactivated. Contact Admin to gain access."});
            }

            return new ObjectResult(new { success = true, message= new JwtSecurityTokenHandler().WriteToken(buildToken(professor))});


        }

        private Professor Authenticate(TokenRequest request) {
            var professor = _respository.FindByEmail(request.Email);
            if (professor == null || !professor.validPassword(request.Password)) {
                return null;
            }

            return professor;
        }

        private JwtSecurityToken buildToken(Professor professor)
        {
            var claims = new[] {
                    new Claim("ID", professor.ID.ToString()),
                    new Claim("email", professor.Email),
                    new Claim("admin", professor.Admin.ToString()),
                    new Claim("active", professor.Active.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Issuer"], claims, expires: DateTime.Now.AddMinutes(30), signingCredentials: creds);
        }
    }
    public class TokenRequest {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}