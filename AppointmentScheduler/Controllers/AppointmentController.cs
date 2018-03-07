using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppointmentScheduler.DTO;
using AppointmentScheduler.Entities;
using AppointmentScheduler.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduler.Controllers
{
    [Produces("application/json")]
    [Route("api/Appointment")]
    [EnableCors("SiteCorsPolicy")]
    public class AppointmentController : Controller
    {

        private readonly AppointmentRepository _repository;

        public AppointmentController(AppointmentSchedulerContext context)
        {
            _repository = new AppointmentRepository(context);

        }

        [HttpGet("professor/{id}")]
        public IEnumerable<AppointmentDTO> GetAppointmentsByProfessor(int id, [FromQuery(Name = "currentWeek")] DateTime? currentWeek) {
            if(currentWeek.HasValue)
            {
                return _repository.GetWeeklyAppointmentsByProfessor(id, currentWeek.Value);
            }
            return _repository.GetAppointmentsByProfessor(id);
        }


        [HttpGet("professor/active/{id}")]
        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id) {
            return _repository.GetPendingOrScheduledAppointmentsByProfessor(id);
        }

        [HttpPost]
        public IActionResult ScheduleAppointment([FromBody] Appointment appointment) {
            Console.WriteLine("Scheduling Appointment");
            return new ObjectResult(_repository.ScheduleAppointment(appointment));
        }

        [HttpPut("cancel/{id}")]
        public IActionResult CancelAppointment(int id, [FromQuery(Name = "cancelCode")] String cancelCode) {
            return new ObjectResult(_repository.CancelAppointment(id, cancelCode));
        }
    }
}