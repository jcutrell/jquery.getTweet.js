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
						var tweet = item.text.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, "<a href='$1'>$1</a>");
						tweet = tweet.replace(/(?:^|\s)#([^\s]+)/g, "<a href='http://search.twitter.com/search?q=%23$1'> #$1</a> ");
						tweet = tweet.replace(/@([^\s]+)/g, '<a href="http://twitter.com/$1">@$1</a>');
						html += "<li class='tweet'>" + tweet + "</li>";
					});
					html += "</ul>";
				} else if (opts.numberOfTweets = 1) {
					tweettext = data[0].text;
					var tweet = tweettext.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/g, "<a href='$1'>$1</a>");
					var	html =  tweet.replace(/(?:^|\s)#([^\s]+)\s/g, "<a href='http://search.twitter.com/search?q=%23$1'> #$1</a> ");
						html = tweet.replace(/@([^\s]+)/g, '<a href="http://twitter.com/$1">@$1</a>');
				}
				that.html(html);
			});
		});
	}
	
	
	
//developer	
	$.getTweet = function(username, numberOfTweets, callback, options){
		$.getTweet.defaults = {
				"username" : "jcutrell",
				"numberOfTweets" : "1",
				"callback" : ''
		}
		$.getTweet.api = {}
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
			$.getTweet.api = data;
				if (opts.numberOfTweets > 1 && !($.isArray(opts.numberOfTweets))){
					$.each(data, function(index, item){
						returnval[index] = item.text;
					});
				} else if (opts.numberOfTweets == 1 && !($.isArray(opts.numberOfTweets))) {
					returnval[0] = data[0].text;
				} else {
					var start = opts.numberOfTweets[0],
						end = data.length-1;
						if (start > end){
							end = opts.numberOfTweets[0];
							start = opts.numberOfTweets[1];
							var reverse = true;
						}
						var i = start;
						for (var i = start; i <= end; i++){
								if(data[i]){
									returnval[(i-start)] = data[i].text;
							}
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