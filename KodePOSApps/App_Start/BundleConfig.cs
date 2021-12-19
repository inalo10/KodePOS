using System.Web;
using System.Web.Optimization;

namespace KodePOSApps
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //JS
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                         "~/Scripts/newest/jquery-{version}.js",
                         "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/newest/jquery.unobtrusive*",
                        "~/Scripts/newest/jquery.validate*",
                        "~/Scripts/newest/jquery-ui.js",
                        "~/Scripts/newest/jquery.customvalidation.js",
                        "~/Scripts/newest/jquery.masknumber.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.js",
                        "~/Scripts/bootstrap-waitingfor.js",
                        "~/Scripts/bootstrap.bundle.js",
                        "~/Scripts/bootstrap-datepicker.js",
                        "~/Scripts/bootstrap-notify.js",
                        "~/Scripts/bootstrap-select.min.js",
                        "~/Scripts/bootstrap-treeview.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/AdminLTE").Include(
                        "~/Content/admin-lte/js/adminlte.js"));

            bundles.Add(new ScriptBundle("~/bundles/datatable").Include(
                        "~/Content/datatable/datatables/js/jquery.dataTables.js",
                        "~/Content/datatable/datatables-responsive/dataTables.responsive.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/ModalPopup").Include(
                        "~/Scripts/MasterData/ModalPopUp/KodePOSPopup.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/General").Include(
                        "~/Content/General/general.js",
                        "~/Content/General/pagination.js",
                        "~/Content/General/moment.js",
                        "~/Content/General/inputmask.js",
                        "~/Content/General/inputmask.date.extensions.js",
                        "~/Content/General/jquery.inputmask.js"
                        ));

            //CSS
            bundles.Add(new StyleBundle("~/Content/admin-lte/css/skins").Include(
                "~/Content/admin-lte/css/skins/_all-skins.css"
                ));

            bundles.Add(new StyleBundle("~/Content/admin-lte/css").Include(
                "~/Content/admin-lte/css/AdminLTE.css"
                ));

            bundles.Add(new StyleBundle("~/Content/stepper/src/css").Include(
                "~/Content/stepper/src/css/bs-stepper.css"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap/bootstrap.css",
                "~/Content/bootstrap/bootstrap-select.css",
                "~/Content/bootstrap/bootstrap-treeview-1.2.0/bootstrap-treeview.css",
                "~/Content/bootstrap/bootstrap-treeview-1.2.0/bootstrap-treeview.min.css",
                "~/Content/font-awesome.css",
                "~/Content/site.css"
                ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/bootstrap-datepicker3.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}
