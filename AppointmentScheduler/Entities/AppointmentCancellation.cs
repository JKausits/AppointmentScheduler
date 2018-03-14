using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static AppointmentScheduler.Entities.Appointment;

namespace AppointmentScheduler.Entities
{
    public class AppointmentCancellation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int ProfessorID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public StatusType Status { get; set; }
        public DateTime DateTime { get; set; }
        public string Reason { get; set; }

        public virtual Professor Professor { get; set; }
    }
}
