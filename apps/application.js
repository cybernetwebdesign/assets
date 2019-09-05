$(document).ready(function(){
	// Current Menu
  var path = location.pathname.substring(1);
  if (path) {
  	$('ul.channels li a').removeClass("current");
  	$('ul.channels li a[href$="' + path + '"]').attr('class', 'current');		
  }
  $(".video-description").click(function(e){
  	e.preventDefault();
  	$(this).css({"max-height": 900});
  });
  if($(window).width() < 766){
  	$(".sidebar").hide();
  	$(".navbar-toggle").click(function(e){
			e.preventDefault();
			$(".sidebar").slideToggle();
  	});
  }
  $(document).on('click',"a.ushare",function(e){
    e.preventDefault();
    window.open($(this).attr("href"), '', 'left=50%, top=100, width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1')    
  });   
});