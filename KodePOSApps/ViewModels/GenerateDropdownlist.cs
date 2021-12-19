using KodePOSApps.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KodePOSApps.ViewModels
{
    public class GenerateDropdownlist
    {
        public GenerateDropdownlist()
        {
            if (DropDownStringModel == null)
            {
                DropDownStringModel = new List<DropDownStringModel>();
            }
        }
        public List<DropDownStringModel> DropDownStringModel { get; set; }
    }

    public class DropDownStringModel
    {

        public string id { get; set; }
        public string text { get; set; }
    }
}