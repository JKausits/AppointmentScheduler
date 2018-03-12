using AppointmentScheduler.DTO;
using AppointmentScheduler.Email;
using AppointmentScheduler.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Repositories
{
    public class AppointmentRepository
    {
        private readonly AppointmentSchedulerContext _context;
        private readonly EmailService _emailService;

        public AppointmentRepository(AppointmentSchedulerContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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

        public IEnumerable<AppointmentDTO> GetPendingOrScheduledAppointmentsByProfessor(int id, DateTime? currentDate) {
            if (currentDate.HasValue) {
                return _context.Appointments
               .Where(a => a.ProfessorID == id && a.DateTime >= currentDate.Value &&(a.Status != Appointment.StatusType.Open && a.Status != Appointment.StatusType.Cancelled))
               .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID, BannerID = a.BannerID });
            }
            else
            {

            return _context.Appointments
               .Where(a => a.ProfessorID == id && (a.Status != Appointment.StatusType.Open && a.Status != Appointment.StatusType.Cancelled))
               .Select(a => new AppointmentDTO { ID = a.ID, FirstName = a.FirstName, LastName = a.LastName, Email = a.Email, DateTime = a.DateTime, Status = a.Status, ProfessorID = a.ProfessorID, BannerID = a.BannerID });
            }
        }

        public Object StudentAcceptAppointment(int id, string cancelCode) {
            var appointment = _context.Appointments.Where(a => a.ID == id).Include(a => a.Professor).FirstOrDefault();
            if (appointment == null)
            {
                return new { success = false, message = "Could not find appointment" };
            }

            if (appointment.CancelCode != cancelCode) {
                return new { success = false, message = "Invalid code" };
            }
            appointment.Status = Appointment.StatusType.Scheduled;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();
            return new { success = true, message = "Appointment Confirmed"};
        }

        public Object ScheduleAppointment(Appointment entity) {
            var appointment = _context.Appointments.Where(a => a.ID == entity.ID).Include(a => a.Professor).FirstOrDefault();
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
            emailCancellationCode(appointment);
            return new { success = true, message = "Appointment scheduled, you will be receiving a cancellation code in your email shortly" };
        }

        public Object CancelAppointment(int id) {
            var appointment = _context.Appointments.Where(a => a.ID == id).Include(a => a.Professor).FirstOrDefault();
            if (appointment == null) {
                return new { success = false, message = "Unable to find appointment" };
            }

            if (appointment.Status != Appointment.StatusType.Open || appointment.Status != Appointment.StatusType.Cancelled) {
                emailAppointmentCancelled(appointment);
            }

            appointment.Status = Appointment.StatusType.Cancelled;
            appointment.FirstName = null;
            appointment.LastName = null;
            appointment.Email = null;
            appointment.CancelCode = null;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();

            return new { success = true, message = "Appointment Cancelled" }; ;
        }

        public Object UncancelAppointment(int id)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.ID == id);
            if (appointment == null)
            {
                return new { success = false, message = "Unable to find appointment" };
            }

            appointment.Status = Appointment.StatusType.Open;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();

            return new { success = true, message = "Appointment Uncancelled" }; ;
        }

        public Object StudentCancelScheduledAppointment(int id, string cancelCode) {
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
            var appointment = _context.Appointments.Where(a => a.ID == id).Include(a => a.Professor).FirstOrDefault();
            if (appointment == null) {
                return new { success = false, message = "Unable to find appointment" };
            }

            appointment.Status = Appointment.StatusType.Scheduled;
            appointment.ModifiedAt = DateTime.Today;
            _context.Appointments.Update(appointment);
            _context.SaveChanges();
            emailAppointmentConfirmation(appointment);
            return new { success = true, message = "Appointment Accepted"};
        }

        public Object RejectAppointment(int id) {
            var appointment = _context.Appointments.Where(a => a.ID == id).Include(a => a.Professor).FirstOrDefault();
            if (appointment == null)
            {
                return new { success = false, message = "Could not find appointment" };
            }

            emailAppointmentCancelled(appointment);

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
            var appointment = _context.Appointments.Where(a => a.ID == id).Include(a => a.Professor).FirstOrDefault();
            if (appointment == null) {
                return new { success = false, message = "could not find original appointment"};
            }

            var rescheduledAppointment = _context.Appointments.Where(a => a.ProfessorID == appointment.ProfessorID && a.DateTime == requestedDateTime).Include(a => a.Professor).FirstOrDefault();

            if (rescheduledAppointment == null)
            {
                rescheduledAppointment = new Appointment { FirstName = appointment.FirstName, LastName = appointment.LastName, Email = appointment.Email, DateTime = requestedDateTime, CreatedAt = DateTime.Now, ModifiedAt = DateTime.Now, ProfessorID = appointment.ProfessorID, Status = Appointment.StatusType.PendingStudent, BannerID = appointment.BannerID, Professor = appointment.Professor };
                rescheduledAppointment.generateCancelationCode();
                appointment.Status = Appointment.StatusType.Open;
                appointment.FirstName = null;
                appointment.LastName = null;
                appointment.Email = null;
                appointment.BannerID = null;
                _context.Appointments.Update(appointment);
                _context.Appointments.Add(rescheduledAppointment);
                emailRescheduledNotification(rescheduledAppointment);

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
                emailRescheduledNotification(rescheduledAppointment);
            }

            _context.SaveChanges();


            return new { success = true, message = "Appointment Rescheduled"};
        }


        private async void emailCancellationCode(Appointment entity) {

            String message = String.Format("{0} {1},<br/><br/>An appointment has been requested for you with {2} on {3} at {4}.<br/><br/>If you need to cancel, your cancellation code is {5}.<br/><br/>You will be notified when the professor accepts the appointment. ", entity.FirstName, entity.LastName, entity.Professor.Name, entity.DateTime.ToShortDateString(), entity.DateTime.ToShortTimeString(), entity.CancelCode);
            await _emailService.Send(entity.Email, "Cancellation Code", message);
        }

        private async void emailAppointmentConfirmation(Appointment entity) {
            String message = String.Format("{0} {1},<br/><br/>The appointment that you requested with {2} on {3} at {4} has been accepted.", entity.FirstName, entity.LastName, entity.Professor.Name, entity.DateTime.ToShortDateString(), entity.DateTime.ToShortTimeString());
            await _emailService.Send(entity.Email, "Appointment Accepted", message);
        }

        private async void emailRescheduledNotification(Appointment entity) {
            String message = String.Format("{0} {1},<br/><br/>{2} has requested to reschedule your appointment to {3} at {4}", entity.FirstName, entity.LastName, entity.Professor.Name, entity.DateTime.ToShortDateString(), entity.DateTime.ToShortTimeString());
            await _emailService.Send(entity.Email, "Appointment Reschedule Request", message);
        }

        private async void emailAppointmentCancelled(Appointment entity) {
            String message = String.Format("{0} {1},<br/><br/>The appointment that you requested with {2} on {3} at {4} has been rejected or cancelled", entity.FirstName, entity.LastName, entity.Professor.Name, entity.DateTime.ToShortDateString(), entity.DateTime.ToShortTimeString());
            await _emailService.Send(entity.Email, "Appointment Reschedule Request", message);
        }
    }
}
