using AppointmentScheduler.DTO;
using AppointmentScheduler.Email;
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
        private readonly EmailService _emailService;
        public ProfessorRespository(AppointmentSchedulerContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public Object Insert(Professor entity) {
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

            return new { success = true, message = "Account created!" };
        }

        public Professor FindByEmail(string email) {
            return _context.Professors.FirstOrDefault(p => p.Email == email);
        }

        public IEnumerable<ProfessorPrivateDTO> GetProfessors() {
            return _context.Professors.Select(p => new ProfessorPrivateDTO { ID = p.ID, Email = p.Email, Name = p.Name, RoomNumber = p.RoomNumber, Title = p.Title , Admin = p.Admin, Active = p.Active}).OrderBy(p => p.Name);
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

        public Object UpdatePrivate(int id, ProfessorPrivateDTO entity)
        {
            var professor = _context.Professors.SingleOrDefault(p => p.ID == id);
            if (professor == null)
            {
                return new { success = false, message = "Could not find professor" };
            }
            

            professor.Email = entity.Email;
            professor.Name = entity.Name;
            professor.RoomNumber = entity.RoomNumber;
            professor.Title = entity.Title;

            if (!professor.Active && entity.Active)
            {
                //Send email that their profile has been activated
                sendActivatedEmail(professor);
            }
            else if (professor.Active && !entity.Active)
            {
                //Send email that their profile has been deactivated
                sendDeactivatedEmail(professor);
            }else if (!professor.Admin && entity.Admin)
            {
                //Send email that they have been granted admin access
                sendAdminGranted(professor);
            }
            else if (professor.Admin && !entity.Admin)
            {
                //Send email that their admin access has been revoked
                sendAdminRevoked(professor);
            }
                professor.Active = entity.Active;
            professor.Admin = entity.Admin;

            _context.Professors.Update(professor);
            _context.SaveChanges();
            return new { success = true, message = "Information updated" };
        }

        public Object ResetPassword(int id, string password) {
            var professor = _context.Professors.FirstOrDefault(p => p.ID == id);
            if (professor == null) {
                return new { success = false, message = "Unable to find professor with that ID" };
            }

            professor.Password = password;
            _context.Professors.Update(professor);
            _context.SaveChanges();
            return new { success = true, message = "Password Reset" };
        }
        private async void sendActivatedEmail(Professor entity) {
            string message = String.Format("Your account has been activated");
            await _emailService.Send(entity.Email, "Account Activated", message);
        }

        private async void sendDeactivatedEmail(Professor entity)
        {
            string message = String.Format("Your account has been deactivated");
            await _emailService.Send(entity.Email, "Account Deactivated", message);
        }

        private async void sendAdminGranted(Professor entity)
        {
            string message = String.Format("Your account has been granted admin access");
            await _emailService.Send(entity.Email, "Admin Access Granted", message);
        }

        private async void sendAdminRevoked(Professor entity)
        {
            string message = String.Format("Your account has been revoked of admin rights");
            await _emailService.Send(entity.Email, "Admin Access Revoked", message);
        }
    }
}
