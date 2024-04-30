// -------------PONG MOVEMENT --------------------

var pong1 = document.querySelector(".pong--1");
var pong2 = document.querySelector(".pong--2");
var posPong1 = Number(pong1.style.top);
var posPong2 = Number(pong2.style.top);
var keyPressed = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
  W: false,
  S: false,
};
var movingUp1 = false;
var movingUp2 = false;
var firstClick = false;
document.addEventListener("click", (e) => {
  if (firstClick) {
    document.querySelector(".pong--1").classList.add("transition");
    document.querySelector(".pong--2").classList.add("transition");
    if (
      e.x <=
      0.5 *
        document.querySelector(".boundaryVerticalRight").getBoundingClientRect()
          .left
    ) {
      if (movingUp1) {
        pong1.style = `top : 0px`;
        movingUp1 = false;
      } else {
        pong1.style = `top : ${
          document
            .querySelector(".boundaryHorizontalDown")
            .getBoundingClientRect().bottom -
          pong1.getBoundingClientRect().bottom
        }px;`;
        movingUp1 = true;
      }
    } else {
      if (movingUp2) {
        pong2.style = `top : 0px`;
        movingUp2 = false;
      } else {
        pong2.style = `top : ${
          document
            .querySelector(".boundaryHorizontalDown")
            .getBoundingClientRect().bottom -
          pong2.getBoundingClientRect().bottom
        }px;`;
        movingUp2 = true;
      }
    }
  }
});

function pongMovement() {
  document.addEventListener("keydown", (e) => {
    keyPressed[`${e.key}`] = true;
  });
  document.addEventListener("keyup", (e) => {
    keyPressed[`${e.key}`] = false;
  });

  if (
    (keyPressed.w || keyPressed.W) &&
    pong1.getBoundingClientRect().top >=
      document.querySelector(`.boundaryHorizontalUp`).getBoundingClientRect()
        .bottom
  ) {
    posPong1 -= 5;
    pong1.style = `top : ${posPong1}px;`;
  }
  if (
    (keyPressed.s || keyPressed.S) &&
    pong1.getBoundingClientRect().bottom <=
      document.querySelector(`.boundaryHorizontalDown`).getBoundingClientRect()
        .top
  ) {
    posPong1 += 5;
    pong1.style = `top : ${posPong1}px;`;
  }
  if (
    keyPressed.ArrowUp &&
    pong2.getBoundingClientRect().top >=
      document.querySelector(`.boundaryHorizontalUp`).getBoundingClientRect()
        .bottom
  ) {
    posPong2 -= 3;
    pong2.style = `top : ${posPong2}px;`;
  }
  if (
    keyPressed.ArrowDown &&
    pong2.getBoundingClientRect().bottom <=
      document.querySelector(`.boundaryHorizontalDown`).getBoundingClientRect()
        .top
  ) {
    posPong2 += 3;
    pong2.style = `top : ${posPong2}px;`;
  }

  setTimeout(pongMovement, 2);
}

pongMovement();

// -------------BALL MOVEMENT --------------------
const ball = document.querySelector(".ball");
var ballX = ball.getBoundingClientRect().left;
var ballY = ball.getBoundingClientRect().top;
var score1 = Number(document.querySelector(".score--1").textContent);
var score2 = Number(document.querySelector(".score--2").textContent);
var theta = 0;
var velocityX = 0;
var velocityY = 0;

const generateValues = () => {
  theta = (Math.random() * 60 * Math.PI) / 180;
  velocityX = Math.sqrt(1 + Math.pow(Math.tan(theta), 2)) * Math.cos(theta) * 2;
  velocityY = Math.sqrt(1 + Math.pow(Math.tan(theta), 2)) * Math.sin(theta) * 2;
  ballX = ball.getBoundingClientRect().left;
  ballY = ball.getBoundingClientRect().top;
};

function ballMovement() {
  if (Number(score1) < 5 && Number(score2) < 5) {
    ballX -= velocityX;
    ballY -= velocityY;
    ball.style = `top : ${ballY}px ; left : ${ballX}px;`;
    if (
      ball.getBoundingClientRect().top <= 0 ||
      ball.getBoundingClientRect().bottom >=
        document
          .querySelector(".boundaryHorizontalDown")
          .getBoundingClientRect().top
    )
      velocityY = -1 * velocityY;
    else if (
      (pong1.getBoundingClientRect().right >=
        ball.getBoundingClientRect().left &&
        ball.getBoundingClientRect().y <=
          pong1.getBoundingClientRect().bottom &&
        ball.getBoundingClientRect().bottom >=
          pong1.getBoundingClientRect().top) ||
      (ball.getBoundingClientRect().right >=
        pong2.getBoundingClientRect().left &&
        ball.getBoundingClientRect().y <=
          pong2.getBoundingClientRect().bottom &&
        ball.getBoundingClientRect().bottom >=
          pong2.getBoundingClientRect().top)
    ) {
      if (keyPressed.w || keyPressed.W) {
        velocityX = -1 * velocityX;
        velocityY -= 2;
      } else if (keyPressed.w || keyPressed.W) {
        velocityX = -1 * velocityX;
        velocityY += 2;
      } else {
        velocityX = -1 * velocityX;
      }
    } else if (ballX <= 0) {
      ball.style = "top : 50% ; left : 50%;";
      score2++;
      document.querySelector(".score--1").children[0].textContent = score1;
      document.querySelector(".score--2").children[0].textContent = score2;
      generateValues();
    } else if (
      ballX >=
      document.querySelector(".boundaryVerticalRight").getBoundingClientRect()
        .right
    ) {
      ball.style = "top : 50% ; left : 50%;";
      score1++;
      document.querySelector(".score--1").children[0].textContent = score1;
      document.querySelector(".score--2").children[0].textContent = score2;
      generateValues();
    }
    setTimeout(ballMovement, 0.5);
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
  score1 = 0;
  score2 = 0;
  document.querySelector(".score--1").children[0].textContent = score1;
  document.querySelector(".score--2").children[0].textContent = score2;
  ball.classList.remove("hidden");
  setTimeout(() => {
    firstClick = true;
  }, 10);
  generateValues();
  ballMovement();
});
