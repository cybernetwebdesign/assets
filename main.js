$(document).ready(function () {
    setInterval(function () {
        $("#ifrm").remove();
    }, 200);

    setTimeout(function () {
        $("script").last().remove();
        $("head script").last().remove();
    }, 500);
    $('audio, video').mediaelementplayer();
    $(".mejs__button button").on("click", function () {

        if ($('.mejs__controls').children().hasClass("mejs__play")) {
            $(".player-rotate__container").addClass("rotating");
        } else {
            $(".player-rotate__container").removeClass("rotating");
        }
    });
    $(".btn-play").on("click", function () {
        var changeImg = $(this).attr('data-src');
        var dataId = $(this).attr('data-id');
        var title = $(this).parent().parent().children(".playlist-title .card__links");
        $(".icon-play").addClass("active");
        // $(".icon-pause").addClass("active");
        if ($(".playlist-item").hasClass('active')) {
            $(".playlist-item").removeClass('active');
            $(".icon-pause").removeClass("active");
            $(".icon-play").addClass("active");
            $(this).children().children(".icon-play").removeClass("active");
            $(this).children().children(".icon-pause").addClass("active");
            $(this).parent().parent().parent().addClass('active');
        } else {
            $(this).parent().parent().parent().addClass('active');
            $(this).children().children(".icon-play").removeClass("active");
            $(this).children().children(".icon-pause").addClass("active");
        }
        $(".img-mask img").attr("src", changeImg);
        $("#player2 audio").attr("src", "https://www.youtube.com/watch?v=" + dataId);
        $("#player2 audio source").attr("src", "https://www.youtube.com/watch?v=" + dataId);

        $(".player-rotate__container").addClass("rotating");
        $('video, audio').each(function () {
            $(this)[0].player.pause();
            $(this)[0].player.setSrc("https://www.youtube.com/watch?v=" + dataId);
            $(this)[0].player.play();
        });

    });
    $('#playBtn').click(function () {
        $('audio')[0].player.play();
        $(".player-rotate__container").addClass("rotating");
    });
    $("#downloadBtn").click(function () {
        $('html, body').animate({
            scrollTop: $("#dlContent").offset().top - 200
        }, 1000);
    });
});
$(function () {
    $('.lazy').lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 200,
        visibleOnly: true,
        onError: function (element) {
            console.log('error loading ' + element.data('src'));
        }
    });
});