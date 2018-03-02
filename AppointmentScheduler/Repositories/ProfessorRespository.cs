using AppointmentScheduler.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Repositories
{
    public class ProfessorRespository
    {
        private readonly AppointmentSchedulerContext _context;

        public ProfessorRespository(AppointmentSchedulerContext context)
        {
            _context = context;
        }

        public Object Insert(Professor entity) {
            entity.Active = false;
            entity.Admin = false;

            if (entity.Password == "" || entity.Password == null) {
                return new { success = false, message = "You must provide a password to create an account" };
            }

            if (entity.Email == "" || entity.Email == null) {
                return new { success = false, message = "You must provide an email to create an account" };
            }

            if (_context.Professors.SingleOrDefault(p => p.Email == entity.Email) != null) {
                return new { success = false, message = "An account with that email has already been created" };
            }

            _context.Professors.Add(entity);
            _context.SaveChanges();

            return new { success = true, message = "Account created! You will be notified when the account has been activated" };
        }

        public Professor FindByEmail(string email) {
            return _context.Professors.FirstOrDefault(p => p.Email == email);
        }
    }
}
