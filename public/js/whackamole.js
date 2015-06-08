"use strict";
(function(){
	var round;
	var score;
	var holes;
	var random;
	var lives;
	var columns;
	var intervalId;
	var startButton;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		round = 0;
		score = 0;
		lives = 5;
		columns = 0;
		setHoleAnimation();
		holes = $(".hole");

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

	//when start button is clicked, remove button, and make gameboard opaque
	function onButtonClick(){
		startButton = $("#start-button").detach();
		$("#gameboard").css("opacity", "1.0");

		startGame();
	}

	//Whenever user clicks hole, check if mole is in it, and check if user still has lives
	function onHoleClick(event){
		if($(this).hasClass("mole")){
			score++;
			$("#score").text(score);

			if(score % 10 == 0){
				addRound();
			}
		} else{
			lives--;
			$("#lives").text(lives);
		}

		if (lives < 0){
			endGame();
		}
	}

	//Add a new row each round
	function addRound(){
		round++;
		$("#round").text(round);
	}

	//starts mole animations, and adds listeners to each hole
	function startGame(){
		$(holes).on("click", onHoleClick);
		$("#round").text(round);
		$("#score").text(score);
		$("#lives").text(lives);
		addRound();
	}

	//places start button back in position
	function bringBackButton(){
		initialize();
		$("#gameboard").css("opacity", "0.3");
		$(startButton).appendTo(".container");
	}

	//stops mole animation, announces that user is terrible
	function endGame(){
		alert("Game Over");
		clearInterval(intervalId);
		bringBackButton();
		$(holes).off();
	}

	initialize();
})();