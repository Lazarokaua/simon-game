let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

function startOver() {
  level = 0
  gamePattern = []
  started = false
}

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    $("h1").text("level " + level);
    started = true;
  }

});


$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)
})

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");


    startOver();
  }

}

function nextSequence() {
  userClickedPattern = []

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour)

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}


function playSound(name) {

  let audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");


  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}






