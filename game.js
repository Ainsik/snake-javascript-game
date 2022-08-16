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
        renderSnake();
    }
 };

 snake.init();
 
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