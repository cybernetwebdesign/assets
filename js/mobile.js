function footerModal() {
    $("#showLastSearch").on("click", function (){
        $("#lastSearchContent.footer-modal").addClass("show");
        $(".overlay").show();

    });
    $("#showLast").on("click", function (){
        $("#lastSearchContent.footer-modal").addClass("show");
        $(".overlay").show();
    });
    $("#showDownload").on("click", function (){
        $("#dlContent.footer-modal").addClass("show");
        $(".overlay").show();
    });
    $("#showRelated").on("click", function (){
        $("#relatedContent.footer-modal").addClass("show");
        $(".overlay").show();

    });
    $("#showGenre").on("click", function (){
        $("#genreContent.footer-modal").addClass("show");
        $(".overlay").show();
    });

    $("#showCountry").on("click", function (){
        $("#countryContent.footer-modal").addClass("show");
        $(".overlay").show();

    });
    $(".overlay").on("click", function (){
        $(this).hide();
        $(".modal").removeClass("show");

    });
}

$(document).ready(function () {
    footerModal();
    $("#topSearch").on("click", function () {
        $("#topsearch-content").toggleClass("active");
        $("#navMenu").removeClass("active");
    });
    $("#closeSearch").on("click", function () {
        $("#topsearch-content").removeClass("active");
    });
    $("#showMenu").on("click", function () {
        $("#topsearch-content").removeClass("active");
        $("#navMenu").toggleClass("active");
    });
    $("#detailMenu").on("click", function () {
        $("#topsearch-content").removeClass("active");
        $("#navMenu").toggleClass("active");
    });



});