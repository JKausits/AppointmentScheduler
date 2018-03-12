using AppointmentScheduler.DTO;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

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

        [HttpPost]
        public IActionResult Create([FromBody] Professor professor) {
            if (professor == null) {
                return BadRequest();
            }

            return new ObjectResult(_respository.Insert(professor));
        }

        [HttpGet("{id}", Name = "GetProfessor")]
        public IActionResult GetById(int id) {
            var professor = _respository.GetById(id);
            if (professor == null) {
                return NotFound();
            }

            return new ObjectResult(professor);
        }

        [HttpGet("active")]
        public IEnumerable<ProfessorPublicDTO> GetActiveProfessors() {
            return _respository.GetActiveProfessors();
        }

        [HttpGet]
        public IEnumerable<ProfessorPrivateDTO> GetProfessors() {
            return _respository.GetProfessors();
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePublic(int id, [FromBody] ProfessorPublicDTO professor) {

   
            return new ObjectResult(_respository.UpdatePublic(id, professor));
        }

        [HttpPut("private/{id}")]
        public IActionResult UpdatePrivate(int id, [FromBody] ProfessorPrivateDTO professor) {
            return new ObjectResult(_respository.UpdatePrivate(id, professor));
        }

       
        
    }
}