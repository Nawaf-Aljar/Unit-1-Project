/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let timer = 30
let timeInterval
let score = 0
let winner = false
let gameOver = false
let characterPosition = 340
let fallingSpeed = 1
let fallingInterval
let objectInterval

/*------------------------ Cached Element References ------------------------*/

const buttonBorderElement = document.querySelector(".button")
const startButtonElement = document.querySelector("#startButton")
const restButtonElement = document.querySelector("#resetButton")
const displayScoreElement = document.querySelector("#score")
const displayTimerElement = document.querySelector("#timer")
const displayMessageElement = document.querySelector("#message")
const gameAreaElement = document.querySelector(".game")
const characterElement = document.getElementById("character")
const fallingElement = document.getElementById("fallingObject")

/*-------------------------------- Functions --------------------------------*/

function init() {
    if(timer === 30){
    characterElement.classList.remove("hidden")
    fallingElement.classList.remove("hidden")
    fallingElement.style.left = Math.random() * 370 + 'px';
    fallingElement.style.top = '0px'
    fallingInterval = setInterval(objectMovement, fallingSpeed);
    time()
    }
}
function objectMovement() {
    let objectTop = parseInt(fallingElement.style.top);
    objectTop += fallingSpeed;
    fallingElement.style.top = objectTop + 'px';
    if (objectTop > 335 && objectTop < 800 && parseInt(fallingElement.style.left) > characterPosition - 50 && 
        parseInt(fallingElement.style.left) < characterPosition + 80) {
        score++;
        displayScoreElement.innerText = 'Score: ' + score;
        resetObject();
    }
    if (objectTop > 335) {
        resetObject();
    }
}
function resetObject() {
    fallingElement.style.top = '0px';
    fallingElement.style.left = Math.random() * 370 + 'px';
}
function GameOver(){
    if (timer === 0){
        resetGame()
    }
}
function checkForWinner(){
    if( score > 15){
        winner = true
        displayMessageElement.innerText = "Congratulations! You won the game!"
    }
    else if(timer === 0 && score < 15){
        displayMessageElement.innerText = "Game Over! Better luck next time!"
    }
}
function time(){
    timeInterval = setInterval(() => {
        timer--
        displayTimerElement.textContent = "Timer: " + timer
        if (timer <= 0){
            clearInterval(timeInterval)
        }
    },1000)
}
function resetGame(){
    timer = 30
    clearInterval(timeInterval)
    clearInterval(fallingInterval)
    characterElement.classList.add("hidden")
    fallingElement.classList.add("hidden")
}
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && characterPosition > 90) {
        characterPosition -= 30;
        characterElement.style.left = characterPosition + 'px';
    } else if (event.key === 'ArrowRight' && characterPosition < 600) {
        characterPosition += 30;
        characterElement.style.left = characterPosition + 'px';
    }
});
startButtonElement.addEventListener("click",init)
restButtonElement.addEventListener("click",resetGame)
