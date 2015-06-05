"use strict";
(function(){
	var round;
	var score;
	var holes;
	var random;
	var intervalId;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		round = 1;
		score = 0;
		holes = $(".hole");
		setBeginningAnimation();

		$("#start-button").on("click", onButtonClick);
	}

	function setBeginningAnimation(){
		var interval = 1000;

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * holes.length);

			$(holes[random]).effect("highlight", {color:"#558ABB"});
		}, interval);
	}

	function onButtonClick(){
		clearInterval(intervalId);
		$("#start-button").remove();
		$("#gameboard").css("opacity", "1.0");
	}

	initialize();
})();