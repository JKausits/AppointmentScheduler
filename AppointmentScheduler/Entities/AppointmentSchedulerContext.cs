using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Entities
{
    public class AppointmentSchedulerContext : DbContext
    {
        public AppointmentSchedulerContext(DbContextOptions<AppointmentSchedulerContext> options) : base(options)
        {

        }

        public DbSet<Professor> Professors { get; set; }
    }
}
