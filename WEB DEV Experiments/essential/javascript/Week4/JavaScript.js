$(document).ready(function () {
    $("#toggle").click(function () {
        $("#two").toggle();
    });
    $("#hide").click(function () {
        $("#one").hide();
    });
    $("#show").click(function () {
        $("#one").show();
    });
});