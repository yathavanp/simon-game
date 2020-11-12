var gamepattern = [];
var userClickedPattern = [];
var lvl = 1;
var start = false;
var count = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

restart(); 

function restart(){
    $(document).keypress(function(){
        if(start === false){     
            start = true;
            nextsequence();
        }
    });

    $("#level-title").click(function(){
        if(start === false){     
            start = true;
            nextsequence();
        }
    });
}
    



$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userChosenColor);
});

function nextsequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    $("h1").text("Level " + lvl);
    lvl++;
}

function playAudio(color){
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



function checkAnswer(userChosenColor){
    if(userClickedPattern[count] === gamepattern [count]){
        playAudio(userChosenColor);
        count++;
        if(userClickedPattern.length === gamepattern.length){
            userReset();
            setTimeout(function(){
                nextsequence();
            }, 700);
            
        }
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playAudio('wrong');
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        userReset();
        gameReset();
        start = false;
        restart();
    }

}



function userReset(){
    userClickedPattern = [];
    count = 0;
}

function gameReset(){
    gamepattern = [];
    lvl = 1;
}
