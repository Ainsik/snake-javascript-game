let snakeBoard = document.querySelector(".snakeBoard");
let boxes = document.getElementsByClassName("box");
let modul = document.querySelector('.modul');
let start = document.querySelector('.start')

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
    interval: 100,
    init: function () {
        snake.direction = "right";
        snake.position = [[9,10],[10,10]];
        snake.interval = 100;
        snake.food = 0;
        snake.score = 0;
        snake.time = 0;
        snakeBoard.innerHTML = "";
        createTable();

    }
 };

 snake.init();

document.addEventListener("keydown", move);


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
    for(let i = 0; i < snake.position.length; i++) {
        boxes[snake.position[i][0] + snake.position[i][1] * table.rowsColumns].classList.add("snake");
    };
};

function randomFood() {
    do{
    let randX = Math.floor(Math.random() * table.rowsColumns);
    let randY = Math.floor(Math.random() * table.rowsColumns);
    random = randX + randY * table.rowsColumns;
    }
    while (boxes[random].classList.contains("snake"))

    boxes[random].classList.add("food");
    foodPosition = [randX,randY];
}

function move() {
    
    updatePostion();
    renderSnake();
    document.addEventListener("keydown", turn);
    snake.canRotate = 1;
}



function hitBorder() {
  var headPos = snake.position.length-1;
  // goes of limits
  if (((snake.position[headPos][0] === table.rowsCols-1) && (snake.direction === "right")) || ((snake.position[headPos][0] === 0) && (snake.direction === "left")) || ((snake.position[headPos][1] === table.rowsCols-1) && (snake.direction === "down")) ||  ((snake.position[headPos][1] === 0) && (snake.direction === "up"))) {
 

        // tutaj wywołanie do stop 



  }
}


function updatePostion() {
    console.log(snake.position);
    console.log(boxes[snake.position[0][0] + snake.position[0][1] * table.rowsColumns].classList.remove("snake"));
    snake.position.shift();
    var head = snake.position[snake.position.length - 1]; 
    console.log(head)
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
    console.log(snake.position)
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

