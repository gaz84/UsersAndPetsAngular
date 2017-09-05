using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UsersAndPets.Models;

namespace UsersAndPets.Controllers
{
    public class HomeController : Controller
    {
        private UserAndPetsDbContex db = new UserAndPetsDbContex();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
