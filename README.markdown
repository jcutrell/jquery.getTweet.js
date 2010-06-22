
#jquery.getTweet.js -An easy to use tweet fetcher.

####Created by Jonathan Cutrell
####twitter: @jcutrell
####email: jonathan.cutrell@gmail.com
####github: jcutrell

As long as twitter continues to serve JSON the way that they are currently doing, this plugin will work.

It's pretty simple... Two methods.

_____________________________________________________________________________________
##First method

	$(".coolclass").getTweet("username");
*The easiest way to use the plugin; grabs the latest tweet for @username and puts it inside the element corresponding to the matching selector.*
		
		
	$(".someclass").getTweet("username", 4);
*This will replace all of the html in elements matching the .someclass selector with a <\ul id="getTweet">*
*Each tweet will be wrapped in an <\li> with a class of "tweet".*

_____________________________________________________________________________________
##Second method

	$.getTweet()
*This method passes an array to the callback function.*


	$.getTweet("username", 5, function(data){ // do something here })
*This method will grab the latest 5 tweets and pass them into the callback function.*
		
		
	$.getTweet("username", [3, 9], function(data){ // do something here })
*This method can also take a (0-indexed) array to grab, in this instance, tweets 4-10 from your latest tweets.*
*This array is passed to the callback.*
		
		
	$.getTweet("username", [9, 3], function(data){ // do something })
*This will return the same array as the previous example, in reverse order.*
		
		
	$.getTweet("username", function(data){ // do something })
*The simplest usage of $.getTweet - grabs the latest tweet and stores it at the array[0] position.*

		
_____________________________________________________________________________________

_____________________________________________________________________________________


The plugin is intentionally low on features; in the future, I may add a few features, as geolocation, etc make their way.

I have made the public twitter json object available to use via the $.getTweet.api object. The following function, for instance, puts a span around the creation time of a set of tweets, and appends them to an element with an id of "targetDiv".

	$.getTweet('username', [20, 30], function(data){ $.each($.getTweet.api, function(i, item){
			$('<span>"' + item.created_at + '"</span>').appendTo('#targetDiv')
			});
		});

///////////////////////////

###**A few considerations...**

1. The twitter api isn't really extremely friendly to javascript developers. They provide JSON data, but in general, javascript and twitter don't play too well together.
2. With that said, the tweets that are accessible through this plugin are only the public tweets. This means that while you may request for 50 tweets, 45 may be shown (because, for instance, of a retweet of an account that was private).
3. Twitter is a busy place. Be mindful of how slow it can be to gather large amounts of data from Twitter.
4. Pagination is not currently supported with this plugin.