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
            return _context.ScheduledHours.Where(s => s.ProfessorID == id).Select(s => new ScheduledHourDTO { Monday = s.Monday, Tuesday = s.Tuesday, Wednesday = s.Wednesday, Thursday = s.Thursday, Friday = s.Friday, StartDate = s.StartDate, EndDate = s.EndDate, EndTime = s.EndTime, StartTime = s.StartTime, TypeID = s.TypeID });
        }

        public Object CreateScheduledHour(ScheduledHour entity ) {
            entity.CreatedAt = DateTime.Now;
            entity.ModifiedAt = DateTime.Now;
            return null;
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
                var currentTime = entity.StartTime;
                while (currentTime < entity.EndTime)
                {
                    if ((entity.Monday && currentDate.DayOfWeek == DayOfWeek.Monday)
                        || (entity.Tuesday && currentDate.DayOfWeek == DayOfWeek.Tuesday)
                        || (entity.Wednesday && currentDate.DayOfWeek == DayOfWeek.Wednesday)
                        || (entity.Thursday && currentDate.DayOfWeek == DayOfWeek.Thursday)
                        || (entity.Friday && currentDate.DayOfWeek == DayOfWeek.Friday))
                    {
                        var appointment = new Appointment();
                        appointment.ProfessorID = entity.ProfessorID;
                        appointment.Status = Appointment.StatusType.Open;
                        appointment.DateTime = currentDate + currentTime;
                        appointment.ScheduledHourID = entity.ID;
                        _context.Appointments.Add(appointment);

                    }

                    currentTime = currentTime.Add(appointmentLength);
                }
                _context.SaveChanges();
                currentDate = currentDate.AddDays(1);
            }
        }
    }
}
