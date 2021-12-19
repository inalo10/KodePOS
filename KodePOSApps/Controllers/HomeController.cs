using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using KodePOSApps.Models;
using KodePOSApps.ViewModels;
using StaticKeeperLib.Framework.Controller;
using Newtonsoft.Json;

namespace KodePOSApps.Controllers
{
    public class HomeController : CController
    {

        KodePOSEntities db = new KodePOSEntities();

        #region View Data
        public ActionResult Index(KodePOS KodePOS)
        {
            if (this.Request.RequestType == "GET")
            {
                KodePOS = new KodePOS();

                ViewBag.PropinsiList = Propinsi();
                ViewBag.KabupatenList = KabupatenbyPropinsi(null);
            }
            else
            {
                try
                {
                    this.RemoveObject("HomeIndex", "Propinsi");
                    this.RemoveObject("HomeIndex", "KabupatenbyPropinsi");

                    string ProfinsiVal = !String.IsNullOrEmpty(KodePOS.FilterKodePOS.FilterPropinsi) ? KodePOS.FilterKodePOS.FilterPropinsi : "";
                    string KabupatenbyPropinsiVal = !String.IsNullOrEmpty(KodePOS.FilterKodePOS.FilterKabupaten) ? KodePOS.FilterKodePOS.FilterKabupaten : "";

                    this.StoreObject("HomeIndex", "Propinsi", ProfinsiVal);
                    this.StoreObject("HomeIndex", "KabupatenbyPropinsi", KabupatenbyPropinsiVal);

                    ViewBag.PropinsiList = Propinsi();
                    ViewBag.KabupatenList = KabupatenbyPropinsi(ProfinsiVal);
                }
                catch (Exception)
                {
                    throw;
                }
            }

            ViewBag.Status = TempData["Status"] != null ? TempData["Status"] : 0;
            ViewBag.Message = TempData["Message"] != null ? TempData["Message"] : "NULL";

            return View(KodePOS);
        }

