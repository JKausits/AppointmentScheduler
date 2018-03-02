using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/Professor")]
    [EnableCors("SiteCorsPolicy")]
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