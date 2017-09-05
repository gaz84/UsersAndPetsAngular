using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UsersAndPets.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string PetName { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

       
    }
}