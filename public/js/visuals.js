"use strict";

function updateScore(score){
	$("#score").text("Score: " + score);
}

function updateLives(lives){
	$("#lives").text("Lives: " + lives);
}

function updateHighScore(highScore){
	$("#high-score").text("High Score: " + highScore);
}

function updateRound(round){
	$("#round").text("Round: " + round).animate({
		color: "##EDC53F",
		fontSize: "20px"
	}, 500).animate({
		color: "#776E65",
		fontSize: "16px"
	}, 500);
}

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

function showKey(currentKey){
	$("#shown").show();
	$("#shown").text(String.fromCharCode(currentKey));
	$("#shown").effect("puff");	
}

function bringBackButton(startButton, gameTitle){
	$(startButton).appendTo(".container");
	$(gameTitle).appendTo("#game-area");
}

function detachElement(element){
	 return $(element).detach();
}

function setPosition(random, moveFrom){
	$("#shown").css(moveFrom, random);
}