
//KodePOS
$(function () {
    $(".ancNewMasterDataInputKodePOS").click(function () {
        debugger;
        var options = { "backdrop": "static", keyboard: true };
        $.ajax({
            type: "GET",
            url: '/Home/InputKodePOS',
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (data) {
                debugger;
                $('#myModalDialog').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');

            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });
    });
    $("#closbtn").click(function () {
        $('#myModal').modal('hide');
    });
});

$(function () {
    $(".ancEditMasterDataInputKodePOS").click(function () {
        debugger;
        var $buttonClicked = $(this);
        var id = $buttonClicked.attr('data-id');
        var options = { "backdrop": "static", keyboard: true };
        $.ajax({
            type: "GET",
            url: '/Home/InputKodePOS',
            contentType: "application/json; charset=utf-8",
            data: { "Id": id },
            datatype: "json",
            success: function (data) {
                debugger;
                $('#myModalDialog').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');

            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });
    });
    $("#closbtn").click(function () {
        $('#myModal').modal('hide');
    });
});

$(function () {
    $(".ancDeleteMasterDataInputKodePOS").click(function () {
        debugger;
        var $buttonClicked = $(this);
        var id = $buttonClicked.attr('data-id');
        var options = { "backdrop": "static", keyboard: true };
        $.ajax({
            type: "GET",
            url: '/Home/DeleteKodePOS',
            contentType: "application/json; charset=utf-8",
            data: { "Id": id },
            datatype: "json",
            success: function (data) {
                debugger;
                $('#myModalDialog').html(data);
                $('#myModal').modal(options);
                $('#myModal').modal('show');

            },
            error: function () {
                alert("Dynamic content load failed.");
            }
        });
    });
    $("#closbtn").click(function () {
        $('#myModal').modal('hide');
    });
});