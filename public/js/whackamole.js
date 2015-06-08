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
	var keyPresses;
	var currentLetter;
	var keysAllowed;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		var startingPoint = 48; //char code for '0'. Begin pushing to keysAllowed array from there
		var totalKeys = 10;
		round = 0;
		score = 0;
		lives = 5;
		columns = 0;
		keysAllowed = [];

		//the numbers that user may press (0-9) in char code
		for(var i = startingPoint; i < startingPoint + totalKeys; i++){
			keysAllowed.push(i);
		}

		setHoleAnimation();
		holes = $(".hole");

		$("#start-button").on("click", onButtonClick);
	}

	//before game begins, highlight random holes in gameboard
	function setHoleAnimation(){
		var interval = 1500;
		var effect = "puff";

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * keysAllowed.length);
			currentLetter = keysAllowed[random];

			$(".letter-shown").show();
			$(".letter-shown").text(random);

			$(".letter-shown").effect(effect);
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

	//detects if keypress is equal to current key shown on screen
	function onKeyPresses(event){
		if(($.inArray(event.which, keysAllowed)) >= 0 && event.which == currentLetter){
			score++;
			$("#score").text(score);
		} else{
			lives--;
			$("#lives").text(lives);
		}
	}

	function showNextLetter(){

	}

	$("body").on("keydown", onKeyPresses);

	initialize();
})();