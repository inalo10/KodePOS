var ModalHref = "";
var CurrUrl = "";
var UrlWithoutAction = "";

$(document).ready(function () {
    initCurrUrl();

    initDataTables();

    initAutoComplete();

    initImageUploader();
    //$('#dataTables-example').DataTable({
    //    responsive: true
    //});

    $('.datepicker').datepicker({
        //format: "dd/mm/yyyy",
        format: "dd/mm/yyyy",
        autoclose: true
    }).inputmask('date');

    $('.monthyearpicker').datepicker({
        //format: "dd/mm/yyyy",
        viewMode: "months",
        minViewMode: "months",
        format: "dd/mm/yyyy",
        autoclose: true,
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        }
    }).inputmask('date');

    $('input.codenumber').keyup(function (event) {
        // skip for arrow keys

        if (event.which >= 37 && event.which <= 40) {
            var testvatestva = $(this).val();
            $(this).val('');

            $(this).val(testvatestva);
            $(this).focus();
            return false;
        };

        //var idHid = $(this).attr('id').replace("Disp", "");

        var value = $(this).val();
        value = value.replace(/\D/g, '');
        //value = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        //var valueHid = value.replace(/,/g, "");
        //$(idHid).val(valueHid);

        //if (value.indexOf("0") == 0 && value.length > 1) {
        //    value = value.replace("0", "");
        //}

        //if (value == "") {
        //    value = "0";
        //}
        //fillHidden(this, 'number', value);
        $(this).val(value);


    });

    $('.decimal').maskNumber();

    if ($('.decimal').hasClass('no-calc')) {
        $('.decimal').blur(function () {
            var idHid = $(this).attr('id') + "Hid";
            var value = $(this).val();
            if (value == "") {
                $(this).val("0.00");
            }
            value = value == "" ? 0 : value;
            var valueNew = value.replace(/,/g, "") >= 0 ? parseFloat(value.replace(/,/g, "")) : 0;
            $("#" + idHid).val(valueNew);

        });
        //$(document).on("dblclick", "." + table + " td", function (e) {
        //    var id = $(this).closest('tr').attr("id");
        //    editRow(id);
        //});
    }

    //$('.decimal').hasc
    //});
    //$('.no-calc').blur(function () {

    //});


    //$('.datepickerMY').datepicker({
    //    changeMonth: true,
    //    changeYear: true,
    //    showButtonPanel: true,
    //    dateFormat: 'MM yy',
    //    onClose: function (dateText, inst) {
    //        $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
    //    }
    //});

    //jQuery.validator.methods.date = function (value, element) {
    //    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    //    if (isChrome) {
    //        var d = new Date();
    //        return this.optional(element) || !/Invalid|NaN/.test(new Date(d.toLocaleDateString(value)));
    //    } else {
    //        return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
    //    }
    //};
});

function initCurrUrl() {
    var splitstr = location.pathname.split("/");
    var newPath = "";
    for (var i = 1 ; i < splitstr.length - 1; i++) {
        newPath += "/" + splitstr[i];
    }
    CurrUrl = location.protocol + '//' + location.host + location.pathname;
    UrlWithoutAction = location.origin + newPath;
}

function initImageUploader() {
    $('input.imageuploader').each(function () {
        $(this).change(function () {
            readURL(this);
        });
    });

}




