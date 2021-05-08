var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started=false;
var level=0;


$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatepress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(size){
    if(userClickedPattern[size]===gamePattern[size])
    {
        console.log("good");
        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function(){nextSequence();},1000);
        }
    }else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");   
        },200);


        $("h1").text("Game Over, Press Any Key to Restart");
       startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
   level++;
   $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
      
    
}

function playSound(userChosenColour){
    var audio= new Audio("sounds/"+userChosenColour+".mp3");
    audio.play();
}


function animatepress(colour)
{
    $("."+colour).addClass("pressed");

    setTimeout(function (){
        $("."+colour).removeClass("pressed");  
    },100);
}

function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
     





