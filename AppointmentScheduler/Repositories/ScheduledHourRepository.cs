using AppointmentScheduler.DTO;
using AppointmentScheduler.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Repositories
{
    public class ScheduledHourRepository
    {
        private readonly AppointmentSchedulerContext _context;

        public ScheduledHourRepository(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public IEnumerable<ScheduledHourDTO> GetProfessorHours(int id)
        {
            return _context.ScheduledHours.Where(s => s.ProfessorID == id)
                .Select(s => new ScheduledHourDTO { ID = s.ID, Monday = s.Monday, Tuesday = s.Tuesday, Wednesday = s.Wednesday,
                    Thursday = s.Thursday, Friday = s.Friday, StartDate = s.StartDate, EndDate = s.EndDate, EndTime = s.EndTime, StartTime = s.StartTime, TypeID = s.TypeID })
                .OrderBy(s => s.TypeID);
        }

        public Object CreateScheduledHour(ScheduledHour entity)
        {
            entity.CreatedAt = DateTime.Now;
            entity.ModifiedAt = DateTime.Now;
            _context.ScheduledHours.Add(entity);
            _context.SaveChanges();
            if (entity.TypeID == ScheduledHour.ScheduledHourType.OfficeHour)
            {
                CreateAppointments(entity);
                return new { success = true, message = "Office hours scheduled", ScheduledHour = entity };
            }
            else if (entity.TypeID == ScheduledHour.ScheduledHourType.Cancellation)
            {
                CancelAppointments(entity);
                return new { success = true, message = "Office hours cancelled", ScheduledHour = entity };
            }
            return new { success = false, message = "Office hour type invalid", ScheduledHour = entity };
        }

        public Object DeleteScheduledHour(int id)
        {
            var scheduledHour = _context.ScheduledHours.FirstOrDefault(s => s.ID == id);
            if (scheduledHour == null)
            {
                return new { success = false, message = "Invalid scheduled hour ID" };
            }

            if (scheduledHour.TypeID == ScheduledHour.ScheduledHourType.Cancellation)
            {
                UncancelAppointments(scheduledHour);
            }
            else
            {
                DeleteAppointments(scheduledHour);
            }
            _context.ScheduledHours.Remove(scheduledHour);
            _context.SaveChanges();

            return new { success = true, message = "Scheduled hour deleted" };
        }

        private void CreateAppointments(ScheduledHour entity)
        {
            DateTime startTime = DateTime.Now;
            DateTime currentDate = entity.StartDate;
            DateTime endDate = entity.EndDate;
            var appointmentLength = new TimeSpan(0, 15, 0);
            endDate = endDate.AddDays(1);
            while (currentDate != endDate)
            {
                if (CheckDayOfWeek(entity, currentDate))
                {
                    var currentTime = entity.StartTime;
                    while (currentTime < entity.EndTime)
                    {
                        var appointment = new Appointment();
                        appointment.ProfessorID = entity.ProfessorID;
                        appointment.Status = Appointment.StatusType.Open;
                        appointment.DateTime = currentDate + currentTime;
                        appointment.ScheduledHourID = entity.ID;
                        _context.Appointments.Add(appointment);


                        currentTime = currentTime.Add(appointmentLength);
                    }
                    _context.SaveChanges();
                }
                currentDate = currentDate.AddDays(1);
            }
        }

        private void CancelAppointments(ScheduledHour entity)
        {
            Cancel(entity, Appointment.StatusType.Cancelled);
        }

        private void UncancelAppointments(ScheduledHour entity)
        {
            Cancel(entity, Appointment.StatusType.Open);
        }

        private void Cancel(ScheduledHour entity, Appointment.StatusType status)
        {
            DateTime startTime = DateTime.Now;
            DateTime currentDate = entity.StartDate;
            DateTime endDate = entity.EndDate;
            var appointmentLength = new TimeSpan(0, 15, 0);
            endDate = endDate.AddDays(1);
            while (currentDate != endDate)
            {
                if (CheckDayOfWeek(entity, currentDate))
                {

                    var currentTime = entity.StartTime;
                    while (currentTime < entity.EndTime)
                    {
                        var currentDateTime = currentDate + currentTime;

                        var appointment = _context.Appointments.FirstOrDefault(a => a.DateTime == currentDateTime && a.ProfessorID == entity.ProfessorID);
                        if (appointment != null)
                        {
                            if (status == Appointment.StatusType.Cancelled)
                            {

                                if (appointment.Status != Appointment.StatusType.Open || appointment.Status != Appointment.StatusType.Cancelled)
                                {
                                    AlertAppointmentChange(appointment);
                                }
                            }
                            appointment.Status = status;
                            _context.Appointments.Update(appointment);
                        }


                        currentTime = currentTime.Add(appointmentLength);
                    }
                    _context.SaveChanges();
                }

                currentDate = currentDate.AddDays(1);
            }
        }

        private void DeleteAppointments(ScheduledHour entity)
        {

            DateTime startTime = DateTime.Now;
            DateTime currentDate = entity.StartDate;
            DateTime endDate = entity.EndDate;
            var appointmentLength = new TimeSpan(0, 15, 0);
            endDate = endDate.AddDays(1);
            while (currentDate != endDate)
            {
                if (CheckDayOfWeek(entity, currentDate))
                {

                    var currentTime = entity.StartTime;
                    while (currentTime < entity.EndTime)
                    {
                        var currentDateTime = currentDate + currentTime;
                        var appointment = _context.Appointments.FirstOrDefault(a => a.DateTime == currentDateTime && a.ProfessorID == entity.ProfessorID);
                        if (appointment != null)
                        {

                            if (appointment.Status != Appointment.StatusType.Open || appointment.Status != Appointment.StatusType.Cancelled)
                            {
                                AlertAppointmentChange(appointment);
                            }
                            _context.Appointments.Remove(appointment);
                        }

                        currentTime = currentTime.Add(appointmentLength);
                    }
                    _context.SaveChanges();
                }
                currentDate = currentDate.AddDays(1);

            }
        }

        private void AlertAppointmentChange(Appointment entity)
        {
            Console.WriteLine("Cancelled Pending/Scheduled Appointment, Sending Email");
        }

        private bool CheckDayOfWeek(ScheduledHour entity, DateTime currentDate)
        {
            return (entity.Monday && currentDate.DayOfWeek == DayOfWeek.Monday)
                        || (entity.Tuesday && currentDate.DayOfWeek == DayOfWeek.Tuesday)
                        || (entity.Wednesday && currentDate.DayOfWeek == DayOfWeek.Wednesday)
                        || (entity.Thursday && currentDate.DayOfWeek == DayOfWeek.Thursday)
                        || (entity.Friday && currentDate.DayOfWeek == DayOfWeek.Friday);
        }
    }
}
