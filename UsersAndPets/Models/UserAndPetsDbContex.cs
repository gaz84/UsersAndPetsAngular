using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using SQLite.CodeFirst;

namespace UsersAndPets.Models
{
    public class UserAndPetsDbContex: DbContext
    {
        public UserAndPetsDbContex() : base("UsersAndPetsConnetctionString") { }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            var sqliteConnectionInitializer = new SqliteCreateDatabaseIfNotExists<UserAndPetsDbContex>(modelBuilder);
            Database.SetInitializer(sqliteConnectionInitializer);
        }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<User> Users { get; set; }
    }
}