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
                .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID, BannerID = a.BannerID});
        }

        public IEnumerable<AppointmentDTO> GetWeeklyAppointmentsByProfessor(int id, DateTime currentWeek)
        {
            DateTime endOfWeek = currentWeek.AddDays(6);
            currentWeek = currentWeek.AddDays(-1);
            return _context.Appointments
                .Where(a => a.ProfessorID == id && a.DateTime >= currentWeek && a.DateTime <= endOfWeek)
                .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID, BannerID = a.BannerID });
        }

        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id) {
            return _context.Appointments
               .Where(a => a.ProfessorID == id && (a.Status != Appointment.StatusType.Open && a.Status != Appointment.StatusType.Cancelled))
               .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID, BannerID = a.BannerID });
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
            appointment.BannerID = entity.BannerID;
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

            appointment.FirstName = null;
            appointment.LastName = null;
            appointment.Email = null;
            appointment.BannerID = null;
            appointment.ModifiedAt = DateTime.Now;
            appointment.Status = Appointment.StatusType.Open;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();

            return new { success = true, message = "Appointment Cancelled" };
        }

        public Object AcceptAppointment(int id) {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == id);
            if (appointment == null) {
                return new { success = false, message = "Unable to find appointment" };
            }

            appointment.Status = Appointment.StatusType.Scheduled;
            appointment.ModifiedAt = DateTime.Today;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();
            emailAppointmentConfirmation(appointment.Email);
            return new { success = true, message = "Appointment Accepted"};
        }

        public Object RejectAppointment(int id) {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == id);
            if (appointment == null)
            {
                return new { success = false, message = "Could not find appointment" };
            }

            appointment.FirstName = null;
            appointment.LastName = null;
            appointment.Email = null;
            appointment.BannerID = null;
            appointment.ModifiedAt = DateTime.Now;
            appointment.Status = Appointment.StatusType.Open;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();

            return new { success = true, message = "Appointment Rejected" };
        }

        public Object RescheduleAppointment(int id, DateTime requestedDateTime) {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == id);
            if (appointment == null) {
                return new { success = false, message = "could not find original appointment"};
            }

            var rescheduledAppointment = _context.Appointments.FirstOrDefault(a => a.ProfessorID == appointment.ProfessorID && a.DateTime == requestedDateTime);

            if (rescheduledAppointment == null)
            {
                rescheduledAppointment = new Appointment { FirstName = appointment.FirstName, LastName = appointment.LastName, Email = appointment.Email, DateTime = requestedDateTime, CreatedAt = DateTime.Now, ModifiedAt = DateTime.Now, ProfessorID = appointment.ProfessorID, Status = Appointment.StatusType.PendingStudent, BannerID = appointment.BannerID };
                rescheduledAppointment.generateCancelationCode();
                appointment.Status = Appointment.StatusType.Open;
                appointment.FirstName = null;
                appointment.LastName = null;
                appointment.Email = null;
                appointment.BannerID = null;
                _context.Appointments.Update(appointment);
                _context.Appointments.Add(rescheduledAppointment);
                emailRescheduledNotification(rescheduledAppointment.Email);

            }
            else if (rescheduledAppointment.Status != Appointment.StatusType.Open)
            {
                return new { success = false, message = "That appointment time is already taken" };
            }
            else {
                rescheduledAppointment.Status = Appointment.StatusType.PendingStudent;
                rescheduledAppointment.FirstName = appointment.FirstName;
                rescheduledAppointment.LastName = appointment.LastName;
                rescheduledAppointment.Email = appointment.Email;
                rescheduledAppointment.BannerID = appointment.BannerID;
                appointment.Status = Appointment.StatusType.Open;
                appointment.FirstName = null;
                appointment.LastName = null;
                appointment.Email = null;
                appointment.BannerID = null;
                _context.Appointments.Update(appointment);
                _context.Appointments.Update(rescheduledAppointment);
                emailRescheduledNotification(rescheduledAppointment.Email);
            }

            _context.SaveChanges();


            return new { success = true, message = "Appointment Rescheduled"};
        }


        private void emailCancellationCode() {
            Console.WriteLine("Sending now");
        }

        private void emailAppointmentConfirmation(string email) {
            Console.WriteLine("Sending email to " + email);
        }

        private void emailRescheduledNotification(string email) {
            Console.WriteLine("Sending email to " + email);
        }


    }
}
