
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;


// to initiate the game, "press any key to start", triggers nextSequence only at start of game, once.
$(document).one("keydown", function() {
  nextSequence();
});


//to activate the button and sound with pressing/clicking on the particular button.
$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});



function levelPrint() {
  // function prints out the level of the game stage
  $("#level-title").text("Level " + level);
};



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel]  === userClickedPattern[currentLevel]) {
    console.log('Success')
  } else {
    console.log('Wrong')
    playSound("wrong")
    animateGameOver("body");
    $("#level-title").text("Game Over. Press Any Key To Restart.");
    // if ($(document).one("keydown", function() {
    //   level = 0;
    //   gamePattern = [];
    //   nextSequence();
    };


  if (userClickedPattern.length === gamePattern.length) {

    setTimeout(function(){
      nextSequence();
    }, 1000);
  };
};


function nextSequence() {
  //resetting the user-answer array to an empty array at the start of each round
  userClickedPattern = [];

  level += 1;
  levelPrint();

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


function playSound(name) {
  let audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};


function animateGameOver(element) {
  $(element).addClass("game-over");
  setTimeout(function() {
    $(element).removeClass("game-over");
  }, 200);
};
