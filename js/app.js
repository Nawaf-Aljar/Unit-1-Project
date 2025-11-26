
/*-------------------------------- Constants --------------------------------*/

const messages = [
    "You got this! Stay focused and catch them all!",
    "Speed and skill — show what you can do!",
    "Believe in your reflexes! Go for that high score!",
    "Stay sharp! Every point counts!",
    "You're unstoppable — keep moving!"
]

/*---------------------------- Variables (state) ----------------------------*/

let timer = 30
let timeInterval
let score = 0
let winner = false
let characterPosition = 340
let fallingSpeed = 1.5
let negativeFallingSpeed = 1
let fallingInterval
let gameLive = false

/*------------------------ Cached Element References ------------------------*/

const ButtonElement = document.querySelector("#button")
const displayScoreElement = document.querySelector("#score")
const displayTimerElement = document.querySelector("#timer")
const displayMessageElement = document.querySelector("#message")
const characterElement = document.getElementById("character")
const fallingElement = document.getElementById("fallingObject")
const negativeFallingElement = document.getElementById("negativeFallingObject")

/*-------------------------------- Functions --------------------------------*/

function init() {
    if(timer === 30){
        gameLive = true
        ButtonElement.innerText = "Reset Game"
        characterElement.classList.remove("hidden")
        fallingElement.classList.remove("hidden")
        negativeFallingElement.classList.remove("hidden")
        fallingElement.style.left = Math.random() * 400 + 'px';
        fallingElement.style.top = '0px'
        negativeFallingElement.style.left = Math.random() * 400 + 'px';
        negativeFallingElement.style.top = '0px'
        fallingInterval = setInterval(objectMovement, fallingSpeed)
        setTimeout(() => {negativeFallingElement.style.top = "0px"}, 700)
        displayScoreElement.innerText = 'Score: ' + score
        displayTimerElement.textContent = "Timer: " + timer
        time()
        GameOver()
        messageDisplay()
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
        spawnObject(fallingElement);
    }
    if (objectTop > 335) {
        spawnObject(fallingElement);
    }
    let negativeObjectTop = parseInt(negativeFallingElement.style.top);
    negativeObjectTop+= negativeFallingSpeed;
    negativeFallingElement.style.top = negativeObjectTop + 'px';
    if (negativeObjectTop > 335 && negativeObjectTop < 800 && parseInt(negativeFallingElement.style.left) > characterPosition - 50 && 
        parseInt(negativeFallingElement.style.left) < characterPosition + 80) {
        score--;
        displayScoreElement.innerText = 'Score: ' + score;
        spawnObject(negativeFallingElement);
    }
    if (negativeObjectTop > 335) {
        spawnObject(negativeFallingElement);
    }
}
function spawnObject(obj) {
    obj.style.top = '0px';
    let positionOne = null;
    let positionTwo = null;
    positionOne = Math.floor(Math.random() * 400);
    do {
        positionTwo = Math.floor(Math.random() * 400);
    } while(positionTwo > positionOne +50 || positionTwo < positionOne -50);
    obj.style.left = positionOne + "px"
}
function GameOver(){
    if (timer <= 0){
        checkForWinner()
    characterElement.classList.add("hidden")
    fallingElement.classList.add("hidden")
    }
}
function checkForWinner(){
    if(score >= 15){
        winner = true
        displayMessageElement.innerText = "Congratulations! You won the game!"
    }
    else if(score < 15){
        displayMessageElement.innerText = "Game Over! Better luck next time!"
    }
}
function time(){
    timeInterval = setInterval(() => {
        timer--
        displayTimerElement.textContent = "Timer: " + timer
        if (timer <= 0){
            clearInterval(timeInterval)
            clearInterval(fallingInterval)
            checkForWinner()
        }
    },1000)
}
function resetGame(){
    gameLive = false
    timer = 30
    score = 0
    clearInterval(timeInterval)
    clearInterval(fallingInterval)
    characterElement.classList.add("hidden")
    fallingElement.classList.add("hidden")
    negativeFallingElement.classList.add("hidden")
    displayTimerElement.innerText = " "
    displayScoreElement.innerText = " "
    displayMessageElement.innerHTML = "Welcome to Object Dropper!<br>Catch the falling objects, avoid the bad ones, and race against the clock.<br>Press Start Game to begin!"
    ButtonElement.innerText = "Start Game"
}
function messageDisplay(){
    const randomMessage = Math.floor(Math.random()* messages.length)
    displayMessageElement.innerText = messages[randomMessage]
}

/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && characterPosition > 90) {
        characterPosition -= 35;
        characterElement.style.left = characterPosition + 'px';
    } else if (event.key === 'ArrowRight' && characterPosition < 600) {
        characterPosition += 35;
        characterElement.style.left = characterPosition + 'px';
    }
});
ButtonElement.addEventListener("click", () =>{
    if (gameLive === false){
        init()
    }
    else{
        resetGame()
    }
})