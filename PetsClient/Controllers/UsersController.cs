﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PetsClient.Controllers
{
    public class UsersController : Controller
    {
        public ActionResult ShowUsers()
        {

            return View();
        }
       
    }
}