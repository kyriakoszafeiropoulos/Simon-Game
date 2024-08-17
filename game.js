var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var randomChosenColour;


var start = true;


$("body").keypress(function () {
    if(start === true) {
        nextSequence();
        start = false;
}})



function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function(){
        $(currentColour).removeClass("pressed");
}, 100);
}


function nextSequence() {
    userClickedPattern = [];
    var ramdomNumber = Math.floor(Math.random() * 3) + 1;
    randomChosenColour = buttonColors[ramdomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
    console.log(gamePattern);
}


$(".btn").click(function () {
    var userChosenColour = this.id;
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(this);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
    
});




function checkAnswer (currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                
        }, 1000);
        }
        
        
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-Over");
        setTimeout(function(){
            $("body").removeClass("game-over");
    }, 200);
    startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = true;
}