function readURL(input) {
    var previewID = $(input).attr("id").replace("file", "preview");
    var hiddenID = $(input).attr("id").replace("file", "hidden");
    var tempID = $(input).attr("id").replace("file", "temporary");

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var sa = e.target.result;
            $('#' + previewID).attr('src', e.target.result);
            $('#' + hiddenID).val(e.target.result);
            $('#' + tempID).val(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function initAutoComplete() {
    var init = {};
    $('input.autocomplete').each(function () {
        var urlEle = $(this).attr("name").replace("Name", "Url");
        urlEle = urlEle.indexOf("Url") != -1 ? urlEle : urlEle + "Url";
        var urlx = $("#" + urlEle).attr("href");
        $(this).bootcomplete({
            url: urlx,
            minLength: 1,
            idField: true,
            idFieldName: $(this).attr("name"),
            idHiddenFieldName: $(this).attr("name").replace("Name", "")
        });

    });
}

function initDataTables() {
    var init = {};

    $('.dataTable').each(function () {
        if ($(this).hasClass('no-sort')) init["bSort"] = false;
        if ($(this).hasClass('scroll-horizontal')) init["scrollX"] = true;
        if ($(this).hasClass('no-search')) init["bFilter"] = false;
        if ($(this).hasClass('no-paging')) init["paging"] = false;
        if ($(this).hasClass('defer-render')) init["deferRender"] = true;
        if ($(this).hasClass('serverside')) {
            init["serverSide"] = true;
            init["processing"] = true;
            init["ajax"] = {
                "url": "GetData",
                "type": "POST",
                "datatype": "json"
            };
            init["columns"] = new Array();
            init["columns"].push({ "defaultContent": "<input type='checkbox' />", "sClass": "unmodified" })
            var ALSS;
            for (var ssp = 1 ; ssp < TI.length ; ssp++) {
                var attribute = { "data": TI[ssp].Name.includes("ID") || TI[ssp].Name.includes("IsActive") ? TI[ssp].Name + 'Name' : TI[ssp].Name, "defaultContent": "", "name": TI[ssp].Name, "sClass": TI[ssp].Name }
                if (TI[ssp].Type.includes("AutocompleteDDL")) {
                    ALSS = ssp;
                    attribute = {
                        "data": TI[ALSS].Name.includes("ID") || TI[ALSS].Name.includes("IsActive") ? TI[ALSS].Name + 'Name' : TI[ALSS].Name, "defaultContent": "", "name": TI[ALSS].Name, "sClass": TI[ALSS].Name, "mRender": function (data, type, full) {
                            return data != null ? data + '<input data-val="true"  id="hidden-' + TI[ALSS].Name + '" name="item.' + TI[ALSS].Name + '" type="hidden" value="' + full[TI[ALSS].Name] + '">' : "";
                        }
                    };
                }
                init["columns"].push(attribute);
            };
            var Action = String.format("{0} {1}", IsUpdate == "True" ? '<a href="javascript:;" title="Edit" class="btn btn-outline btn-warning btn-xs"><i class="glyphicon glyphicon-edit ajaxEdit"></i></a>' : "", IsDelete == "True" ? '<a href="javascript:;" title="Delete" class="btn btn-outline btn-danger btn-xs"><i class="glyphicon glyphicon-trash ajaxDelete"></i></a>' : "");
            init["columns"].push({ "defaultContent": Action, "sClass": "text-center unmodified" })
        }
        init["pagingType"] = "full_numbers";

        init["oLanguage"] = {};
        init.oLanguage["sLengthMenu"] = "Display _MENU_ records";
        init["lengthMenu"] = [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]];

        if (!$.fn.dataTable.isDataTable(this)) {
            try {
                $(this).dataTable(
                    init
                );
            } catch (e) {
                alert(e);
            }
        }
    });
}


function processSubmit(obj, tableID) {
    var t = "#alertPlace";
    var t1 = "#alertPlace1";
    try {
        var url = $(obj).attr('action');
        var method = obj.method;

        var oTable = $("#" + tableID).dataTable();
        var data = oTable.$('input, select').serialize();

        var msg = "url=" + url + "&type=" + method;
        $.ajax({
            url: url,
            type: method,
            data: data,
            //beforeSend: function () {
            //    //$('#modal-loading').modal('show');
            //    $('#modal-loading').modal({
            //        backdrop: 'static',
            //        keyboard: false
            //    });
            //},
            error: function () {
                alert('error: ' + Error.msg);
            },
            success: function (result) {
                //console.log(result);


                if (result.success) {
                    // if result is success

                    show_alert("Posting Succeed!", "success", t);
                    //show_alert("Perubahan Berhasil!", "success", t1);
                    setTimeout(function () {
                        $(t).slideUp(); $(t1).slideUp();
                        location.reload();
                    }, 5000);
                } else {
                    var strerror = (typeof result.error == "undefined") ? 'Posting Fail!' : result.error;
                    show_alert(strerror, "danger", t);
                    //show_alert("Perubahan Gagal!", "danger", t1);
                    setTimeout(function () { $(t).slideUp(); $(t1).slideUp(); }, 5000);
                }
            },
            complete: function () {
                //setTimeout(function () { $('#modal-loading').modal('hide'); }, 500);

            },
        });
    } catch (e) {
        show_alert("Perubahan Gagal!", "danger", "#alert");
        console.log(e);
    }
}


function processSubmitChecked(obj, tableID) {
    var t = "#alertPlace";
    var t1 = "#alertPlace1";
    try {
        var url = $(obj).attr('action');
        var method = obj.method;

        var oTable = $("#" + tableID).dataTable();
        //oTable.$('input, select').each(function () {
        //    var ta = $(this).serialize();
        //});
        //oTable.$('tr').each(function () {
        //    var ta = this.$('input, select').serialize();
        //});
        var data = oTable.$('input, select').serialize();
        $("input:checked", oTable.fnGetNodes()).each(function () {
            var test1 = $(this).serialize();
        });

        var test = oTable.fnGetData();
        var test1 = test[0];
        //var test2 = test1[0].find('input,select').serialize();
        var test11 = {};
        //test11["BirthPlaceName"] = "1234";
        //test11["CitizenshipName"] = "1234";
        //test11["GridView"] = {};
        //test11.GridView[1] = {};
        //test11.GridView[1]["IsChecked"] = true;

        //var data = test11;
        var counter = 0;
        //oTable.$('input:checkbox:checked').closest('tr').each(function () {
        //    var aa = $(this).find(':first');
        //    var name = $(aa).attr('name');
        //});
        oTable.$('input:checkbox:checked').closest('tr').each(function () {
            //oTable.$('input:checkbox:checked').closest('tr').find('input, select').each(function () {

            $(this).find('input, select').each(function () {
                var thisName = "";
                var componentName1 = $(this).attr('name').split(".");
                for (var i in componentName1) {
                    if (componentName1[i].indexOf('[') != -1) {
                        thisName = thisName == "" ? componentName1[i].substring(0, componentName1[i].indexOf('[')) + "[" + counter + "]" : thisName + "." + componentName1[i].substring(0, componentName1[i].indexOf('[')) + "[" + counter + "]";
                    } else {
                        thisName = thisName == "" ? componentName1[i] : thisName + "." + componentName1[i];
                    }
                }
                test11[thisName] = typeof test11[thisName] !== 'undefined' ? test11[thisName] : $(this).val();
            });
            counter++;
            //var id = $(this).attr('id');
        });
        //data = test11;
        //var data = oTable.$('input:checkbox:checked').closest('tr').find('input, select').serialize();
        //var data = oTable.$('input:checkbox:checked').closest('tr')..serialize();
        //var data = oTable.row.$('input:checkbox:checked, input, select').serialize();
        //var newData;
        //data.each(function () {
        //    var test = this;
        //});

        var msg = "url=" + url + "&type=" + method;
        $.ajax({
            url: url,
            type: method,
            data: data,
            //beforeSend: function () {
            //    //$('#modal-loading').modal('show');
            //    $('#modal-loading').modal({
            //        backdrop: 'static',
            //        keyboard: false
            //    });
            //},
            error: function () {
                alert('error: ' + Error.msg);
            },
            success: function (result) {
                //console.log(result);


                if (result.success) {
                    // if result is success

                    //$.notify({
                    //    // options
                    //    message: 'Success delete Data'
                    //}, {
                    //    // settings
                    //    type: 'success'
                    //});

                    location.reload();

                    //show_alert(result.action + " Succeed!", "success", t);
                    ////show_alert("Perubahan Berhasil!", "success", t1);
                    //setTimeout(function () {
                    //    $(t).slideUp(); $(t1).slideUp();
                    //    //location.reload();
                    //}, 5000);
                } else {
                    var strerror = (typeof result.message == "undefined") ? result.action + ' Fail!' : result.message;
                    show_alert(strerror, "danger", t);
                    //show_alert("Perubahan Gagal!", "danger", t1);
                    setTimeout(function () { $(t).slideUp(); $(t1).slideUp(); }, 5000);
                }
            },
            complete: function () {
                //setTimeout(function () { $('#modal-loading').modal('hide'); }, 500);

            },
        });
    } catch (e) {
        show_alert("Action failed please check your data or internet access. If this error continue, please contact Administrator!", "danger", "#alertPlace");
        console.log(e);
    }
}


//Show Alert
function show_alert(text, style, target) {
    //var alert = "<div class='alert alert-" + style + " alert-dismissable text-center'>" +
    //            "    <a onclick='close_alert(\"" + target + "\")' aria-hidden='true' class='glyph-icon alert-close-btn icon-remove' style='cursor:pointer'></a><p>" + text + "</p>"
    //"</div>";

    var alert = "<div class='alert alert-" + style + " alert-dismissable'>" +
                 "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>" +
                 text + ".</div>"
    $(target).empty();
    $(target).append(alert);
    $(target).show();
}

//Show Modal
function showModal(obj, n) {
    ModalHref = obj.href;

    if (n == 1) {
        $("#myModal").modal('show');

        $("#myModalDialog").load(obj.href, function () {
        });
    } else {
        $("#myModal" + n).modal('show');

        $("#myModalDialog" + n).load(obj.href, function () {
        });
    }
}

function showTabContent(obj, target) {
    //if (n == 1) {
    //    $("#myModal").modal('show');

    //    $("#myModalDialog").load(obj.href, function () {
    //    });
    //} else {
    //    $("#myModal" + n).modal('show');

    //    $("#myModalDialog" + n).load(obj.href, function () {
    //    });
    //}

    $("#" + target).load("");

    $("#" + target).load(obj.href);
}

function showModalwithID(obj, n, obj2) {
    ModalHref = obj.href;
    var t2 = $("#" + obj2);
    //obj.href = obj.href;
    if (n == 1) {
        $("#myModal").modal('show');

        $("#myModalDialog").load(obj.href + "?id=" + t2.val(), function () {
        });
    } else {
        $("#myModal" + n).modal('show');

        $("#myModalDialog" + n).load(obj.href + "?id=" + t2.val(), function () {
        });
    }
}

function showModalwith2ID(obj, n, obj2, obj3) {
    ModalHref = obj.href;
    var t2 = $("#" + obj2);
    var t3 = $("#" + obj3);
    //obj.href = obj.href;
    if (n == 1) {
        $("#myModal").modal('show');

        $("#myModalDialog" + n).load(obj.href + "?id=" + t2.val() + "&id2=" + t3.val(), function () {
        });
    } else {
        $("#myModal" + n).modal('show');

        $("#myModalDialog" + n).load(obj.href + "?id=" + t2.val() + "&id2=" + t3.val(), function () {
        });
    }
}

function genDropDown(obj, target, text, urlContainer) {
    var sourceObj = $(obj);
    var id = {};
    id["id1"] = sourceObj.val();

    var url = $("#" + urlContainer).attr("href");

    generateDropDown(url, id, target, text);
}

function getSingleValue(funct, id, obj) {
    var dataJson = JSON.stringify(id);
    var urlGet = "/GlobalControlAccessor/GlobalAccess/" + funct;
    $.getJSON(urlGet, { dataJSON: dataJson }, function (result) {
        //$.getJSON(url, { locId: locID,compId:compID }, function (result) {

        if (typeof result.Value !== "undefined") {
            var target = $("#" + obj + "Hid");
            if (typeof target !== "undefined") {
                target.val(result.Value);
            }

            var targetDisp = $("#" + obj);
            targetDisp.val(result.ValueDisp);
        }

        //}
    });
}

function generateDropDown(urlGet, id, obj, optDef) {

    var dataJson = JSON.stringify(id);

    if (id != null) {
        $.getJSON(urlGet, { dataJSON: dataJson }, function (result) {
            //$.getJSON(url, { locId: locID,compId:compID }, function (result) {
            var ddl = $('#' + obj);
            ddl.empty();

            $(document.createElement('option'))
                    .attr('value', "")
                    .text("-- Select " + optDef + " --")
                    .appendTo(ddl);

            //if (result.IsRedirect != "undefined") {
            //    if (result.IsRedirect) {
            //        location.href = result.URL;
            //    }
            //} else {
            $(result).each(function () {
                $(document.createElement('option'))
                    .attr('value', this.ID == undefined ? this.id : this.ID)
                    .text(this.Text == undefined ? this.text : this.Text)
                    .appendTo(ddl);
            });
            //}
        });
    }
    else {
        $.getJSON(urlGet, function (result) {
            //$.getJSON(url, { locId: locID,compId:compID }, function (result) {
            var ddl = $('#' + obj);
            ddl.empty();

            $(document.createElement('option'))
                    .attr('value', "")
                    .text("-- Select " + optDef + " --")
                    .appendTo(ddl);
            //if (result.IsRedirect != "undefined") {
            //    if (result.IsRedirect) {
            //        location.href = result.URL;
            //    }
            //} else {
            $(result).each(function () {
                $(document.createElement('option'))
                    .attr('value', this.ID == undefined ? this.id : this.ID)
                    .text(this.Text == undefined ? this.text : this.Text)
                    .appendTo(ddl);
            });
            //}
        });
    }
}

function generateDropDown2(urlGet, id, obj, optDef, sourceDef) {

    var dataJson = JSON.stringify(id);

    if (id != null) {
        $.getJSON(urlGet, { dataJSON: dataJson }, function (result) {
            //$.getJSON(url, { locId: locID,compId:compID }, function (result) {
            var ddl = $('#' + obj);
            ddl.empty();
            if (typeof result.length !== "undefined" && result.length != 0) {
                $(document.createElement('option'))
                        .attr('value', "")
                        .text("-- Select " + optDef + " --")
                        .appendTo(ddl);
            } else {
                $(document.createElement('option'))
                       .attr('value', "")
                       .text("-- Please Select " + sourceDef + " First --")
                       .appendTo(ddl);
            }
            //if (result.IsRedirect != "undefined") {
            //    if (result.IsRedirect) {
            //        location.href = result.URL;
            //    }
            //} else {
            $(result).each(function () {
                $(document.createElement('option'))
                    .attr('value', this.ID)
                    .text(this.Text)
                    .appendTo(ddl);
            });
            //}
        });
    }
    else {
        $.getJSON(urlGet, function (result) {
            //$.getJSON(url, { locId: locID,compId:compID }, function (result) {
            var ddl = $('#' + obj);
            ddl.empty();

            $(document.createElement('option'))
                    .attr('value', "")
                    .text("-- Select " + optDef + " --")
                    .appendTo(ddl);
            //if (result.IsRedirect != "undefined") {
            //    if (result.IsRedirect) {
            //        location.href = result.URL;
            //    }
            //} else {
            $(result).each(function () {
                $(document.createElement('option'))
                    .attr('value', this.ID == undefined ? this.id : this.ID)
                    .text(this.Text == undefined ? this.text : this.Text)
                    .appendTo(ddl);
            });
            waitingDialog.hide();
            //}
        });
    }
}

function disableEnterKey(key) {
    $("#" + key).bind("keypress", function (e) {
        if (e.keyCode == 13) {
            return false;
        }
    });
}

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

function JSONDate(dateStr) {
    var m, day;
    jsonDate = dateStr;
    var d = new Date(parseInt(jsonDate.substr(6)));
    m = d.getMonth() + 1;
    if (m < 10)
        m = '0' + m
    if (d.getDate() < 10)
        day = '0' + d.getDate()
    else
        day = d.getDate();
    return (m + '/' + day + '/' + d.getFullYear())
}

function JSONDateWithTime(dateStr) {
    jsonDate = dateStr;
    if (jsonDate != null) {
        var d = new Date(parseInt(jsonDate.substr(6)));
        var m, day;
        m = d.getMonth() + 1;
        if (m < 10)
            m = '0' + m
        if (d.getDate() < 10)
            day = '0' + d.getDate()
        else
            day = d.getDate();
        var formattedDate = day + "/" + m + "/" + d.getFullYear();
        var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
        var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
        var formattedTime = hours + ":" + minutes + ":" + d.getSeconds();
        formattedDate = formattedDate + " " + formattedTime;
        return formattedDate;
    }
    return jsonDate;
}

var createObject = function (model, name, value) {
    var nameParts = name.split("."),
    currentObject = model;
    for (var i in nameParts) {
        var part = nameParts[i];
        if (i == nameParts.length - 1) {
            currentObject[part] = value;
            break;
        }
        if (typeof currentObject[part] == "undefined") {
            currentObject[part] = {};
        }
        currentObject = currentObject[part];
    }
};

function addZero(value) {
    var Newvalue = value + "";
    if (Newvalue.length != 2) {
        var Newvalue = "0" + value;
    }
    return Newvalue;
}


function renderExcel(id, title) {


    var dd = new Date();
    var ddMMyyyy = dd.getDate() + ' ' + (dd.getMonth() + 1) + ' ' + dd.getFullYear();

    $("#" + id).table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: title + " - " + ddMMyyyy + ".xls",
        //filename: "ViewBag.Title" + new Date().toISOString().replace(/[\-\:\.]/g, "")
        fileext: ".xlsx"
    });
}

function BasicAlertSet(status, action) {
    if (status == "1") {
        $.notify({
            // options
            message: 'Successfully ' + action //'Success Posting Data'
        }, {
            // settings
            type: 'success'
        });
    } else if (status == '0') {
        $.notify({
            // options
            message: ' Failed to ' + action //'Failed Posting Data'
        }, {
            // settings
            type: 'danger'
        });
    }
}

function filterStatus() {
    var ColumnStatus;
    for (var fs = 0 ; fs < TI.length; fs++) {
        if (TI[fs].Name == "IsActive") {
            ColumnStatus = fs;
        }
    }
    $('.dataTable').DataTable().column(ColumnStatus).search(
        $('#isActiveEnum').val(), true, true
    ).draw();
}

function callBasicAlert(mTitle, mText, mType, mReload) {
    swal(
            {
                title: mTitle,
                text: mText,
                type: mType,
                //showCancelButton: true,
                //confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                //cancelButtonText: "Cancel",
                closeOnConfirm: false,
                //closeOnCancel: false
            },
            function (isConfirm) {
                if (mReload) {
                    window.location.href = CurrUrl.includes("Post") === true ? CurrUrl.replace("Post", "") : CurrUrl;
                }
            }
         );
}