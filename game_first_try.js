
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];
let relativeValue = 0;

let level = 0;
//to activate the button and sound with pressing/clicking on the particular button.
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (relativeValue === 0) {
      nextSequence();
  } else if (relativeValue === 1){
    $("#level-title").text("Game Over");
  }
});


function levelPrint() {
  // function prints out the level of the game stage
  $("#level-title").text("Level " + level);
};


function checkAnswer(firstArr, secondArr) {
  //function verifies and compares the array of user-picked-colors against the random-computer pattern
  $.each(firstArr, function(propName, propVal) {
  let k = propVal;
  $.each(secondArr, function(propName, propVal) {;
  let n = propVal;
  if (k != n) {
    console.log('wrong');
    return relativeValue = 1;
  } else {
      console.log("try again soon")
      return relativeValue = 0;
  }
});
});
};


function nextSequence() {
  level += 1;
  levelPrint();
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


// to initiate the game, "press any key to start", triggers nextSequence only at start of game, once.
$(document).one("keydown", function() {
  // levelPrint();
  nextSequence();
});


// // to activate the blinking and sound with pressing a key (keydown):
// document.addEventListener("keydown", function() {
//   nextSequence();
// })


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

//
// function buttonAnimation(currentKey) {
//   let activeButton = document.querySelector("." + currentKey);
//   activeButton.classList.add("pressed");
//   setTimeout(function(){
//     activeButton.classList.remove("pressed");
//   }, 100);
//   }
