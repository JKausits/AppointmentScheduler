using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Entities
{
    public class Appointment
    {

        public enum StatusType { Open, Pending, PendingStudent, Scheduled, Cancelled };
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int ProfessorID { get; set; }
        public int ScheduledHourID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CancelCode { get; set; }
        public StatusType Status { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }

        public virtual Professor Professor { get; set; }
        public virtual ScheduledHour ScheduledHour { get; set; }
    }
}
