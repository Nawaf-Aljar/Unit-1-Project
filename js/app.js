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

const buttonElement = document.querySelector("#button")
const displayScoreElement = document.querySelector("#score")
const displayTimerElement = document.querySelector("#timer")
const gameAreaElement = document.querySelector(".game")
const characterElement = document.getElementById("character")
const fallingElement = document.getElementById("fallingObject")

/*-------------------------------- Functions --------------------------------*/

function init() {
    characterElement.classList.remove("hidden")
    fallingElement.classList.remove("hidden")
    fallingElement.style.left = Math.random() * 370 + 'px';
    fallingElement.style.top = '0px'
    fallingInterval = setInterval(objectMovement, fallingSpeed);
    time()
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
function checkGameOver(){

}
function checkForWinner(){
    if(timer === 0 && score === 30){
        winner = true
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
buttonElement.addEventListener("click",init)

