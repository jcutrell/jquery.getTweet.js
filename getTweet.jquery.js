(function($){

	$.fn.getTweet = function(username, numberOfTweets, options){
		$.fn.getTweet.defaults = {
				"username" : "jcutrell",
				"numberOfTweets" : "1"
		}
		if ($.isPlainObject(username) && username != null){ options = $.extend({}, username) }
		else if ($.isPlainObject(numberOfTweets && numberOfTweets != null )){ options = $.extend({}, numberOfTweets); options.username = username;}
		else { options = {}; options.username = username; options.numberOfTweets = numberOfTweets };
		var opts = $.extend({}, $.fn.getTweet.defaults, options);
		return this.each(function(){
			var that = $(this);
			var jsonurl = "http://api.twitter.com/1/statuses/user_timeline/"+ opts.username +".json?count=" + opts.numberOfTweets + "&callback=?";
			$.getJSON(jsonurl, function(data){
				var html = '';
				if (opts.numberOfTweets > 1){
					html = "<ul id='getTweet'>";
					$.each(data, function(index, item){
						html += "<li class='tweet'>" + item.text + "</li>";
					});
					html += "</ul>";
				} else if (opts.numberOfTweets = 1) {
					html = data[0].text;
				}
				that.html(html);
			});
		});
	}
	
	
	
//this method is more for development stuff, but fairly easy to use otherwise.
	$.getTweet = function(username, numberOfTweets, callback, options){
		$.getTweet.defaults = {
				"username" : "jcutrell",
				"numberOfTweets" : "4",
				"callback" : ''
		}
		var options = $.extend({}, $.getTweet.defaults);
		if (!($.isFunction(username)) && $.isPlainObject(username) && username != null)
			{ options = $.extend({}, username) }
		else if($.isFunction(username))
			{options.callback = username}
			if($.isArray(username)){
				options.numberOfTweets = username;}
		if (!($.isFunction(numberOfTweets)) && $.isPlainObject(numberOfTweets) && numberOfTweets != null )
			{ options = $.extend({}, numberOfTweets); options.username = username;}
		else if($.isFunction(numberOfTweets))
			{options.callback = numberOfTweets; options.username = username}
		else if (!($.isFunction(callback)) && $.isPlainObject(callback) && callback != null )
			{ options = $.extend({}, callback); options.numberOfTweets = numberOfTweets; options.username = username;}
		else {
			var options = {}
			options.username = username;
			options.numberOfTweets = numberOfTweets;
			options.callback = callback;
			options.totalTweets = numberOfTweets;
		}
		if($.isArray(numberOfTweets)){
				options.totalTweets = Math.max(options.numberOfTweets[0], options.numberOfTweets[1]) + 1;
			} else {
				options.totalTweets = numberOfTweets;
			}
		var opts = $.extend({}, $.getTweet.defaults, options);
		var jsonurl = "http://api.twitter.com/1/statuses/user_timeline/"+ opts.username +".json?count=" + opts.totalTweets + "&callback=?";
		$.getJSON(jsonurl, function(data){
			returnval = [];
				if (opts.numberOfTweets > 1 && !($.isArray(opts.numberOfTweets))){
					$.each(data, function(index, item){
						returnval[index] = item.text;
					});
				} else if (opts.numberOfTweets == 1 && !($.isArray(opts.numberOfTweets))) {
					returnval[0] = data[0].text;
				} else {
					var start = opts.numberOfTweets[0],
						end = opts.numberOfTweets[1];
						if (start > end){
							end = opts.numberOfTweets[0];
							start = opts.numberOfTweets[1];
							var reverse = true;
						}
						var i = start;
						for (var i = start; i <= end; i++){
								returnval[(i-start)] = data[i].text;
						}
						if (reverse){
							returnval = returnval.reverse();
						}
				}
				// if opts.callback has been defined, execute it;
				if(opts.callback != '' && $.isFunction(opts.callback)){
					opts.callback(returnval);
				};
			});
	};

})(jQuery);