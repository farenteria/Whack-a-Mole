"use strict";
(function(){
	var round;
	var score;
	var holes;
	var random;

	function initialize(){
		round = 1;
		score = 0;
		holes = $(".hole");
		setBeginningAnimation();
	}

	function setBeginningAnimation(){
		var interval = 1000;
		var intervalId;

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * holes.length);

			$(holes[random]).effect("highlight", {color:"#558ABB"});
		}, interval);
	}

	initialize();
})();