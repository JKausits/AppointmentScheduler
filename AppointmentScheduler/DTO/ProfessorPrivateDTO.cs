using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.DTO
{
    public class ProfessorPrivateDTO : ProfessorPublicDTO
    {
        public bool Admin { get; set; }
        public bool Active { get; set; }
    }
}
