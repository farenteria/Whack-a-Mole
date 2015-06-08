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
	var gameTitle;
	var interval;
	var changedRound;

	//initializes variables, button, and beginning animations whenpage is loaded
	function initialize(){
		var startingPoint = 48; //char code for '0'. Begin pushing to keysAllowed array from there
		var totalKeys = 10; //currently only has the set of numbers from 0-9 to choose from
		round = 0;
		score = 0;
		lives = 5;
		changedRound = false;
		keysAllowed = [];

		//the numbers that user may press (0-9) in char code
		for(var i = startingPoint; i < startingPoint + totalKeys; i++){
			keysAllowed.push(i);
		}

		$("#start-button").on("click", onButtonClick);
		animateHeading();
	}
	//before game begins, highlight random holes in gameboard
	function setKeyAnimation(){
		interval = 1500;
		var effect = "puff";
		var random;

		intervalId = setInterval(function(){
			random = Math.floor(Math.random() * keysAllowed.length);
			currentLetter = keysAllowed[random];

			setRandomPosition();

			$(".letter-shown").show();
			$(".letter-shown").text(random);

			$(".letter-shown").effect(effect);

			if(score % 10 == 0 && score != 0 && !changedRound){
				addRound();
			}

			console.log(interval);
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
		gameTitle = $("#title").detach();

		startGame();
	}

	//Add a new row each round, make interval have less time
	function addRound(){
		round++;
		$("#round").text(round);
		changedRound = true;

		interval -= 100;
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

	//places start button back in position
	function bringBackButton(){
		$(startButton).appendTo(".container");
		$(gameTitle).appendTo("#game-area");
		initialize();
	}

	//stops key animations, announces that user is terrible
	function endGame(){
		alert("Game Over");
		// $("#title").text("Game Over");
		clearInterval(intervalId);
		bringBackButton();
		$("body").off();
	}

	//detects if keypress is equal to current key shown on screen, and ends game when lives run out
	function onKeyPresses(event){
		if(event.which == currentLetter){
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

	//animates each letter after the previous one for our game title
	function animateHeading(){
		//save our text so we can clear it and append to blank element
		var text = $("#title").text();
		$("#title").html("");

		for(var i = 0; i < text.length; i++) {
 			 $("#title").append("<span class='animate'>" + text[i] + "</span>");
		}

		$(".animate").each(function() {
	        var that = $(this);

	        setTimeout(function() { 
	        	that.animate({ fontSize: "90px" }, 1500 )
	                .animate({ fontSize: "50px" }, 1500 );
	        }, $(this).index() * 100);
  	  	});
	}

	initialize();
})();