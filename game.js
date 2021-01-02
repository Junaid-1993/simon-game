var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var clickStarted = false;
var keyStarted = true;
var i = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    level++;
}

$(".btn").on("click", function() {
    if (clickStarted === true) {
        var userChosenColour = $(this).attr("id"); //this.id;
        userClickedPattern.push(userChosenColour);
        
        animatePressed($(this));
        playSound(userChosenColour);
        checkAnswer(userClickedPattern);
    }
})

$(document).keydown(function(event) {
    if (keyStarted === true) {
        nextSequence();
        keyStarted = false;
        clickStarted = true;
    }
})

function animatePressed(currentColour) {
    $(currentColour).addClass("pressed");

    setTimeout(function() {
        $(currentColour).removeClass("pressed");
    }, 100)
}

function playSound(name) {
    var colorSound = "sounds/" + name + ".mp3";

    var audio = new Audio(colorSound);
    audio.play();
}

function checkAnswer(currentLevel) {
   if (currentLevel[i] === gamePattern[i]) {
       if (currentLevel.length === gamePattern.length) {
        
           setTimeout(function() {
            nextSequence();    
           }, 1000);
           userClickedPattern = [];
           i = 0;
       } else {
           i++;
       } 
   } else {
       playSound("wrong");

       $("body").addClass("game-over");

       setTimeout(function() {
           $("body").removeClass("game-over");
       }, 200);
       
       $("#level-title").text("Game Over, Press Any Key to Restart");

       setTimeout(function() {
        alert("Your Level was " + (level - 1));
        startOver();
       }, 300)
   }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    keyStarted = true;
    clickStarted = false;
}

