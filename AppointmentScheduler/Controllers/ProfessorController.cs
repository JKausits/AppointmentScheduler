using AppointmentScheduler.DTO;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/Professor")]
    [EnableCors("SiteCorsPolicy")]
    public class ProfessorController : Controller
    {
        private readonly ProfessorRespository _respository;


        public ProfessorController(AppointmentSchedulerContext context, EmailService emailService)
        {
            _respository = new ProfessorRespository(context, emailService);
        }

        [HttpPost, AllowAnonymous]
        public IActionResult Create([FromBody] Professor professor) {
            if (professor == null) {
                return BadRequest();
            }

            return new ObjectResult(_respository.Insert(professor));
        }

        [HttpGet("{id}", Name = "GetProfessor"), AllowAnonymous]
        public IActionResult GetById(int id) {
            var professor = _respository.GetById(id);
            if (professor == null) {
                return NotFound();
            }

            return new ObjectResult(professor);
        }

        [HttpGet("active"), AllowAnonymous]
        public IEnumerable<ProfessorPublicDTO> GetActiveProfessors() {
            return _respository.GetActiveProfessors();
        }

        [HttpGet, Authorize]
        public IEnumerable<ProfessorPrivateDTO> GetProfessors() {
            if (isAdmin(HttpContext))
            {
                return _respository.GetProfessors();
            }
            else { 
                return null;
            }
        }

        [HttpPut("{id}"), Authorize]
        public IActionResult UpdatePublic(int id, [FromBody] ProfessorPublicDTO professor) {

   
            return new ObjectResult(_respository.UpdatePublic(id, professor));
        }

        [HttpPut("private/{id}"), Authorize]
        public IActionResult UpdatePrivate(int id, [FromBody] ProfessorPrivateDTO professor) {
            if (isAdmin(HttpContext))
            {
                return new ObjectResult(_respository.UpdatePrivate(id, professor));
            }
            else {
                return new UnauthorizedResult();
            }
        }


        private JwtSecurityToken decodeJWT(HttpContext context) {
            string raw = context.Request.Headers["Authorization"];
            raw = raw.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            return handler.ReadJwtToken(raw) as JwtSecurityToken;
        }

        private bool isAdmin(HttpContext context) {
            var token = decodeJWT(context);
            return token.Claims.First(claim => claim.Type == "admin").Value == "True";
        }
    }
}