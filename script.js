"use strict";
const pong1 = document.querySelector(".pong--1");
const pong2 = document.querySelector(".pong--2");

var score1 = Number(
  document.querySelector(".score--1").children[0].textContent
);
var score2 = Number(
  document.querySelector(".score--2").children[0].textContent
);

var pressedKeys = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
  W: false,
  S: false,
};
function update() {
  if (pressedKeys.s || pressedKeys.S) {
    pong1.style = `transform : translateY(45vh)`;
  }
  if (pressedKeys.w || pressedKeys.W) {
    pong1.style = "transform : translateY(-50vh);";
  }
  if (pressedKeys.ArrowDown) {
    pong2.style = `transform : translateY(45vh);`;
  }
  if (pressedKeys.ArrowUp) {
    pong2.style = "transform : translateY(-50vh);";
  }
}

document.addEventListener("keydown", function (e) {
  pressedKeys[`${e.key}`] = true;
  update();
});

document.addEventListener("keyup", function (e) {
  pressedKeys[`${e.key}`] = false;
  update();
});

//ball mechanics
const ball = document.querySelector(".ball");
var timeY = 0;
var timeX = 0;
var theta = 0;
var score1 = Number(
  document.querySelector(".score--1").children[0].textContent
);
var score2 = Number(
  document.querySelector(".score--2").children[0].textContent
);
const generateRandom = (range) => Math.floor(Math.random() * range) + 1;
const generateValues = () => {
  theta = generateRandom(60);
  timeX =
    ball.getBoundingClientRect().left /
    (Math.sqrt(1 + Math.pow(Math.tan((theta * Math.PI) / 180), 2)) *
      Math.cos((theta * Math.PI) / 180) *
      250);
  timeY =
    ball.getBoundingClientRect().top /
    (Math.sqrt(1 + Math.pow(Math.tan((theta * Math.PI) / 180), 2)) *
      Math.sin((theta * Math.PI) / 180) *
      250);
};
var dirUp = true;
var dirLeft = true;
generateValues();
function reverseDir() {
  dirUp = dirUp ? false : true;
}

function game() {
  if (score1 < 5 && score2 < 5) {
    if (
      ball.getBoundingClientRect().top == 0 ||
      Math.floor(ball.getBoundingClientRect().bottom) == window.innerHeight ||
      ball.getBoundingClientRect().left == 0 ||
      ball.getBoundingClientRect().right >=
        document.querySelector(".boundaryVerticalRight").getBoundingClientRect()
          .left
    ) {
      if (
        ball.getBoundingClientRect().left == 0 ||
        Math.floor(ball.getBoundingClientRect().right) >=
          document
            .querySelector(".boundaryVerticalRight")
            .getBoundingClientRect().left
      ) {
        dirUp = true;
        dirLeft = true;
        ball.getBoundingClientRect().left == 0 ? score2++ : score1++;
        document.querySelector(".score--1").children[0].textContent = score1;
        document.querySelector(".score--2").children[0].textContent = score2;
        ball.style = "top : 50% ; left : 50%;";
        generateValues();
        ball.style = `top : 0 ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
        setTimeout(game, 1);
      } else if (ball.getBoundingClientRect().top == 0) {
        if (dirLeft) {
          dirUp = false;
          ball.style = `top : 100% ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
          setTimeout(game, 1);
        } else {
          dirUp = false;
          ball.style = `top : 100% ; left : 100% ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
          setTimeout(game, 1);
        }
      } else if (
        Math.floor(ball.getBoundingClientRect().bottom) == window.innerHeight
      ) {
        if (dirLeft) {
          dirUp = true;
          ball.style = `top : 0 ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
          setTimeout(game, 1);
        } else {
          dirUp = true;
          ball.style = `top : 0 ; left : 100% ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
          setTimeout(game, 1);
        }
      } else setTimeout(game, 1);
    } else if (
      pong1.getBoundingClientRect().right >=
        ball.getBoundingClientRect().left &&
      ball.getBoundingClientRect().y <= pong1.getBoundingClientRect().bottom &&
      ball.getBoundingClientRect().bottom >= pong1.getBoundingClientRect().top
    ) {
      if (dirUp) {
        ball.style = `top : 0 ; left : 100% ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
        dirLeft = false;

        setTimeout(game, 1);
      } else {
        ball.style = `top : 100% ; left : 100% ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
        dirLeft = false;

        setTimeout(game, 1);
      }
    } else if (
      ball.getBoundingClientRect().right >=
        pong2.getBoundingClientRect().left &&
      ball.getBoundingClientRect().y <= pong2.getBoundingClientRect().bottom &&
      ball.getBoundingClientRect().bottom >= pong2.getBoundingClientRect().top
    ) {
      if (dirUp) {
        ball.style = `top : 0 ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
        dirLeft = true;

        setTimeout(game, 1);
      } else {
        ball.style = `top : 100% ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
        dirLeft = true;

        setTimeout(game, 1);
      }
    } else setTimeout(game, 1);
  } else {
    document.querySelector(".start").classList.remove("hidden");
    if (score1 < score2) {
      document.querySelector(".start").children[0].textContent = "RIGHT WINS";
    } else
      document.querySelector(".start").children[0].textContent = "LEFT WINS!";
    ball.style = `top : 50% ; left : 40% ;`;
    score1 = 0;
    score2 = 0;
    document.querySelector(".score--1").children[0].textContent = score1;
    document.querySelector(".score--2").children[0].textContent = score2;
  }
}

document.querySelector(".start").children[0].addEventListener("click", () => {
  document.querySelector(".start").classList.add("hidden");
  ball.style = `top : 0 ; left : 0 ; transition : top ${timeY}s ease-in, left ${timeX}s ease-in;`;
  ball.classList.remove("hidden");
  game();
});
