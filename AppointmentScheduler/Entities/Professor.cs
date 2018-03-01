using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppointmentScheduler.Entities
{
    public class Professor
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string RoomNumber { get; set; }
        public string Title { get; set; }
        public bool Admin { get; set; }
        public bool Active { get; set; }

        public string Password { get { return _password; } set { _password = setPassword(value); } }
        private string _password;

        /**
        *   @Param  password    unencrypted password
        *   @return             if password is not encrypted, encrypts password, and returns it, else returns password
        */
        private string setPassword(string password) {
            if (password.Length <= 30)
            {
                var salt = BCrypt.BCryptHelper.GenerateSalt();
                return BCrypt.BCryptHelper.HashPassword(password, salt);
            }
            else {
                return password;
            }
        }

        /*
         *  @Param  password    unencrypted password
         *  @return             Returns true if password matched hashed password, else returns false
         */
        public bool validPassword(string password) {
            return BCrypt.BCryptHelper.CheckPassword(password, this.Password);
        }

        public string getPassword() {
            return _password;
        }
    }
}
