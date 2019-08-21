	var musicPlayer,
	time_update_interval = 0;

	var ytapi = document.createElement('script');
	ytapi.src = "https://www.youtube.com/iframe_api";
	var ytapiScript = document.getElementsByTagName('script')[0];
	ytapiScript.parentNode.insertBefore(ytapi, ytapiScript);

    function onYouTubeIframeAPIReady($vidId) {
        musicPlayer = new YT.Player('video', {
            width: 390,
            height: 640,
            events: {
                onReady: startPlayer,
                onError: showError
            }
        });
    }

    function showError()
    {
    	$('#playerError').show();
        $('#musicControls').hide();
    }

    function startPlayer()
    {
        $('#playerError').hide();
    	$('#musicControls').show();
        updateTimerDisplay();
        updateProgressBar();
        musicPlayer.setVolume(100);
        clearInterval(time_update_interval);

        time_update_interval = setInterval(function () {
            updateTimerDisplay();
            updateProgressBar();

        }, 1000);

        $('#volume-input').val(Math.round(musicPlayer.getVolume()));
    }

    function updateTimerDisplay()
    {
        $('#current-time').text(formatTime( musicPlayer.getCurrentTime() ));
        $('#duration').text(formatTime( musicPlayer.getDuration() ));
    }

    function updateProgressBar()
    {
        $('#progress-bar').val((musicPlayer.getCurrentTime() / musicPlayer.getDuration()) * 100);
    }

    function formatTime(time)
    {
        time = Math.round(time);

        var minutes = Math.floor(time / 60),
            seconds = time - minutes * 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        return minutes + ":" + seconds;
    }

    $(document).on("click", ".playMusic", function(e)
    {
        var getVideoID = $(this).closest('[data-video-id]');
        var videoID = getVideoID.attr('data-video-id'),
        videoTitle = getVideoID.attr('data-video-title');
                    musicPlayer.cueVideoById(videoID);
                    $("#audio-player").fadeIn("slow");
                    musicPlayer.playVideo();
                    $("#play").hide();
                    $("#pause").show();
                    $("#playerError").hide();
                    $("#musicControls").show();
                    $("#videoTitle").html(videoTitle);
    });

    $(document).ready(function(){

       $('#playerError').hide(), $('#pause').hide(), $('#audio-player').hide(), $('#musicControls').hide();

       $('#progress-bar').on('mouseup touchend', function (e)
        {
            var newTime = musicPlayer.getDuration() * (e.target.value / 100);
            musicPlayer.seekTo(newTime);
        });

        $('#startplayer').on('click', function()
        {
            $('#audio-player').fadeIn('slow');
            musicPlayer.playVideo();
            $('#play').hide();
            $('#pause').show();
        });

        $('#play').on('click', function()
        {
            musicPlayer.playVideo();
            $('#play').hide();
            $('#pause').show();
        });


        $('#pause').on('click', function()
        {
            musicPlayer.pauseVideo();
            $('#pause').hide();
            $('#play').show();
        });

        $('#mute-toggle').on('click', function()
        {
            var mute_toggle = $(this);

            if(musicPlayer.isMuted())
            {
                musicPlayer.unMute();
                mute_toggle.text('volume_up');
            }
            else
            {
                musicPlayer.mute();
                mute_toggle.text('volume_off');
            }
        });

        $('#volume-input').on('change', function()
        {
            musicPlayer.setVolume($(this).val());
        });

        $(".close").click(function()
    	{
    		$('#audio-player').fadeOut('slow');
    		musicPlayer.pauseVideo();
    	});
    });