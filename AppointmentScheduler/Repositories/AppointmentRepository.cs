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

        public IEnumerable<AppointmentDTO> GetWeeklyAppointmentsByProfessor(int id, DateTime currentWeek)
        {
            DateTime endOfWeek = currentWeek.AddDays(6);
            currentWeek = currentWeek.AddDays(-1);
            return _context.Appointments
                .Where(a => a.ProfessorID == id && a.DateTime >= currentWeek && a.DateTime <= endOfWeek)
                .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID });
        }

        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id) {
            return _context.Appointments
               .Where(a => a.ProfessorID == id && (a.Status != Appointment.StatusType.Open && a.Status != Appointment.StatusType.Cancelled))
               .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID });
        }

        public Object ScheduleAppointment(Appointment entity) {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == entity.ID);
            if (appointment == null)
            {
                return new { success = false, message = "Appointment could not be scheduled" };
            }
            else if (appointment.Status != Appointment.StatusType.Open) {
                return new { success = false, message = "Appointment is already taken" };
            }
            appointment.FirstName = entity.FirstName;
            appointment.LastName = entity.LastName;
            appointment.Email = entity.Email;
            appointment.Status = Appointment.StatusType.Pending;
            appointment.generateCancelationCode();
            _context.Appointments.Update(appointment);
            _context.SaveChanges();
            emailCancellationCode();
            return new { success = true, message = "Appointment scheduled, you will be receiving a cancellation code in your email shortly" };
        }

        public Object CancelAppointment(int id, string cancelCode) {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == id);
            if (appointment == null) {
                return new { success = false, message = "Could not find appointment" };
            }

            if (appointment.CancelCode != cancelCode) {
                return new { success = false, message = "Invalid cancel code" };
            }

            return new { success = true, message = "Appointment Cancelled" };
        }

        private void emailCancellationCode() {
            Console.WriteLine("Sending now");
        }
    }
}
