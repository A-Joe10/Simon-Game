var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelCounter = 0;
var keyDownCount = 0;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio(`sounds/${randomChosenColor}.mp3`);
  audio.play();
  $(`#${randomChosenColor}`).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120);
  $("#level-title").text(`Level ${levelCounter + 1}`);
  levelCounter++;
}

function keyDownAnimate(e) {
  $(`#${e}`).addClass("pressed");
  setTimeout(() => {
    $(`#${e}`).removeClass("pressed");
  }, 100);
}
function gameReset() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  keyDownCount = 0;
  levelCounter = 0;
  $("#level-title").text(`Press a Key to Start`);
}

$(document).keydown(function (e) {
  e.key = e.key.toLowerCase();
  keyDownCount++;
  if (keyDownCount == 1) {
    gameReset();
    nextSequence();
    keyDownCount = 2;
  } else if (keyDownCount > 1) {
    // If 'A' is pressed while game is running, reset the game
    gameReset();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    console.log("Game reset by pressing A");
  }
});

$(".btn").click(function () {
  userClickedPattern.push(this.id);
  keyDownAnimate(this.id);
  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameReset();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
  }
});
