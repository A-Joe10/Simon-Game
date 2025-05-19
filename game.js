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
}

function repeatSequence() {
  $("#level-title").text(`Level ${levelCounter + 1}`);
  levelCounter++;
  let i = 0;
  const interval = setInterval(() => {
    if (i >= gamePattern.length) {
      clearInterval(interval);
      return;
    }
    const color = gamePattern[i];
    var audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
    $(`#${color}`).fadeOut(120).fadeIn(120).fadeOut(120).fadeIn(120);
    i++;
  }, 500);
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
  $("#level-title").text(`Click to Start the game`);
}

$(document).click(function (e) {
  if (e.target.classList.contains("btn")) return;
  keyDownCount++;
  if (keyDownCount == 1) {
    gameReset();
    $("#level-title").text(`Level ${levelCounter}`);
    nextSequence();
    keyDownCount = 2;
  } else if (keyDownCount > 1) {
    gameReset();
    $("body").addClass("game-over");
    $('#correct').removeClass('display');
    $('#wrong').removeClass('display');
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
        $('#correct').addClass('display');
        $('#correct')[0].play();
        setTimeout(() => {
          $('#correct').removeClass('display');
          setTimeout(() => {
            repeatSequence();
          setTimeout(() => {
            nextSequence();
          }, gamePattern.length * 500 + 500);
          }, 500);
        }, 1000);
      }, 500);
    }
  } else {
    $('#wrong').addClass('display');
    $('#wrong')[0].play();
    gameReset();
    setTimeout(() => {
      $('#wrong').removeClass('display');
    }, 2000);
  }
});
