/*	This file is purely concerned with updating the visuals on html page. For
*	functionality of game refer to whackamole.js
*/
"use strict";

//displays new score on page
function updateScore(score){
	$("#score").text("Score: " + score);
}

//displays new amount of lives on page after animating
function updateLives(lives){
	animateParagraph("#d30a0a", "lives", lives);
}

//displays new high score on page
function updateHighScore(highScore){
	$("#high-score").text("High Score: " + highScore);
}

//new round element will be animated to give a visual cue that it's going to get harder
function updateRound(round){
	animateParagraph("#EDC53F", "round", round);
}

//Updates new current key that must be pressed
function updateKey(currentKey){
	$("#shown").show();
	$("#shown").text(String.fromCharCode(currentKey));
	$("#shown").effect("puff", 800);	
}

//show how proud Baker Cat is of us for getting a high score
function showProud(){
	$("#proud-container").css("visibility", "visible");
}

//Baker Cat will be sad that you didn't get a high score
function showSad(){
	$("#sad-container").css("visibility", "visible");
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
	    }, that.index() * 100);
  	});
}

//Animates a paragraph
function animateParagraph(color, element, value){
	$("#" + element).text(capitalize(element) + ": " +  value).animate({
		color: "#" + color,
		fontSize: "20px"
	}, 500).animate({
		color: "#776E65",
		fontSize: "16px"
	}, 500);

	function capitalize(word){
		return word.charAt(0).toUpperCase() + word.slice(1, word.length);
	}	
}

//Gets saved button and title from references and displays them on page
function bringBackElements(startButton, gameTitle){
	$(gameTitle).appendTo("#game-area");
	$(startButton).appendTo("#game-area");
}

//Element passed in will be removed from page, and returned back for future reference
function detachElement(element){
	 return $(element).detach();
}

//sets current key on screen in position
function setPosition(random, moveFrom){
	$("#shown").css(moveFrom, random);
}

//Baker Cat will be quiet as he goes back to baking
function removeBakerSayings(){
	$(".kitten-container").css("visibility", "hidden");
}