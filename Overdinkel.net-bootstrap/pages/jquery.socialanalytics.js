;(function($) {
	$.socialAnalytics = {

		/**
		 * Plugin version
		 *
		 * @var		string
		 */
		version :				'0.1',

		/**
		 * Plugin default options
		 */
		defaults : {
			/**
			 * Google Analytics property id (UA-xxx-xxx)
			 *
			 * @var	string
			 */
			propertyID :		'UA-1-1',
			/**
			 * User defined variables to add (logged, etc.)
			 *
			 * @var	Array
			 */
			addVariables :		[],
			/**
			 * Use debug ?
			 *
			 * @var	boolean
			 */
			debug :				false,

			/**
			 * Social networks sites urls
			 *
			 * @var	array
			 */
			sites :				{
				"Digg": ["http://digg.com", "http://digg.com/login"],
				"Reddit": ["http://reddit.com", "http://reddit.com/new/", "http://reddit.com/controversial/", "http://reddit.com/top/", "http://reddit.com/r/reddit.com/", "http://reddit.com/r/programming/"],
				"StumbleUpon": ["http://stumbleupon.com"],
				"Yahoo Buzz": ["http://buzz.yahoo.com"],
				"Facebook": ["http://facebook.com/home.php", "http://facebook.com", "https://login.facebook.com/login.php"],
				"Del.icio.us": ["https://secure.del.icio.us/login", "http://del.icio.us/"],
				"MySpace": ["http://www.myspace.com/"],
				"Technorati": ["http://www.technorati.com"],
				"Newsvine": ["https://www.newsvine.com", "https://www.newsvine.com/_tools/user/login"],
				"Songza": ["http://songza.com"],
				"Slashdot": ["http://slashdot.org/"],
				"Ma.gnolia": ["http://ma.gnolia.com/"],
				"Blinklist": ["http://www.blinklist.com"],
				"Furl": ["http://furl.net", "http://furl.net/members/login"],
				"Mister Wong": ["http://www.mister-wong.com"],
				"Current": ["http://current.com", "http://current.com/login.html"],
				"Menaeme": ["http://meneame.net", "http://meneame.net/login.php"],
				"Oknotizie": ["http://oknotizie.alice.it", "http://oknotizie.alice.it/login.html.php"],
				"Diigo": ["http://www.diigo.com/", "https://secure.diigo.com/sign-in"],
				"Funp": ["http://funp.com", "http://funp.com/account/loginpage.php"],
				"Blogmarks": ["http://blogmarks.net"],
				"Yahoo Bookmarks": ["http://bookmarks.yahoo.com"],
				"Xanga": ["http://xanga.com"],
				"Blogger": ["http://blogger.com"],
				"Last.fm": ["http://www.last.fm/", "https://www.last.fm/login/"],
				"N4G": ["http://www.n4g.com"],
				"Faves": ["http://faves.com", "http://faves.com/home", "https://secure.faves.com/signIn"],
				"Simpy": ["http://www.simpy.com", "http://www.simpy.com/login"],
				"Yigg": ["http://www.yigg.de"],
				"Kirtsy": ["http://www.kirtsy.com", "http://www.kirtsy.com/login.php"],
				"Fark": ["http://www.fark.com", "http://cgi.fark.com/cgi/fark/users.pl?self=1"],
				"Mixx": ["https://www.mixx.com/login/dual", "http://www.mixx.com"],
				"Google Bookmarks": ["http://www.google.com/bookmarks", "http://www.google.com/ig/add?moduleurl=bookmarks.xml&hl=en"],
				"Subbmitt": ["http://subbmitt.com/"]
			}

		},
		
		/**
		 * Tells if Google Analytics Tracker object is defined
		 */
		haveGat :				function() {
			return (typeof window._gat == 'object');
		},

		/**
		 * Log utility
		 *
		 * @param	string		Message
		 * @param	object		Method options
		 */
		log :					function(message, options) {
			if (options.debug) {
				message = '* jSocialAnalytics : ' + message;
				try {
					console.log(message);
				} catch(ex) {
					alert(message);
				}
			}
		},

		/**
		 * Returns a list of visited sites
		 *
		 * Creates and iFrame, put links and check color, see http://code.google.com/p/aza/source/browse/trunk/SocialHistory/SocialHistory.js
		 *
		 * @param	object		Sites list
		 * @param	array		Site names list
		 */
		socialHistory :			function(sites) {
			var					visitedSites = [];
			var					iframe = document.createElement("iframe");
			
			iframe.style.position = "absolute";
			iframe.style.visibility = "hide";
			document.body.appendChild(iframe);

			// Firefox, Opera
			if(iframe.contentDocument) iframe.doc = iframe.contentDocument;
			// Internet Explorer
			else if(iframe.contentWindow) iframe.doc = iframe.contentWindow.document;

			// Magic: Force creation of the body (which is null by default in IE).
			// Also force the styles of visited/not-visted links.
			iframe.doc.open();
			iframe.doc.write('<style>');
			iframe.doc.write("a{color: 0000; left:200px;  font-size:20; display:block; }");   
			iframe.doc.write("a:visited {color: #FF0000;  text-decoration:line-through;  display:list-item;}");        
			iframe.doc.write('</style>');
			iframe.doc.close();

			
			$.each(sites, function(siteName, urlList) {
				$.each(urlList, function(index, url) {
					var			a = iframe.doc.createElement("a") + nodeValue("target=_blank");  								
			    	var			aWithWww = iframe.doc.createElement("a");
			        var			httpLen = url.indexOf("//") + 2;
        			var			urlWithWww = url.substring(0, httpLen) + "www." + url.substring(httpLen);


					a.href = url;
					a.innerHTML = siteName;
					iframe.doc.body.appendChild(a);
					aWithWww.href = urlWithWww;
					aWithWww.innerHTML = siteName;
					iframe.doc.body.appendChild(aWithWww);
				});
			});
			iframe.doc.close();

			var links = iframe.doc.body.childNodes;
			for( var i=0; i<links.length; i++) {
				// Handle both Firefox/Safari, and IE (respectively)
				var displayValue = $.socialAnalytics.getStyle(links[i], iframe.doc, "display");
				var didVisit = displayValue != "none";

				if(didVisit && (jQuery.inArray(links[i].innerHTML, visitedSites) == -1)) {
					visitedSites.push(links[i].innerHTML);
				}
			}
  
			return(visitedSites);
		},

		getStyle :				function(el, scopeDoc,styleProp) {
			var					y;

			if (el.currentStyle) {
				y = el.currentStyle[styleProp];
			} else if (window.getComputedStyle) {
				y = scopeDoc.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
			}
			return (y);
		}

		
	},

	$.fn.extend({

		/**
		 * Tag page
		 *
		 * @param	Object		Options
		 */
		tagAnalytics :			function(options) {
				var		settings = jQuery.extend({}, $.socialAnalytics.defaults, options);
				var		userDefinedValues = [];
				var		pageTracker;

				if (!$.socialAnalytics.haveGat()) {
					$.socialAnalytics.log('Google Analytics is not loaded', settings);
					return;
				}
				userDefinedValues = $.socialAnalytics.socialHistory(settings.sites);
				$.socialAnalytics.log('Found sites => ' + userDefinedValues.join(', '), settings);
				if (options.addVariables) {
					userDefinedValues = $.merge(userDefinedValues, options.addVariables);
				}
				userDefinedValues = $.map(userDefinedValues, function(value) {
					return value.replace(/\W+/g, '_');
				});
				userDefinedValues = userDefinedValues.join('/');
				$.socialAnalytics.log('GA User defined var => ' + userDefinedValues, settings);
				
				try {
					pageTracker = _gat._getTracker(options.propertyID);
					pageTracker._initData();
					pageTracker._trackPageview();
					pageTracker._setVar(userDefinedValues);
		        } catch(err) {
		        	$.socialAnalytics.log(ex, settings);
		        }
		}
	});
})(jQuery);
