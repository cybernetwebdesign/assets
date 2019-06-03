function clearhistory(){localStorage.setItem('videos',"");}
function clearrecomend(){localStorage.setItem('recomend',"");}
function clearwatchlist(){localStorage.setItem('watchlist',"");}
function appendToHistory(data){var old=localStorage.getItem('videos');if(old===null)old="";if(old.length>359){old=old.slice(0,360);var n=old.lastIndexOf(",");old=old.slice(0,n);console.log(old);}
if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('videos',data+','+old);}else{localStorage.setItem('videos',data+','+old);}}
function remove4history(data){var old=localStorage.getItem('videos');if(old===null)old="";if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('videos',old);document.getElementById("video-"+data).remove();}}
function remove4recomend(data){var old=localStorage.getItem('recomend');if(old===null)old="";if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('recomend',old);document.getElementById("video-"+data).remove();}}
function remove4watchlist(data){var old=localStorage.getItem('watchlist');if(old===null)old="";if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('watchlist',old);document.getElementById("video-"+data).remove();}}
function remove4playlist(data){var old=localStorage.getItem('myplaylist');if(old===null)old="";if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('myplaylist',old);document.getElementById("video-"+data).remove();}}
function appendToRecommend(data){var old=localStorage.getItem('recomend');if(old===null)old="";if(old.length>359){old=old.slice(0,360);var n=old.lastIndexOf(",");old=old.slice(0,n);console.log(old);}
if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('recomend',data+','+old);}else{localStorage.setItem('recomend',data+','+old);}}
function appendTowatch(data){var old=localStorage.getItem('watchlist');if(old===null)old="";if(old.length>359){old=old.slice(0,360);var n=old.lastIndexOf(",");old=old.slice(0,n);console.log(old);}
if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('watchlist',data+','+old);}else{localStorage.setItem('watchlist',data+','+old);}}
function appendTomyplaylist(data){var old=localStorage.getItem('myplaylist');if(old===null)old="";if(old.length>359){old=old.slice(0,360);var n=old.lastIndexOf(",");old=old.slice(0,n);console.log(old);}
if(old.indexOf(data)>-1){old=old.replace(data+',',"")
localStorage.setItem('myplaylist',data+','+old);}else{localStorage.setItem('myplaylist',data+','+old);}}
function loadDurations(){$.post("/duration/",{vid:videos},function(e){if(e.status=='error'){$("li.video .duration").each(function(){$(this).remove();});}else if(e.status=='ok'){var data=e.data;$.each(data,function(vid,time){$("#video-"+vid).find('.duration').html(time);});}},'json');}
function validateForm(){var x=document.forms["search-form"]["search-text"].value;if(x.length==11){return true}
var re=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;vidid=x.replace(re,'$1');if(vidid.length==11){window.location="https://www.mojokerto.net/watch?v="+vidid;return false;}else{return true;}}
function validateForm2(){var x=document.forms["search-form-2"]["search-text-2"].value;if(x.length==11){return true}
var re=/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;vidid=x.replace(re,'$1');if(vidid.length==11){window.location="https://www.mojokerto.net/watch?v="+vidid;return false;}else{return true;}}
$(document).ready(function(){$("#search-text").autocomplete({source:function(request,response){var apiKey='AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';var query=request.term;$.ajax({url:"https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",dataType:'jsonp',success:function(data,textStatus,request){response($.map(data[1],function(item){return{label:item[0],value:item[0]}}));}});},select:function(event,ui){$("#search-text").val(ui.item.value);$("#search-form").submit();}});$("#search-text-2").autocomplete({source:function(request,response){var apiKey='AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';var query=request.term;$.ajax({url:"https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",dataType:'jsonp',success:function(data,textStatus,request){response($.map(data[1],function(item){return{label:item[0],value:item[0]}}));}});},select:function(event,ui){$("#search-text-2").val(ui.item.value);$("#search-form-2").submit();}});var path=location.pathname.substring(1);if(path){$('ul.channels li a').removeClass("current");$('ul.channels li a[href$="'+path+'"]').attr('class','current');}
$(".video-descriptionbtn").click(function(e){$(".video-description").css({"max-height":900});});$(".video-commentbtn").click(function(e){$(".video-comment").css({"max-height":5000});});$("#search-button").click(function(){var query=$("#search-text").val();if(query.indexOf("watch?v=")>-1){var res=query.split("watch?v=");window.location="https://www.mojokerto.net/watch?v="+res[1];}else{$("#search-form").submit();}});$("#search-button-2").click(function(){var query=$("#search-text-2").val();if(query.indexOf("watch?v=")>-1){var res=query.split("watch?v=");window.location="https://www.mojokerto.net/watch?v="+res[1];}else{$("#search-form-2").submit();}});$("#q").googleSuggest();if(videos.length!=0){loadDurations();}});