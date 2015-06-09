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

	//Will only run when page is first loaded
	function onFirstRun(){
		//gets high score locally, if any. Otherwise, it's 0
		highScore = localStorage.getItem("highScore");

		if(!highScore){
			highScore = 0;
		}

		$("#high-score").text("High Score: " + highScore);

		initialize();
		animateHeading("Hit the Numbers!");
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

		//the numbers that user may press (0-9) in char code
		for(var i = startingPoint; i < startingPoint + totalKeys; i++){
			keysAllowed.push(i);
		}
	}

	//animates each letter after the previous one for our game title
	function animateHeading(phrase){
		//save our text so we can clear it and append to blank element
		var text = phrase;
		$("#title").html("");

		//add a span with class to animate each individual letter
		for(var i = 0; i < text.length; i++) {
 			 $("#title").append("<span class='animate'>" + text[i] + "</span>");
		}

		/* 	make each letter bigger, back to original size, with each letter having a longer delay
			for an awesome animation */
		$(".animate").each(function() {
	        var that = $(this);

	        setTimeout(function() { 
	        	that.animate({ fontSize: "90px" }, 1500 ) //this wouldn't work with $(this) for some reason
	                .animate({ fontSize: "50px" }, 1500 );
	        }, $(this).index() * 100);
  	  	});
	}

	//when start button is clicked, remove button
	function onButtonClick(){
		startButton = $("#start-button").detach();
		gameTitle = $("#title").detach();

		startGame();

		//starts key animtations, resets html text, and adds listeners to body
		function startGame(){
			$("body").on("keydown", onKeyPresses);
			$("#round").text("Round: " + round);
			$("#score").text("Score: " + score);
			$("#lives").text("Lives: " + lives);

			addRound();
		}
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(event.which == currentKey){
			score++;
			$("#score").text("Score: " + score);
			changedRound = false;
		} else{
			lives--;
			$("#lives").text("Lives: " + lives);
		}

		if (lives < 0){
			endGame();
		}
	}

	//Add a color and size effect to round, make interval have less time
	function addRound(){
		round++;
		$("#round").text("Round: " + round).animate({
			color: "##EDC53F",
			fontSize: "20px"
		}, 500).animate({
			color: "#776E65",
			fontSize: "16px"
		}, 500);
		changedRound = true;

		clearInterval(intervalId);
		interval -= 100;
		setKeyAnimation();

		//start showing the keys to press randomly in game area with some effect
		function setKeyAnimation(){
			var random;
			var effect = "puff";

			intervalId = setInterval(function(){
				random = Math.floor(Math.random() * keysAllowed.length);
				currentKey = keysAllowed[random];

				setRandomPosition();

				$("#shown").show();
				$("#shown").text(random);
				$("#shown").effect(effect);

				//if we didn't check for changedRound, interval would keep lowering every ten points
				if(score % 10 == 0 && score != 0 && !changedRound){
					addRound();
				}

			}, interval);
		}
	}

	//sets letter in a random position
	function setRandomPosition(){
		var random;
		var gameBoxHeight = $("#game-area").height();
		var gameBoxWidth = $("#game-area").width();
		var elementHeight = $("#shown").height();
		var elementWidth = $("#shown").width();

		random = getRandomPosition(elementWidth, gameBoxWidth);
		setPosition(random, "left");

		random = getRandomPosition(elementHeight, gameBoxHeight);
		setPosition(random, "top");

		//will set the position in game-area
		function setPosition(random, moveFrom){
			$("#shown").css(moveFrom, random);
		}

		//gets a randomNumber within a set width/height (depends on what is sent in)
		function getRandomPosition(elementMeasurement, measuredDimension){
			var random;

			do{
				random = Math.floor(Math.random() * measuredDimension - elementMeasurement);
			} while(random < 0);
			return random;
		}
	}

	//stops key animations, announces that user is terrible
	function endGame(){
		clearInterval(intervalId);
		bringBackButton();

		if(highScore < score){
			highScore = score;
			$("#high-score").text("High Score: " + highScore);
			animateHeading("New High Score: " + highScore + "!");
			localStorage.setItem("highScore", highScore);
		} else{
			animateHeading("Game Over");
		}

		initialize();

		$("body").off();

		//places start button back in position
		function bringBackButton(){
			$(startButton).appendTo(".container");
			$(gameTitle).appendTo("#game-area");
		}
	}

	onFirstRun();
})();