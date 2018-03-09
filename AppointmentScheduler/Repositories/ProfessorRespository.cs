using AppointmentScheduler.DTO;
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

        public IEnumerable<ProfessorPublicDTO> GetActiveProfessors() {
            return _context.Professors.Where(p => p.Active).Select(p => new ProfessorPublicDTO { ID = p.ID, Email = p.Email, Name = p.Name, RoomNumber = p.RoomNumber, Title = p.Title });
        }

        public ProfessorPublicDTO GetById(int id) {
            return _context.Professors.Where(p => p.ID == id).Select(p => new ProfessorPublicDTO { ID=p.ID, Email = p.Email, Name = p.Name, RoomNumber = p.RoomNumber, Title = p.Title}).SingleOrDefault();
        }

        public Object UpdatePublic(int id, ProfessorPublicDTO entity) {
            var professor = _context.Professors.SingleOrDefault(p => p.ID == id);
            if (professor == null) {
                return new { success = false, message = "Could not find professor" };
            }

            professor.Email = entity.Email;
            professor.Name = entity.Name;
            professor.RoomNumber = entity.RoomNumber;
            professor.Title = entity.Title;

            _context.Professors.Update(professor);
            _context.SaveChanges();
            return new { success = true, message = "Information updated" };
        }
    }
}
