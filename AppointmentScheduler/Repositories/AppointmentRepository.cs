using AppointmentScheduler.DTO;
using AppointmentScheduler.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Repositories
{
    public class AppointmentRepository
    {
        private readonly AppointmentSchedulerContext _context;

        public AppointmentRepository(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public IEnumerable<AppointmentDTO> GetAppointmentsByProfessor(int id) {

            return _context.Appointments
                .Where(a => a.ProfessorID == id)
                .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID});
        }

        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id) {
            return _context.Appointments
               .Where(a => a.ProfessorID == id && (a.Status != Appointment.StatusType.Open && a.Status != Appointment.StatusType.Cancelled))
               .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID });
        }
    }
}
