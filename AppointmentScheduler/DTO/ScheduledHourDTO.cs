using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static AppointmentScheduler.Entities.ScheduledHour;

namespace AppointmentScheduler.DTO
{
    public class ScheduledHourDTO
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Monday { get; set; }
        public bool Tuesday { get; set; }
        public bool Wednesday { get; set; }
        public bool Thursday { get; set; }
        public bool Friday { get; set; }
        public ScheduledHourType TypeID { get; set; }
    }
}
