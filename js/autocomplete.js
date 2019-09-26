        <script>
    		$("#youtube").autocomplete({
    			source: function(request, response){
    				var query = request.term;
    				$.ajax({
    					url: "https://youtube.download-lagu-mp3.com/autocomplete.php?q="+query,  
    					dataType: 'jsonp',
    					success: function(data, textStatus, request) { 
    					   response( $.map( data[1], function(item) {
    							return {
    								label: item[0],
    								value: item[0]
    							}
    						}));
    					}
    				});
    			},
              select: function(event, ui) {
                    window.location.href = 'https://youtube.download-lagu-mp3.com/search/' + encodeURI(ui.item.value).replace(/%20/g, '-')
                }
    		});
        </script>
