/*	This file is purely concerned with updating the visuals on html page. For
*	functionality of game refer to whackamole.js
*/
"use strict";

//displays new score on page
function updateScore(score){
	$("#score").text("Score: " + score);
}

//displays new amount of lives on page
function updateLives(lives){
	$("#lives").text("Lives: " + lives);
}

//displays new high score on page
function updateHighScore(highScore){
	$("#high-score").text("High Score: " + highScore);
}

//new round element will be animated to give a visual cue that it's going to get harder
function updateRound(round){
	$("#round").text("Round: " + round).animate({
		color: "##EDC53F",
		fontSize: "20px"
	}, 500).animate({
		color: "#776E65",
		fontSize: "16px"
	}, 500);
}

//Updates new current key that must be pressed
function updateKey(currentKey){
	$("#shown").show();
	$("#shown").text(String.fromCharCode(currentKey));
	$("#shown").effect("puff");	
}

//Will animate each letter in phrase that's passed in
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

//Gets saved button and title from references and displays them on page
function bringBackElements(startButton, gameTitle){
	$(startButton).appendTo(".container");
	$(gameTitle).appendTo("#game-area");
}

//Element passed in will be removed from page, and returned back for future reference
function detachElement(element){
	 return $(element).detach();
}

//sets current key on screen in position
function setPosition(random, moveFrom){
	$("#shown").css(moveFrom, random);
}