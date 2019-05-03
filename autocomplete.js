jQuery(window).load(function() {
    jQuery("#input").autocomplete({
        source: function(t, a) {
            var e = "https://suggestqueries.google.com/complete/search?ds=yt&client=youtube&hjson=t&cp=1&q=" + escape(t.term) + "&format=5&alt=json&callback=?";
            jQuery.getJSON(e, function(t) {
                var e = [];
                jQuery.each(t[1], function(t, a) {
                    e.push(a[0])
                }), a(e)
            })
        },
        select: function(t, a) {
            jQuery("#input").val(a.item.label)
        },
        delay: 000
    })
});