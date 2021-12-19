using KodePOSApps.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace KodePOSApps.ViewModels
{
    public class KodePOS
    {
        public KodePOS()
        {
            if (KodePOSInput == null)
            {
                KodePOSInput = new KodePOSInput();
            }
            if (Grid == null)
            {
                Grid = new List<KodePOSGrid>();
            }
        }
        public string[] idDeleteArray { get; set; }
        public string idDeleteString { get; set; }
        public string URLAction { get; set; }
        public string DeleteMessage { get; set; }
        public List<KodePOSGrid> Grid { get; set; }
        public KodePOSInput KodePOSInput { get; set; }
        public FilterKodePOS FilterKodePOS { get; set; }
    }

    public class KodePOSGrid
    {
        public bool checkID { get; set; }
        public long IDKodePOS { get; set; }
        public int NoKodePOS { get; set; }
        public string Kelurahan { get; set; }
        public string Kecamatan { get; set; }
        public string Jenis { get; set; }
        public string Kabupaten { get; set; }
        public string Propinsi { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModifyDate { get; set; }
    }

    public class KodePOSInput
    {
        public string Form { get; set; }
        public long IDKodePOS { get; set; }
        public int NoKodePOS { get; set; }
        public string Kelurahan { get; set; }
        public string Kecamatan { get; set; }
        public string Jenis { get; set; }
        public string Kabupaten { get; set; }
        public string Propinsi { get; set; }
    }

    public class FilterKodePOS
    {
        public string FilterPropinsi { get; set; }
        public string FilterKabupaten { get; set; }
    }
}