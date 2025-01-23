// !Board
let board;
let boardWidth  = 360;
let boardHeight = 576;
let context;

// !doodler
let doodlerWidth = 46;
let doodlerHeight = 46;
let doodlerX = boardWidth/2 - doodlerWidth/2;
let doodlerY = boardHeight*7/8 - doodlerHeight;
let doodlerRightImg;
let doodlerLeftImg;

// !physics 
let velocityX = 0;
let velocityY = 0; //dooler jump speed
let initialVelocityY = -8;  // starting velocity Y
let gravity = 0.4;

// !platforms
let platformArray = [];
let platformWidth = 60;
let platformHeight = 18;
let platformImg;

let score = 0;
let maxScore = 0;
let gameOver = false;


let doodler = {
    img : null,
    x : doodlerX,
    y : doodlerY,
    width : doodlerWidth,
    height : doodlerHeight
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // ! draw doodler
    // context.fillStyle = "green";
    // context.fillRect(doodler.x, doodler.y, doodler.width, doodler.height)

    // !Load images
    doodlerRightImg = new Image();
    doodlerRightImg.src = "./img/doodler-right.png"
    doodler.img = doodlerRightImg;
    doodlerRightImg.onload = function() {
        context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);
    }

    doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./img/doodler-left.png"

    platformImg = new Image();
    platformImg.src = "./img/platform.png"

    velocityY = initialVelocityY;
    placePlatforms();
    requestAnimationFrame(update)
    document.addEventListener("keydown", moveDoodler)

}


function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height)

    // !doodler
    doodler.x += velocityX;
    if (doodler.x > boardWidth){
        doodler.x = 0;
    }
    else if (doodler.x + doodler.width <0 ) {
        doodler.x = boardWidth;
    }

    velocityY += gravity;
    doodler.y += velocityY;
    context.drawImage(doodler.img, doodler.x, doodler.y, doodler.width, doodler.height);

    // !Platforms
    for (let i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        context.drawImage(platformImg, platform.x, platform.y, platform.width, platform.height)
    }

}

function moveDoodler (e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") { //!move right
        velocityX = 4;
        doodler.img = doodlerRightImg;
    }
    else if (e.code == "ArrowLeft" || e.code == "KeyA") {//! move left
        velocityX = -4;
        doodler.img = doodlerLeftImg;
    }
}

function placePlatforms() {
    platformArray = [];

    // !Starting platforms
    let platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 50,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);


    platform = {
        img : platformImg,
        x : boardWidth/2,
        y : boardHeight - 150,
        width : platformWidth,
        height : platformHeight
    }

    platformArray.push(platform);

}

// ------------------------------------   28.39 -------------------------------------//













