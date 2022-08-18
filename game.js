let snakeBoard = document.querySelector(".snakeBoard");
let boxes = document.getElementsByClassName("box");
let modul = document.querySelector('.modul');
let start = document.querySelector('.start')
const scoreDisplay = document.querySelector('span')
let interval = 0
let over = false
let score = 0

let table = {
    rowsColumns: 21,
    box: 21*21
};

let snake = {
    direction: "right",
    position: [[9,10],[10,10]],
    food: 0, 
    score: 0, 
    time: 0,
    canRotate: 0,
    interval: 500 ,
    init: function () {
        snake.direction = "right";
        snake.position = [[9,10],[10,10]];
        snake.interval = 500;
        snake.food = 0;
        snake.score = 0;
        snake.time = 0;
        snakeBoard.innerHTML = "";
        createTable();
        randomFood();
    }
 };

 snake.init();
 timer()
 window.addEventListener("load", intervalMove);


// creating table
function createTable(){
    if(snakeBoard.innerHTML === "") {
        for(let i = 0; i < table.box; i++ ){
            let divElement = document.createElement("div");
            divElement.classList.add("box");
            snakeBoard.appendChild(divElement);
        };
    };
};

// render snake
function renderSnake() {
    if (over) gameOver()
    else {
        for (let i = 0; i < snake.position.length; i++) {
            boxes[snake.position[i][0] + snake.position[i][1] * table.rowsColumns].classList.add("snake");
        };
    }
};

function randomFood() {
    do{
    let randX = Math.floor(Math.random() * table.rowsColumns);
    let randY = Math.floor(Math.random() * table.rowsColumns);
    random = randX + randY * table.rowsColumns;
    }
    while (boxes[random].classList.contains("snake"))

    boxes[random].classList.add("food");
}

function intervalMove()
{
   interval = setInterval(function (){
        move();
    },snake.interval)
}
function move() {

    hitBorder();
    updatePostion();
    checkColissionWithFood();
    renderSnake();
    document.addEventListener("keydown", turn);
    snake.canRotate = 1;
    scoreDisplay.innerText = score
}

function checkColissionWithFood(){
    let head = snake.position[snake.position.length - 1];
    if (boxes[head[0] + head[1] * table.rowsColumns].classList.contains("food")){
        boxes[head[0] + head[1] * table.rowsColumns].classList.remove("food");
        snake.position.unshift(snake.position[0]);
        randomFood();
        score++
        scoreDisplay.textContent = score
    }
    for (let i=0;  i<snake.position.length-1;i++) {
        if (boxes[snake.position[i][0] + snake.position[i][1] * table.rowsColumns] === boxes[head[0] + head[1] * table.rowsColumns]) {
    over = true;
            gameOver();
    };
        }
}


function hitBorder() {
  const headPos = snake.position.length-1;
  // goes of limits
  if (((snake.position[headPos][0] === table.rowsColumns-1) && (snake.direction === "right")) ||
      ((snake.position[headPos][0] === 0) && (snake.direction === "left")) ||
      ((snake.position[headPos][1] === table.rowsColumns - 1) && (snake.direction === "down")) ||
      ((snake.position[headPos][1] === 0) && (snake.direction === "up"))) {
    over = true;
      gameOver();
  }
}


function updatePostion() {
    boxes[snake.position[0][0] + snake.position[0][1] * table.rowsColumns].classList.remove("snake");
    snake.position.shift();
    var head = snake.position[snake.position.length - 1];
    if(snake.direction === "left"){
        snake.position.push([head[0] - 1, head[1]])
    }
    else if(snake.direction === "right"){
        snake.position.push([head[0] + 1, head[1]])
    }
    else if(snake.direction === "up"){
        snake.position.push([head[0], head[1] - 1])
    }
    else if(snake.direction === "down"){
        snake.position.push([head[0], head[1] + 1])
    }
    else{
        console.log("wrong dir")
    }
};


// key heandler
function turn(e) {
    if(snake.canRotate) {
        if(e.keyCode === 38){ // arrow up
            if (snake.direction === "down")return;
            snake.direction = "up";
        }
        else if (e.keyCode === 40){ // arrow down
            if (snake.direction === "up")return;
            snake.direction = "down";
        }
        else if (e.keyCode === 39){ // arrow right
            if (snake.direction === "left")return;
            snake.direction = "right";
        }
        else if (e.keyCode === 37){ // arrow left
            if (snake.direction === "right")return;
            snake.direction = "left";
        }
        else {
            console.log("wrong key");
        }
    }
    snake.canRotate = 0;
}

function gameOver() {
    alert("You lose!");
    clearInterval(interval);
    for(let i = 0; i < snake.position.length; i++) {
        boxes[snake.position[i][0] + snake.position[i][1] * table.rowsColumns].classList.remove("snake");
    }
}
function timer(){
let countDownDate = new Date().getTime()


let interval = setInterval(function () {
    let now = new Date().getTime();

    let distance =  now -countDownDate  ;


    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);



    document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s "







}, 100);}