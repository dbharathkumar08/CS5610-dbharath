$(document).ready(function () {
    $("#fadein").click(function () {
        $("#color1").fadeIn();
        $("#color2").fadeIn("slow");
        $("#color3").fadeIn(3000);
    });
    $("#fadeout").click(function () {
        $("#color4").fadeOut();
        $("#color5").fadeOut("slow");
        $("#color6").fadeOut(3000);
    });
});

