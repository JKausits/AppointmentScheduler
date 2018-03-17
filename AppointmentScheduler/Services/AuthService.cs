using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Services
{
    public class AuthService
    {
        private static JwtSecurityToken decodeJWT(HttpContext context)
        {
            string raw = context.Request.Headers["Authorization"];
            raw = raw.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            return handler.ReadJwtToken(raw) as JwtSecurityToken;
        }

        public static bool isAdmin(HttpContext context)
        {
            var token = decodeJWT(context);
            return token.Claims.First(claim => claim.Type == "admin").Value == "True";
        }
    }
}
