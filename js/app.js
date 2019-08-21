$(document).ready(function(){
	if (!useCaptcha) $("#videoURL").parent().parent().submit(getURL);
	$("#show-info").tooltip();
	$('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});
	$("#videoURL").autocomplete({
		source: function(request, response){
			$.getJSON("//suggestqueries.google.com/complete/search?callback=?",
			{
				"hl" : "en", // Language
				"ds" : "yt", // Restrict lookup to youtube
				"jsonp" : "suggestCallBack", // jsonp callback function name
				"q" : request.term, // query term
				"client" : "youtube" // force youtube style response, i.e. jsonp
			});
			suggestCallBack = function(data){
				var suggestions = [];
				$.each(data[1], function(key, val){
					suggestions.push({"value" : val[0]});
				});
				suggestions.length = 10; // prune suggestions list to only X items
				response(suggestions);
			};
		},
		select: function(event, ui) {
			$("#videoURL").val(ui.item.value);
			(!useCaptcha) ? $("#videoURL").parent().parent().submit() : grecaptcha.execute();
		}
	});
	setTimeout(function(){
		$('.animated-text').addClass('animated bounceInDown').removeClass('hidden');
	}, 1000);
	setTimeout(function(){
		$('.animated-form').show().addClass('animated bounceInLeft').removeClass('hidden');
		if (useCaptcha && $('.animated-form').length)
		{
			setTimeout(function(){
				$('.grecaptcha-badge').appendTo("body");
				$('.grecaptcha-badge').each(function(){
					this.style.setProperty('visibility', 'visible', 'important');
				});
			}, 1000);
		}
	}, 1500);
});
$(window).load(function(){
	$("#download").load(ajaxUrlBase + "@result", templateVarsQueryStr);
});
$(document)
	.on("click", ".list-group-item", function(e){
        var getcCode = $(this).closest("[data-country-code]");
		var cCode = getcCode.attr("data-country-code"),
		continent = getcCode.attr("data-continent");
		$("#yt-results").load("@result", templateVarsQueryStr + "cCont=" + continent + "&cCode=" + cCode);
    })
    .on("click", "#loadMore", function(e){
    	var getMoreId = $(this).closest("[data-more-id]");
    	var moreId = getMoreId.attr("data-more-id"),
    	moreConti = getMoreId.attr("data-more-ccont"),
    	cCode = getMoreId.attr("data-more-ccode"),
    	squery = getMoreId.attr("data-more-query");
    	$("#ajaxloader").show();
    	$("#yt-results").load(ajaxUrlBase + "@result", templateVarsQueryStr + "cCont=" + moreConti + "&cCode=" + cCode + "&moreVideos=" + moreId + "&q=" + encodeURI(squery), function() {
	  		$("#ajaxloader").hide();
		});
    })
    .on("click", ".download-mp3, .download-mp4, .videos, .audio-streams, .video-streams, .merged-streams", function(e){
    	var getVidId = $(this).closest("[data-vid-id]");
    	var DataVidId = getVidId.attr("data-vid-id");
    	var loadUrlSuffix = "&format=mp3";
    	$(".dl-line-dashed[data-vid-id=" + DataVidId + "]").show();
    	$(".stream-buttons[data-vid-id=" + DataVidId + "]").hide();
    	$(".dl-line-dashed-streams[data-vid-id=" + DataVidId + "]").hide();
		if ($(this).hasClass('download-mp4') || $(this).hasClass('videos') || $(this).hasClass('audio-streams') || $(this).hasClass('video-streams') || $(this).hasClass('merged-streams'))
    	{
    		$(".stream-buttons[data-vid-id=" + DataVidId + "]").show();
    		$(".dl-line-dashed-streams[data-vid-id=" + DataVidId + "]").show();
    	}
    	if ($(this).hasClass('download-mp4'))
    	{
			var streamName = $(".stream-buttons div:first-child").attr('class').replace(/-/g, "");
			var formatName = (streamName == "mergedstreams") ? "video" : "mp4";
			var loadUrlSuffix = "&format=" + formatName + "&streams=" + streamName;
		}
    	if ($(this).hasClass('videos'))
    	{
    		var loadUrlSuffix = "&format=mp4&streams=videos";
		}
    	if ($(this).hasClass('audio-streams'))
    	{
    		var loadUrlSuffix = "&format=mp4&streams=audiostreams";
		}
    	if ($(this).hasClass('video-streams'))
    	{
    		var loadUrlSuffix = "&format=mp4&streams=videostreams";
		}
		if ($(this).hasClass('merged-streams'))
    	{
    		var loadUrlSuffix = "&format=video&streams=mergedstreams";
		}
    	$(".download-result[data-vid-id=" + DataVidId + "]").html($(".download-loading[data-vid-id=" + DataVidId + "]").html()).show();
		$(".download-result[data-vid-id=" + DataVidId + "]").load(ajaxUrlBase + "@grab?vidID=" + DataVidId + loadUrlSuffix + "&appSecretToken=" + templateVars['appSecretToken'], function(){
    		$(this).find(".videoHighspeed").change(function(){
				var isChecked = this.checked;
				$(this).parent().parent().find(".videodownload").each(function(){
					var dlmode = (isChecked) ? $(this).attr("data-direct-url") : $(this).attr("data-dload-url");
					$(this).find('a').attr('href', dlmode);
				});
				var checkText = $(this).parent().find(".checkbox-text");
				(isChecked) ? checkText.addClass('checked') : checkText.removeClass('checked');
			});
    	});
    })
    .on("keypress", "#stime, #etime", function(e) {
		document.charIsOk = false;
		var allowedChars = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
		var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		//console.log("typed: " + charCode);
		if (charCode && ($.inArray(charCode, allowedChars) != -1 || String.fromCharCode(charCode) == ":"))
		{
			//console.log("accepted: " + charCode);
			document.charIsOk = true;
		}
		else
		{
			return false;
		}
	})
	.on("keyup", "#stime, #etime", function(e) {
		var validFormat = /^(\d{2}:[0-5]\d:[0-5]\d)$/.test($(this).val());
		var condition = (e.keyCode == 8) ? validFormat : document.charIsOk && validFormat;
		if (condition)
		{
			$(this).tooltip('hide');
			$('.' + $(this).attr("id")).val($(this).val());
		}
		if (!validFormat)
		{
			$(this).tooltip('show');
		}
	})
	.on("click", ".download-mp3-url", function(e) {
		e.preventDefault();
		var ajaxBase = ajaxUrlBase;
		var urlParts = $(this).attr('href').split(ajaxBase);
		if (urlParts[0] == $(this).attr('href'))
		{
			ajaxBase = ajaxUrlBase.replace(/([^\/]+\/)$/, "");
			urlParts = $(this).attr('href').split(ajaxBase);
		}
		var urlParts = urlParts[1].split('/');
		//console.log(urlParts);
		urlParts.splice(4, 0, $($(this).parent().find("#stime")[0]).val(), $($(this).parent().find("#etime")[0]).val());
		window.open(ajaxBase + urlParts.join('/'));
	});

function getURL()
{
	var videoURL = $('#videoURL').val();
	var dataString = templateVarsQueryStr + 'q=' + encodeURIComponent(videoURL);
	$.ajax({
		type: "GET",
		url: ajaxUrlBase + "@result",
		data: dataString,
		success: function(html){
			//console.log('success');
			window.history.pushState("string", "", ajaxUrlBase + videoURL);
			$('#download').html(html);
		},
		error: function()
		{
			//console.log('error');
		}
	});
	return false;
}

function onSearchSubmit(captchaToken)
{
	//console.log(captchaToken);
	$.ajax({
		type : "POST",
		url : ajaxUrlBase + "@captcha",
		data : "response=" + captchaToken,
		success : function(retVal, status, xhr){
			//console.log(retVal);
			if (retVal.success)
			{
				getURL();
				grecaptcha.reset();
				$('.grecaptcha-badge').appendTo("body");
				$('.grecaptcha-badge').each(function(){
					this.style.setProperty('visibility', 'visible', 'important');
				});
			}
		},
		error : function(xhr, status, ex)
		{
			//console.log('error');
		}
	});
	return false;
}