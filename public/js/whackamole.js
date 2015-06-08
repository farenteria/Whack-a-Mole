"use strict";
(function(){
	var round;
	var score;
	var holes;
	var lives;
	var intervalId;
	var startButton;
	var keyPresses;
	var currentLetter;
	var keysAllowed;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		var startingPoint = 48; //char code for '0'. Begin pushing to keysAllowed array from there
		var totalKeys = 10; //currently only has the set of numbers from 0-9 to choose from
		round = 0;
		score = 0;
		lives = 5;
		keysAllowed = [];

		//the numbers that user may press (0-9) in char code
		for(var i = startingPoint; i < startingPoint + totalKeys; i++){
			keysAllowed.push(i);
		}

		$("#start-button").on("click", onButtonClick);
	}

	//before game begins, highlight random holes in gameboard
	function setHoleAnimation(){
		var interval = 1500;
		var effect = "puff";
		var random;

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * keysAllowed.length);
			currentLetter = keysAllowed[random];

			setRandomPosition();

			$(".letter-shown").show();
			$(".letter-shown").text(random);

			$(".letter-shown").effect(effect);
		}, interval);
	}

	//sets letter in a random position
	function setRandomPosition(){
		var random;
		var gameBoxHeight = $("#game-area").height();
		var gameBoxWidth = $("#game-area").width();

		random = Math.floor(Math.random() * gameBoxWidth);
		$(".letter-shown").css("left", random);

		random = Math.floor(Math.random() * gameBoxHeight);
		$(".letter-shown").css("top", random);
	}

	//when start button is clicked, remove button, and make gameboard opaque
	function onButtonClick(){
		startButton = $("#start-button").detach();
		$("#gameboard").css("opacity", "1.0");

		startGame();
	}

	//Add a new row each round
	function addRound(){
		round++;
		$("#round").text(round);
	}

	//starts mole animations, and adds listeners to each hole
	function startGame(){
		$("body").on("keydown", onKeyPresses);
		$("#round").text(round);
		$("#score").text(score);
		$("#lives").text(lives);

		setHoleAnimation();
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
		$("body").off();
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(($.inArray(event.which, keysAllowed)) >= 0 && event.which == currentLetter){
			score++;
			$("#score").text(score);
		} else{
			lives--;
			$("#lives").text(lives);
		}

		if (lives < 0){
			endGame();
		}
	}

	function showNextLetter(){

	}

	initialize();
})();