        public JsonResult GetData()
        {
            string Propinsi = this.GetObject("HomeIndex", "Propinsi") != null ? this.GetObject("HomeIndex", "Propinsi").ToString() : "";
            string Kabupaten = this.GetObject("HomeIndex", "KabupatenbyPropinsi") != null ? this.GetObject("HomeIndex", "KabupatenbyPropinsi").ToString() : "";

            try
            {
                NameValueCollection nvc = HttpUtility.ParseQueryString(Request.Url.Query);
                string sEcho = nvc["sEcho"].ToString();
                string sSearch = nvc["sSearch"].ToString();
                int iDisplayStart = Convert.ToInt32(nvc["iDisplayStart"]);
                int iDisplayLength = Convert.ToInt32(nvc["iDisplayLength"]);
                int iSortCol = Convert.ToInt32(nvc["iSortCol_0"]);
                string sortOrder = nvc["sSortDir_0"].ToString();

                //get data from database
                var KodePOSDT = (from a in db.T_Master_KodePOS
                                 select new KodePOSGrid
                                 {
                                     IDKodePOS = a.IDKodePOS,
                                     NoKodePOS = a.NoKodePOS,
                                     Kelurahan = a.Kelurahan,
                                     Kecamatan = a.Kecamatan,
                                     Jenis = a.Jenis,
                                     Kabupaten = a.Jenis + " " + a.Kabupaten,
                                     Propinsi = a.Propinsi,
                                     ModifyDate = a.ModifyDate
                                 }).ToList();

                if (!string.IsNullOrEmpty(Propinsi))
                {
                    KodePOSDT = KodePOSDT.Where(ss => ss.Propinsi.ToLower() == Propinsi.ToLower()).ToList();
                }
                if (!string.IsNullOrEmpty(Kabupaten))
                {
                    KodePOSDT = KodePOSDT.Where(ss => ss.Kabupaten.ToLower() == Kabupaten.ToLower()).ToList();
                }

                //get total value count
                var Count = KodePOSDT.Count();

                //Search query when sSearch is not empty
                if (sSearch != "" && sSearch != null) //If there is search query
                {
                    KodePOSDT = KodePOSDT.Where(a => a.NoKodePOS.ToString().ToLower().Contains(sSearch.ToLower())
                                      || a.Kelurahan.ToLower().Contains(sSearch.ToLower())
                                      || a.Kecamatan.ToLower().Contains(sSearch.ToLower())
                                      || a.Kabupaten.ToLower().Contains(sSearch.ToLower())
                                      || a.Propinsi.ToLower().Contains(sSearch.ToLower())
                                      ).ToList();

                    Count = KodePOSDT.Count();
                    // Call SortFunction to provide sorted Data, then Skip using iDisplayStart  
                    KodePOSDT = SortFunction(iSortCol, sortOrder, KodePOSDT, sEcho).Skip(iDisplayStart).Take(iDisplayLength).ToList();
                }
                else
                {
                    //get data from database
                    KodePOSDT = KodePOSDT.ToList();

                    // Call SortFunction to provide sorted Data, then Skip using iDisplayStart  
                    KodePOSDT = SortFunction(iSortCol, sortOrder, KodePOSDT, sEcho).Skip(iDisplayStart).Take(iDisplayLength).ToList();
                }

                //Create a model for datatable paging and sending data & enter all the required values
                var KodePOSPaged = new SysDataTablePager<KodePOSGrid>(KodePOSDT, Count, Count, sEcho);

                return Json(KodePOSPaged, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private List<KodePOSGrid> SortFunction(int iSortCol, string sortOrder, List<KodePOSGrid> list, string sEcho)
        {

            //Sorting for String columns
            if (iSortCol == 0 || iSortCol == 1 || iSortCol == 2 || iSortCol == 3 || iSortCol == 4)
            {
                Func<KodePOSGrid, string> orderingFunction =
                    (c => iSortCol == 0 ? c.NoKodePOS.ToString()
                    : iSortCol == 1 ? c.Kelurahan
                    : iSortCol == 2 ? c.Kecamatan
                    : iSortCol == 3 ? c.Kabupaten
                    : iSortCol == 4 ? c.Propinsi
                    : c.NoKodePOS.ToString()); // compare the sorting column

                if (sEcho == "1")
                {
                    list = list.OrderByDescending(ss => ss.ModifyDate).ToList();
                }
                else
                {
                    if (sortOrder == "desc")
                    {
                        list = list.OrderByDescending(orderingFunction).ToList();
                    }
                    else
                    {
                        list = list.OrderBy(orderingFunction).ToList();
                    }
                }
            }

            return list;
        }
        #endregion

        #region Input and Delete
        public ActionResult InputKodePOS(int? id)
        {
            KodePOS KodePOS = new KodePOS();

            try
            {
                if (id != null && id != 0)
                {
                    KodePOS.KodePOSInput.Form = "Edit";

                    T_Master_KodePOS toGet = db.T_Master_KodePOS.Find(id);

                    KodePOS.KodePOSInput.IDKodePOS = toGet.IDKodePOS;
                    KodePOS.KodePOSInput.NoKodePOS = toGet.NoKodePOS;
                    KodePOS.KodePOSInput.Kelurahan = toGet.Kelurahan;
                    KodePOS.KodePOSInput.Kecamatan = toGet.Kecamatan;
                    KodePOS.KodePOSInput.Jenis = toGet.Jenis;
                    KodePOS.KodePOSInput.Kabupaten = toGet.Kabupaten;
                    KodePOS.KodePOSInput.Propinsi = toGet.Propinsi;
                }
                else
                {
                    KodePOS.KodePOSInput = new KodePOSInput();
                    KodePOS.KodePOSInput.Form = "Create";
                }

                ViewBag.JenisList = Jenis();
            }
            catch (Exception)
            {
                throw;
            }

            return View("InputKodePOS", KodePOS);
        }

        [HttpPost]
        public ActionResult InputKodePOS(KodePOS KodePOS)
        {
            var dbContextTransaction = db.Database.BeginTransaction();
            try
            {
                long? id = KodePOS.KodePOSInput.IDKodePOS;
                if (id != null && id != 0)
                {
                    T_Master_KodePOS toUpdate = db.T_Master_KodePOS.Find(id);
                    toUpdate.IDKodePOS = KodePOS.KodePOSInput.IDKodePOS;
                    toUpdate.NoKodePOS = KodePOS.KodePOSInput.NoKodePOS;
                    toUpdate.Kelurahan = KodePOS.KodePOSInput.Kelurahan;
                    toUpdate.Kecamatan = KodePOS.KodePOSInput.Kecamatan;
                    toUpdate.Jenis = KodePOS.KodePOSInput.Jenis;
                    toUpdate.Kabupaten = KodePOS.KodePOSInput.Kabupaten;
                    toUpdate.Propinsi = KodePOS.KodePOSInput.Propinsi;

                    toUpdate.ModifyDate = DateTime.Now;

                    dbContextTransaction.Commit();
                    db.Entry(toUpdate).State = EntityState.Modified;
                    db.SaveChanges();

                    TempData["Status"] = "1";
                    TempData["Message"] = "Updating row";
                }
                else
                {
                    T_Master_KodePOS toAdd = new T_Master_KodePOS();
                    toAdd.NoKodePOS = KodePOS.KodePOSInput.NoKodePOS;
                    toAdd.Kelurahan = KodePOS.KodePOSInput.Kelurahan;
                    toAdd.Kecamatan = KodePOS.KodePOSInput.Kecamatan;
                    toAdd.Jenis = KodePOS.KodePOSInput.Jenis;
                    toAdd.Kabupaten = KodePOS.KodePOSInput.Kabupaten;
                    toAdd.Propinsi = KodePOS.KodePOSInput.Propinsi;

                    toAdd.CreatedDate = DateTime.Now;
                    toAdd.ModifyDate = DateTime.Now;

                    dbContextTransaction.Commit();
                    db.T_Master_KodePOS.Add(toAdd);
                    db.SaveChanges();

                    TempData["Status"] = "1";
                    TempData["Message"] = "Creating row";
                }
            }
            catch (Exception e)
            {
                dbContextTransaction.Rollback();
                TempData["Status"] = "2";
                TempData["Message"] = "Updating row";
                throw e;
            }

            return RedirectToAction("Index");
        }

        //public ActionResult DeleteKodePOS(int? id)
        //{
        //    KodePOS KodePOS = new KodePOS();
        //    try
        //    {
        //        T_Master_KodePOS toDelete = db.T_Master_KodePOS.Find(id);
        //        KodePOS.KodePOSInput.IDKodePOS = toDelete.IDKodePOS;

        //        KodePOS.URLAction = "DeleteKodePOS";
        //        KodePOS.DeleteMessage = "Are you sure want to delete this ?";
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return PartialView("DeletePopupKodePOS", KodePOS);
        //}

        [HttpPost]
        public ActionResult DeleteKodePOS(long? id)
        {
            var dbContextTransaction = db.Database.BeginTransaction();

            try
            {
                T_Master_KodePOS toDelete = db.T_Master_KodePOS.Find(id);

                dbContextTransaction.Commit();
                db.T_Master_KodePOS.Remove(toDelete);
                db.SaveChanges();

                TempData["Status"] = "1";
                TempData["Message"] = "Delete row";
            }
            catch (Exception e)
            {
                dbContextTransaction.Rollback();
                TempData["Status"] = "2";
                TempData["Message"] = "Delete row";
                throw e;
            }

            return RedirectToAction("Index");
        }
        #endregion

        #region Dropdownlist
        public static SelectList Jenis()
        {
            KodePOSEntities db = new KodePOSEntities();

            List<string> Jenislist = new List<string>();

            Jenislist = (from a in db.T_Master_KodePOS select a.Jenis).Distinct().ToList();

            var ddlList = (from p in Jenislist select new DropDownStringModel { id = p, text = p }).OrderBy(x => x.text).ToList();
            return new SelectList(ddlList, "id", "text");
        }

        public static SelectList Propinsi()
        {
            KodePOSEntities db = new KodePOSEntities();

            List<string> Propinsilist = new List<string>();

            Propinsilist = (from a in db.T_Master_KodePOS select a.Propinsi).Distinct().ToList();

            var ddlList = (from p in Propinsilist select new DropDownStringModel { id = p, text = p }).OrderBy(x => x.text).ToList();
            return new SelectList(ddlList, "id", "text");
        }

        public static SelectList Kabupaten()
        {
            KodePOSEntities db = new KodePOSEntities();

            List<string> Kabupatenlist = new List<string>();

            Kabupatenlist = (from a in db.T_Master_KodePOS select a.Kabupaten).Distinct().ToList();

            var ddlList = (from p in Kabupatenlist select new DropDownStringModel { id = p, text = p }).OrderBy(x => x.text).ToList();
            return new SelectList(ddlList, "id", "text");
        }

        public static SelectList KabupatenbyPropinsi(string Propinsi = null)
        {
            KodePOSEntities db = new KodePOSEntities();

            List<string> Kabupatenlist = new List<string>();

            if (!String.IsNullOrEmpty(Propinsi))
            {
                Kabupatenlist = (from a in db.T_Master_KodePOS.Where(ss => ss.Propinsi.Contains(Propinsi)) select a.Jenis + " " + a.Kabupaten).Distinct().ToList();
            }
            else
            {
                Kabupatenlist = new List<string>();
            }

            var ddlList = (from p in Kabupatenlist select new DropDownStringModel { id = p, text = p }).OrderBy(x => x.text).ToList();
            return new SelectList(ddlList, "id", "text");
        }

        public JsonResult KabupatenbyPropinsiJSON(string dataJSON)
        {
            var js = new JavaScriptSerializer();
            var dedataJSON = (Dictionary<string, object>)js.DeserializeObject(dataJSON);

            try
            {
                if (!string.IsNullOrEmpty(dedataJSON["SourceID"].ToString()))
                {
                    var SourceID = dedataJSON["SourceID"].ToString();

                    var ddList = (
                        from a in db.T_Master_KodePOS.Where(ss => ss.Propinsi.Contains(SourceID))
                        select new DropDownStringModel
                        {
                            id = a.Jenis + " " + a.Kabupaten,
                            text = a.Jenis + " " + a.Kabupaten
                        }).Distinct().ToList();

                    var jsonAfd = Json(ddList, JsonRequestBehavior.AllowGet);

                    return jsonAfd;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Json(new List<DropDownStringModel>(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}