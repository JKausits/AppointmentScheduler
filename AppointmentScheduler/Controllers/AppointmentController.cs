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
        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id, [FromQuery(Name = "currentDate")] DateTime? currentDate) {

            return _repository.GetPendingOrScheduledAppointmentsByProfessor(id, currentDate);
        }


        [HttpPut("accept/{id}")]
        public IActionResult ConfirmAppointment(int id) {
            return new ObjectResult(_repository.AcceptAppointment(id));
        }

        [HttpPut("reject/{id}")]
        public IActionResult RejectAppointment(int id) {
            return new ObjectResult(_repository.RejectAppointment(id));
        }


        [HttpPut("cancel/{id}")]
        public IActionResult StudentCancelScheduledAppointment(int id, [FromQuery(Name = "cancelCode")] String cancelCode) {
            return new ObjectResult(_repository.StudentCancelScheduledAppointment(id, cancelCode));
        }

        [HttpPut("professor/cancel/{id}")]
        public IActionResult CancelAppointment(int id) {
            return new ObjectResult(_repository.CancelAppointment(id));
        }

        [HttpPut("professor/uncancel/{id}")]
        public IActionResult UncancelAppointment(int id)
        {
            return new ObjectResult(_repository.UncancelAppointment(id));
        }

        [HttpPost]
        public IActionResult ScheduleAppointment([FromBody] Appointment appointment) {
            return new ObjectResult(_repository.ScheduleAppointment(appointment));
        }

        [HttpPost("reschedule/{id}")]
        public IActionResult RescheduleAppointment(int id, [FromQuery(Name = "requestedDateTime")] DateTime requestedDateTime) {
            Console.WriteLine(requestedDateTime);
            return new ObjectResult(_repository.RescheduleAppointment(id, requestedDateTime));
        }

    }
}