using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/ScheduledHour")]
    [EnableCors("SiteCorsPolicy")]
    public class ScheduledHourController : Controller
    {
        private readonly ScheduledHourRepository _respository;
        public ScheduledHourController(AppointmentSchedulerContext context)
        {
            _respository = new ScheduledHourRepository(context);
        }

        [HttpGet("{id}")]
        public IActionResult GetByID(int id) {
            return new ObjectResult(_respository.GetProfessorHours(id));
        }

        [HttpPost]
        public IActionResult CreateScheduledHour([FromBody] ScheduledHour scheduledHour) {
           
            return new ObjectResult(_respository.CreateScheduledHour(scheduledHour));

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteScheduledHour(int id) {
            return new ObjectResult(_respository.DeleteScheduledHour(id));
        }
        
    }
}