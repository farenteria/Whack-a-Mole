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

	//when start button is clicked, remove button, stop highlighting, and make gameboard opaque
	function onButtonClick(){
		clearInterval(intervalId);
		$("#start-button").remove();
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
		var hole = "<div class='column one-third hole'></div>"; //this is what each hole consists of
		$("#gameboard").append("<div class='row'>" + hole + hole + hole + "</div>");
		holes = $(".hole");
		$(holes).on("click", onHoleClick);
	}

	//starts mole animations, and adds listeners to each hole
	function startGame(){
		setHoleAnimation();
		$(holes).on("click", onHoleClick);
	}

	//stops mole animation, announces that user is terrible
	function endGame(){
		alert("Game Over");
		clearInterval(intervalId);
	}

	initialize();
})();