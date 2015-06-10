/*
	This file concerns gameplay functionality. All visual changes will be in visuals.js
*/
"use strict";
(function(){
	//concerned with keeping track of gameplay 
	var round;
	var score;
	var lives;
	var highScore;
	var changedRound;

	//concerned with interval
	var interval;
	var intervalId;
	var currentKey;

	//concerned with game visuals
	var startButton;
	var gameTitle;
	
	//concerned with key listener
	var pressed;

	//arrays to keep track of which keys are allowed per round
	var keysAllowed;
	var firstSet;
	var secondSet;
	var thirdSet;
	var fourthSet;

	//Will only run when page is first loaded
	function onFirstRun(){
		//gets high score locally, if any.
		highScore = localStorage.getItem("highScore");

		//no high score saved locally. Set to 0 to make sure there are no problems
		if(!highScore){
			highScore = 0;
		}

		//high score is displayed on screen. Refer to visuals.js
		updateHighScore(highScore);

		initialize();
		$("#start-button").on("click", onButtonClick);

		//animates the phrase passed in. Refer to visuals.js
		animateHeading("Hit the Keys!");
	}

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		round = 0;
		score = 0;
		lives = 5;

		//this will be initialized to true to skip check on first round
		pressed = true;

		 //used to lower interval only once when new round begins
		changedRound = false;
		interval = 1800;

		keysAllowed = [];
		setArrays();

		//arrays are saved by charCode and by how they are displayed on keyboard
		function setArrays(){
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
		//removes start button and game title. Refer to visuals.js
		startButton = detachElement("#start-button");
		gameTitle = detachElement("#title");

		//Quiets the kittty. Refer to visuals.js
		removeBakerSayings();

		startGame();

		//starts key animtations, resets html text, and adds listeners to body
		function startGame(){
			//we're only detecting keypresses when game is started 
			$("body").on("keydown", onKeyPresses);

			//score and lives will be displayed. Refer to visuals.js
			updateScore(score);
			updateLives(lives);

			addRound();
		}
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(event.which == currentKey){
			score++;

			//displays new, current score. Refer to visuals.js
			updateScore(score);
			changedRound = false;

			//if we didn't check for changedRound, interval would keep lowering without stopping
			if(score % 10 == 0 && !changedRound){
				addRound();
			}
		} else{
			subtractLife();
		}

		if (lives < 0){
			endGame();
		}

		pressed = true;
	}

	//Add a color and size effect to round, make interval have less time
	function addRound(){
		round++;

		//Displays new round. //Refer to visuals.js
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

				//shows current key that must be pressed. Refer to visuals.js
				updateKey(currentKey);

				//if user hasn't pressed a key, that's going to cost a life
				//can sometimes run too quickly, and subtract by accident on first run
				if(!pressed){
					subtractLife();

					if(lives < 0){
						endGame();
					}
				}

				pressed = false;

			}, interval);
		}

		//each new round (until fifth round), concatenate another set of keys
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

		//sets the position of key shown in one direction as specified
		function setRandomPosition(elementMeasurement, measuredDimension, moveFrom){
			var random;

			do{
				random = Math.floor(Math.random() * measuredDimension - elementMeasurement);
			} while(random < 0);

			//will show the key in position. Refer to visuals.js
			setPosition(random, moveFrom);
		}
	}

	//subtracts a life from player, and displays it on screen.
	function subtractLife(){
		lives--;

		//displays on screen. Refer to visuals.js
		updateLives(lives);
	}

	//stops key animations, announces that user is terrible
	function endGame(){
		clearInterval(intervalId);

		/*	Back button and game title (which will now display something else) is placed back on game area. 
		   	Refer to visuals.js */
		bringBackElements(startButton, gameTitle);

		if(highScore < score){
			highScore = score;

			//new high score is displayd. Refer to visuals.js
			updateHighScore(highScore);

			//refer to visuals.js
			animateHeading("New High Score: " + highScore + "!");

			//show proud kitten being prideful. Refer to visuals.js
			showProud();

			//saves new high score to local storage
			localStorage.setItem("highScore", highScore);
		} else{
			//refer to visuals.js
			animateHeading("Game Over");

			//sad kitty will be sad. Refer to visuals.js
			showSad();
		}

		//reset variables to be ready for next game
		initialize();

		$("body").off();
	}

	onFirstRun();
})();