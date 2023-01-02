let buttonColours = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let level = 0;
let gameState = false;
let gameStartKey = true;
let counter = 0;
let colors;

function playSound(name) {
  new Audio((src = `./sounds/${name}.mp3`)).play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  // Генерация случайного числа - цвета
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  // внесение этого числа в игровой паттерн
  gamePattern.push(randomChosenColour);
  // Анимация всего pattern
  let i = 0;
  colors = setInterval(function () {
    $(`#${gamePattern[i]}`)
      .animate({ opacity: 0.01 }, 100)
      .animate({ opacity: 1 }, 100);
    playSound(gamePattern[i]);
    console.log(gamePattern);
    i = i + 1;
    if (i == gamePattern.length) {
      // окончание показа и позволение нажимать юзеру
      clearInterval(colors);
      gameState = true;
    }
  }, 1000);
  // Изменение counter и левела
  counter = 0;
  $("h1").text(`Level ${level}`);
  level += 1;
}
// }

function checkAnswer(userChosenColour) {
  // сверка выбранного цвета и патерна игры
  if (userChosenColour === gamePattern[counter]) {
    // если совпало - анимация и звук + следующий каунтер
    animatePress(userChosenColour);
    playSound(userChosenColour);
    counter = counter + 1;
    // если это последний каунтер, следующий раунд и отключение позволения юзеру кликать
    if (counter == gamePattern.length) {
      gameState = false;
      nextSequence();
    }
  }
  // если неправильный цвет, то конец игры и обнуление
  else {
    $("body").addClass("game-over");
    new Audio((src = `./sounds/wrong.mp3`)).play();
    $("h1").text("Game is OVER!\n Press any key to restart!");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    gameState = false;
    counter = 0;
    gameStartKey = true;
    level = 0;
  }
}

/// Старт Игры
$(document).on("keydown", function () {
  // старт игры и блокировка последующих нажатий клавиш
  if (gameStartKey) {
    nextSequence();
    // console.log(gameState);
  }
  gameStartKey = false;
});
/// Клик юзера
$(".btn").on("click", function (e) {
  if (gameState) {
    // Юзер выбирает цвет
    let userChosenColour = e.target.getAttribute("id");
    // console.log(userClickedPattern);
    checkAnswer(userChosenColour);
  }
});
