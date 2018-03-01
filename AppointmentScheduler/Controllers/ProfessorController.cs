using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/Professor")]
    public class ProfessorController : Controller
    {
        private readonly ProfessorRespository _respository;


        public ProfessorController(AppointmentSchedulerContext context)
        {
            _respository = new ProfessorRespository(context);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Professor professor) {
            if (professor == null) {
                return BadRequest();
            }

            return new ObjectResult(_respository.Insert(professor));
        }
    }
}