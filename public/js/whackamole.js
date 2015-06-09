"use strict";
(function(){
	var round;
	var score;
	var lives;
	var interval;
	var highScore;
	var gameTitle;
	var currentKey;
	var intervalId;
	var startButton;
	var keysAllowed;
	var changedRound;
	var firstSet;
	var secondSet;
	var thirdSet;
	var fourthSet;
	var pressed;

	//Will only run when page is first loaded
	function onFirstRun(){
		//gets high score locally, if any. Otherwise, it's 0
		highScore = localStorage.getItem("highScore");

		if(!highScore){
			highScore = 0;
		}

		updateHighScore(highScore);

		initialize();
		animateHeading("Hit the Keys!");
		$("#start-button").on("click", onButtonClick);
	}

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		var startingPoint = 48; //char code for '0'. Begin pushing to keysAllowed array from there
		var totalKeys = 10; //currently only has the set of numbers from 0-9 to choose from
		round = 0;
		score = 0;
		lives = 5;
		changedRound = false; //used to lower interval only once when new round begins
		interval = 1100;
		intervalId = null;
		keysAllowed = [];
		setArrays();

		function setArrays(){
			//the numbers that user may press (0-9) in char code

			//[1, ... 0] in order from left to right
			firstSet = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
			//[Q, ... P] in order from left to right
			secondSet = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80];
			//[A, ... L] in order from left to right
			thirdSet = [65, 83, 68, 70, 71, 72, 74, 75, 76];
			//[Z, ... M] in order from left to right
			fourthSet = [90, 88, 67, 86, 66, 78, 77];
		}
	}

	//when start button is clicked, remove button
	function onButtonClick(){
		startButton = detachElement("#start-button");
		gameTitle = detachElement("#title");

		startGame();

		//starts key animtations, resets html text, and adds listeners to body
		function startGame(){
			$("body").on("keydown", onKeyPresses);
			updateScore(score);
			updateLives(lives);

			addRound();
		}
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(event.which == currentKey){
			score++;
			updateScore(score);
			changedRound = false;
		} else{
			lives--;
			updateLives(lives);
		}

		if (lives < 0){
			endGame();
		}

		pressed = true;
	}

	//Add a color and size effect to round, make interval have less time
	function addRound(){
		round++;
		updateRound(round);
		changedRound = true;

		appendArrays();

		clearInterval(intervalId);
		interval -= 100;
		setKey();

		//start showing the keys to press randomly in game area with some effect
		function setKey(){
			var random;

			intervalId = setInterval(function(){
				random = Math.floor(Math.random() * keysAllowed.length);
				currentKey = keysAllowed[random];

				setRandomPosition();
				showKey(currentKey);

				//if we didn't check for changedRound, interval would keep lowering without stopping
				if(score % 10 == 0 && score != 0 && !changedRound){
					addRound();
				}

				//if user hasn't pressed a key, that's going to cost a life
				if(!pressed){
					lives--;
					updateLives(lives);

					if(lives < 0){
						endGame();
					}
				}

				pressed = false;

			}, interval);
		}

		function appendArrays(){
			switch (round){
				case 1:
					keysAllowed = keysAllowed.concat(firstSet);
					break;
				case 2:
					keysAllowed = keysAllowed.concat(secondSet);
					break;
				case 3:
					keysAllowed = keysAllowed.concat(thirdSet);
					break;
				case 4:
					keysAllowed = keysAllowed.concat(fourthSet);
					break;
			}

		}
	}

	//sets letter in a random position
	function setRandomPosition(){
		var gameBoxHeight = $("#game-area").height();
		var gameBoxWidth = $("#game-area").width();
		var elementHeight = $("#shown").height();
		var elementWidth = $("#shown").width();

		setRandomPosition(elementWidth, gameBoxWidth, "left");
		setRandomPosition(elementHeight, gameBoxHeight, "top");

		//gets a randomNumber within a set width/height (depends on what is sent in)
		function setRandomPosition(elementMeasurement, measuredDimension, moveFrom){
			var random;

			do{
				random = Math.floor(Math.random() * measuredDimension - elementMeasurement);
			} while(random < 0);

			setPosition(random, moveFrom);
		}
	}

	//stops key animations, announces that user is terrible
	function endGame(){
		clearInterval(intervalId);
		bringBackButton(startButton, gameTitle);

		if(highScore < score){
			highScore = score;
			updateHighScore(highScore);
			animateHeading("New High Score: " + highScore + "!");
			localStorage.setItem("highScore", highScore);
		} else{
			animateHeading("Game Over");
		}

		initialize();

		$("body").off();
	}

	onFirstRun();
})();