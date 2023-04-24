const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var playing = false;
var level = 0;


$(document).keypress(function () { 
    
    if (!playing) {

        $("#level-title").text("Level " + level);
        nextSequence();
        playing = true;
    }

});

$(".btn").click(function () { 
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    

    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}





function playSound(name){
    var audioPath = 'sounds/' + name + '.mp3';
    var audio = new Audio(audioPath);
    audio.play();
}


function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound('wrong');
        console.log("Wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        playing = false;
        level = 0;
        gamePattern = [];
    }
}




// alert(userChosenColor());



// alert(randomChosenColor);

