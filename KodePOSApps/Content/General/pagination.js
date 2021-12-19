var iPageChanges = "iPageChanges";
var CurrentPage = 1;
var AA01 = "";
$(document).ready(function () {
    $(document).on("click", "." + iPageChanges, function () {
        var indexP = this.innerHTML;
        indexP = indexP == "First" ? 1 : indexP == "Last" ? -1 : indexP;

        switch (indexP) {
            case "First":
                indexP = 1;
                break;
            case "Last":
                indexP = -1;
            case "Prev":
                indexP = (CurrentPage - 1);
            case "Next":
                indexP = (CurrentPage + 1);
        }

        var PageC = $("#PageControl");
        PageC.val(indexP);

        var url = "/GlobalAccess/GetPage?AA01=" + AA01 + "&p=" + indexP;

        $.getJSON(url, function (result) {
            alert("here");
            if (typeof result !== "undefined") {
                if (result > 0) {
                }
            }
        });
    });

    if ($('.custom_paginate').length > 0) {
        var url = "/GlobalAccess/GetTotalPage?AA01=" + AA01;
        var CurrPage = CurrentPage;
        $.getJSON(url, function (result) {
            if (typeof result !== "undefined") {
                if (result > 0) {

                    var liFirst = '<li class="paginate_button first" aria-controls="dataTablesMain" tabindex="0" id="dataTablesMain_first"><a href="javascript:;" class="iPageChanges">First</a></li>';
                    var liPrev = '<li class="paginate_button prev" aria-controls="dataTablesMain" tabindex="0" id="dataTablesMain_prev"><a href="javascript:;" class="iPageChanges">Prev</a></li>';
                    var liLast = '<li class="paginate_button last" aria-controls="dataTablesMain" tabindex="0" id="dataTablesMain_last"><a href="javascript:;" class="iPageChanges">Last</a></li>';
                    var liNext = '<li class="paginate_button next" aria-controls="dataTablesMain" tabindex="0" id="dataTablesMain_next"><a href="javascript:;" class="iPageChanges">Next</a></li>';
                    var liDot = '<li class="paginate_button dotdotdot" aria-controls="dataTablesMain" tabindex="0" id="dataTablesMain_dotdotdot"><a href="javascript:;" class="iPageChanges">...</a></li>';
                    var liLeft = "";
                    var liRight = "";
                    var liN = '<li class="paginate_button active" aria-controls="dataTablesMain" tabindex="' + CurrPage + '"><a href="javascript:;" class="iPageChanges">' + CurrPage + '</a></li>';

                    var limitLeft = (CurrPage - 3 > 0 ? CurrPage - 3 : 1);
                    if (CurrPage - limitLeft > 2) {
                        liLeft += liDot;
                    }
                    for (var left = CurrPage - 1; left > limitLeft; left--) {
                        liLeft += '<li class="paginate_button" aria-controls="dataTablesMain" tabindex="' + (left) + '"><a href="javascript:;" class="iPageChanges">' + left + '</a></li>';
                    }

                    var limitRight = (CurrPage + 3 <= result ? CurrPage + 3 : result);

                    for (var right = CurrPage + 1; right < limitRight; right++) {
                        liRight += '<li class="paginate_button" aria-controls="dataTablesMain" tabindex="' + (right) + '"><a href="javascript:;" class="iPageChanges">' + right + '</a></li>';
                    }

                    if (limitRight - CurrPage > 2) {
                        liRight += liDot;
                    }

                    var ul = '<ul class="pagination">' + liFirst + liPrev + liLeft + liN + liRight + liNext + liLast + '</ul>';
                    $('.custom_paginate').append(ul);
                }
            }
        });
    }
});