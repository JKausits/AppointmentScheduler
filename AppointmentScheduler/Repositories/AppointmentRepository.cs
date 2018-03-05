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


    }
}
