$(function() {
	var game;
	
	/**
	 * Initialises client-side functionality
	 */
	function init() {
		// WebSockets supported
		if ("WebSocket" in window) {
			var welcome = $("#welcome");
			
			// Player isn't authenticated on Twitter
			if (window.TWITTER_AUTHENTICATE_URL != undefined && TWITTER_AUTHENTICATE_URL != null) {
				var twitter = $("<a id='twitterSignIn' href='"+TWITTER_AUTHENTICATE_URL+"'></a>");
				twitter.appendTo("#welcome");
			};
			
			welcome.fadeIn();
			
			// Player is apparently authenticated on Twitter
			if (TWITTER_ACCESS_TOKEN != null && TWITTER_ACCESS_TOKEN_SECRET != null) {
				// Perform check to see if authentication is working
				
				welcome.fadeOut();
				
				game = new Game(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET);

				$("#attribution, #ping").fadeTo(500, 0.1).mouseover(function() {
					$(this).stop().fadeTo(500, 1);
				}).mouseout(function() {
					$(this).stop().fadeTo(500, 0.1);
				});

				initListeners();
			};
		// WebSockets not supported
		} else {
			$("#mask, #support").fadeIn();
		};

		$("body").prepend($("<input/>", {type: "range", min: 1, max: 20, value: 1, css: {"position": "absolute", "right": 0, "z-index": 1}}).change(function() {
			game.player.rocket.thrust = $(this).val();
		}));
	};
	
	/**
	 * Initialises environmental event listeners
	 */	
	function initListeners() {
		$(window).bind("resize", {self: game}, game.resizeCanvas)
				 // Horrible passing of game object due to event closure
				 .bind("keydown", {self: game}, game.keyDown)
				 .bind("keyup", {self: game}, game.keyUp)
				 .bind("mousedown", {self: game}, game.mouseDown)
				 .bind("mouseup", {self: game}, game.mouseUp);
	};
	
	// Initialise client-side functionality
	init();
});