"use strict";
(function(){
	var round;
	var score;
	var holes;
	var random;
	var lives;
	var intervalId;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		round = 1;
		score = 0;
		lives = 5;
		holes = $(".hole");
		setHoleAnimation();

		$("#start-button").on("click", onButtonClick);
	}

	//before game begins, highlight random holes in gameboard
	function setHoleAnimation(){
		var interval = 1000;
		var mole;

		intervalId = setInterval(function(){
			//before getting a new random hole, make sure the other one doesn't have a mole anymore
			$(holes[random]).toggleClass("mole");

			random = Math.floor(Math.random() * holes.length);

			$(holes[random]).effect("highlight", {color:"#558ABB"});
			$(holes[random]).toggleClass("mole");
		}, interval);
	}

	//when start button is clicked, remove button, stop highlighting, and make gameboard opaque
	function onButtonClick(){
		clearInterval(intervalId);
		$("#start-button").remove();
		$("#gameboard").css("opacity", "1.0");

		startGame();
	}

	function onHoleClick(event){
		if($(this).hasClass("mole")){
			score++;
			$("#score").text(score);
		} else{
			lives--;
			$("#lives").text(lives);
		}

		if (lives < 0){
			alert("Game Over");
		}
	}

	function startGame(){
		setHoleAnimation();
		$(holes).on("click", onHoleClick);
	}

	initialize();
})();