const gameboard = document.getElementById("gameBoard");
const ctx = gameboard.getContext("2d");
const score = document.getElementById("score");
const reset = document.getElementById("reset");
const boardWidth = gameboard.width;
const boardHeight = gameboard.height;
const playerBorder = "black";
const backgroundColor = "lightgreen";
const player1Color = "blue";
const player2Color = "red";
const ballColor = "yellow";
const ballBorder = "black";
const ballRadius = 12.5;
const playerSpeed = 25;

let intervalId;
let ballSpeed = 1;
let ballX = boardWidth / 2;
let ballY = boardHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let player1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let player2 = {
    width: 25,
    height: 100,
    x: boardWidth - 25,
    y: boardHeight - 100
};

window.addEventListener("keydown", changeDirection);
reset.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalId = setTimeout(() => {
        clearBoard();
        drawPlayer();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick(); // for another round
    }, 10);
};
function clearBoard(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, boardWidth, boardHeight);
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const player1Up = 87; // w
    const player1Down = 83; // s
    const player2Up = 38; // arrow up
    const player2Down = 40; // arrow down

    switch(keyPressed){
        case player1Up:
            if(player1.y > 0){
                player1.y -= playerSpeed;
            }
            break;
            
        case player1Down:
            if(player1.y < boardHeight - player1.height){
                player1.y += playerSpeed; // plus becoz going down
            }
            break;
        
        case player2Up:
            if(player2.y > 0){
                player2.y -= playerSpeed; // minus becoz going up
            }
            break;
        case player2Down:
            if(player2.y < boardHeight - player2.height){
                player2.y += playerSpeed; // minus becoz going up
            }
            break;
    }
};
function drawPlayer(){
    // stroke deals with border of the diagram and fill deals with inner content of the diagram
    ctx.strokeStyle = playerBorder;

    ctx.fillStyle = player1Color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
    ctx.strokeRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2Color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
    ctx.strokeRect(player2.x, player2.y, player2.width, player2.height);
};
function drawBall(ballX, ballY){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){ // will give random number between 0 to 1 i.e. if 1 move right else left
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = boardWidth / 2;
    ballY = boardHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){ // when ball hits upper horizontal border
        ballYDirection *= -1;
    }
    if(ballY >= boardHeight - ballRadius){ // when ball hits lower horizontal border
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        player2Score++;
        updateScore();
        createBall();
        return;
    }
    if(ballX >= boardWidth){
        player1Score++;
        updateScore();
        createBall();
        return;
    }
    if(ballX <= (player1.x + player1.width + ballRadius)){
        if(ballY > player1.y && ballY < player1.y + player1.height){
            ballX = (player1.x + player1.width) + ballRadius; // when ball get stuck between paddle and horizontal wall
            ballXDirection *= -1;
            ballSpeed++;
        }
    }
    if(ballX >= (player2.x - ballRadius)){
        if(ballY > player2.y && ballY < player2.y + player2.height){
            ballX = (player2.x - ballRadius);
            ballXDirection *= -1;
            ballSpeed++;
        }
    }
};
function updateScore(){
    score.textContent = `${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    player1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    player2 = {
        width: 25,
        height: 100,
        x: boardWidth - 25,
        y: boardHeight - 100
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
};