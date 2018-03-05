using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static AppointmentScheduler.Entities.Appointment;

namespace AppointmentScheduler.DTO
{
    public class AppointmentDTO
    {
        public int ID { get; set; }
        public int ProfessorID { get; set; }
        public int ScheduledHourID { get; set; }
        public ProfessorPublicDTO Professor { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public StatusType Status { get; set; }
        public DateTime DateTime { get; set; }
    }
}
