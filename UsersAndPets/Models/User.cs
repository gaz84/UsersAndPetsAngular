using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace UsersAndPets.Models
{
    
    public class User
    {
        public User()
        {
            Pets = new List<Pet>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }

        public virtual ICollection<Pet> Pets { get; set; }


    }
}