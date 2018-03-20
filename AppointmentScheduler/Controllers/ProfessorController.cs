using AppointmentScheduler.DTO;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using AppointmentScheduler.Services;
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
    //[EnableCors("SiteCorsPolicy")]
    public class ProfessorController : Controller
    {
        private readonly ProfessorRespository _respository;


        public ProfessorController(AppointmentSchedulerContext context, EmailService emailService)
        {
            _respository = new ProfessorRespository(context, emailService);
        }
        /*
         *===================GET===================
         */
        [HttpPost, Authorize]
        public IActionResult Create([FromBody] Professor professor) {
            if (professor == null) {
                return BadRequest();
            }


            if (AuthService.isAdmin(HttpContext))
            {
                return new ObjectResult(_respository.Insert(professor));
            }
            else {
                return Unauthorized();
            }
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
            if (AuthService.isAdmin(HttpContext))
            {
                return _respository.GetProfessors();
            }
            else {
                return null;
            }
        }


        /*
         *===================PUT===================
         */
        [HttpPut("{id}"), Authorize]
        public IActionResult UpdatePublic(int id, [FromBody] ProfessorPublicDTO professor) {


            return new ObjectResult(_respository.UpdatePublic(id, professor));
        }

        [HttpPut("private/{id}"), Authorize]
        public IActionResult UpdatePrivate(int id, [FromBody] ProfessorPrivateDTO professor) {
            if (AuthService.isAdmin(HttpContext))
            {
                return new ObjectResult(_respository.UpdatePrivate(id, professor));
            }
            else {
                return new UnauthorizedResult();
            }
        }

        [HttpPut("password/{id}"), Authorize]
        public IActionResult ResetPassword(int id, [FromQuery(Name = "password")] string password)
        {
            Console.WriteLine("\n\n\nPassword: " + password + "\n\n\n");
            return new ObjectResult(_respository.ResetPassword(id, password));
        }
        
    }
}
