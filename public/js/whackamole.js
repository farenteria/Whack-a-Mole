"use strict";
(function(){
	var round;
	var score;
	var holes;
	var lives;
	var intervalId;
	var startButton;
	var keyPresses;
	var currentKey;
	var keysAllowed;
	var gameTitle;
	var interval;
	var changedRound;

	//Will only run when page is first loaded
	function onFirstRun(){
		initialize();
		animateHeading("Hit the Letters!");
		$("#start-button").on("click", onButtonClick);
	}

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		var startingPoint = 48; //char code for '0'. Begin pushing to keysAllowed array from there
		var totalKeys = 10; //currently only has the set of numbers from 0-9 to choose from
		round = 0;
		score = 0;
		lives = 5;
		changedRound = false;
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
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(event.which == currentKey){
			score++;
			$("#score").text(score);
			changedRound = false;
		} else{
			lives--;
			$("#lives").text(lives);
		}

		if (lives < 0){
			endGame();
		}
	}

	//starts key animtations, resets html text, and adds listeners to each hole
	function startGame(){
		$("body").on("keydown", onKeyPresses);
		$("#round").text(round);
		$("#score").text(score);
		$("#lives").text(lives);

		setKeyAnimation();
		addRound();
	}

	//Add a new row each round, make interval have less time
	function addRound(){
		round++;
		$("#round").text(round);
		changedRound = true;

		clearInterval(intervalId);
		interval -= 100;
		setKeyAnimation();
	}

	//before game begins, highlight random holes in gameboard
	function setKeyAnimation(){
		var random;
		var effect = "puff";

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * keysAllowed.length);
			currentKey = keysAllowed[random];

			setRandomPosition();

			$(".letter-shown").show();
			$(".letter-shown").text(random);
			$(".letter-shown").effect(effect);

			if(score % 10 == 0 && score != 0 && !changedRound){
				addRound();
			}

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

	//stops key animations, announces that user is terrible
	function endGame(){
		clearInterval(intervalId);
		bringBackButton();
		initialize();
		animateHeading("Game Over");

		$("body").off();
	}

	//places start button back in position
	function bringBackButton(){
		$(startButton).appendTo(".container");
		$(gameTitle).appendTo("#game-area");
	}

	onFirstRun();
})();