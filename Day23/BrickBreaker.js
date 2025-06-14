let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 12;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

let paddleHeight = 12;
let paddleWidth = 72;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding= 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;

let score = 0;
let bricks = [];

for(let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}
function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "lawngreen";
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status == 1){
                let brickX = c*(brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x =  brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#6600cc";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function collisionDetection(){
    for(let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            let b = bricks[c][r];

            if(b.status == 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount * brickColumnCount){
                        alert("Congrulations! You Won.");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    else if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
        alert("Game Over");
        document.location.reload();
    }
}

//     if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
//     dy = -dy;
//    }

if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
}
else if(leftPressed && paddleX > 0){
    paddleX -= 7;
}

x += dx;
y += dy;
}


setInterval(draw, 10);