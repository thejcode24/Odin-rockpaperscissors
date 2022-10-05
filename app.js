// Declare variables
let userScore = 0;
let compScore = 0;
let winningScore = 5;
let gameOver = false;
const gameHands = ['r','p','s']

// DOM elements
const rock = document.querySelector("#r");
const paper = document.querySelector("#p");
const scissors = document.querySelector("#s");
const gameButtons = [rock, paper,scissors]
const resetGame = document.querySelector(".reset-game")

const userScoreDisplay = document.querySelector(".user-score")
const compScoreDisplay = document.querySelector(".comp-score")

const textDisplay = document.querySelector(".text-display")
const roundSelectionsDisplay = document.querySelector(".round-selections")

// Game Event Listener. If gameOver = false, game will run when user makes a selection.
gameButtons.forEach(function(choice, index) {
    choice.addEventListener('click', ()=> {
        switch(index) {
            case 0:
                game('r', randomComputerChoice())
                break;
            case 1:
                game('p', randomComputerChoice())
                break;
            case 2:
                game('s', randomComputerChoice())
                break;                
        }
    })
})

// Main game function
function game(userChoice, compChoice) {
    if(gameOver) return;
    playRound(userChoice, compChoice);
}

// Play a round
function playRound(userChoice, compChoice) {
    const matchUp = (userChoice + compChoice)

    switch(matchUp) {
        case "rs":
        case "pr":
        case "sp":
            userScore++
            roundResults('win', convertLetterToWord(userChoice), convertLetterToWord(compChoice))
            break;

        case "sr":
        case "rp":
        case "ps":
            compScore++
            roundResults('lose', convertLetterToWord(userChoice), convertLetterToWord(compChoice))
            break;
        default:
            roundResults('draw', convertLetterToWord(userChoice), convertLetterToWord(compChoice))
    } 
}

// Display round results
function roundResults(result, userChoice, compChoice) {

    if(result === 'win') {
        userScoreDisplay.textContent = userScore;
        roundSelectionsDisplay.textContent = `${userChoice} beats ${compChoice}`

        if(userScore === winningScore) {
            gameOver = true;
            userScoreDisplay.classList.add('won')
            textDisplay.textContent = 'Game over! You Win!'
            resetGame.classList.add('show')
        } else {
            textDisplay.textContent = 'You Win!'
        }
    } else if (result === 'lose') {
        compScoreDisplay.textContent = compScore;
        roundSelectionsDisplay.textContent = `${userChoice} loses to ${compChoice}`

        if(compScore === winningScore) {
            gameOver = true;
            compScoreDisplay.classList.add('lost')
            textDisplay.textContent = 'Game over! You lose!'
            resetGame.classList.add('show')
        } else {
            textDisplay.textContent = 'You lose'
        }
    } else if (result === 'draw') {
        textDisplay.textContent = "It's a draw!"
        roundSelectionsDisplay.textContent = `${userChoice} ties ${compChoice}`
    }
}

// Reset game button
resetGame.addEventListener('click', () => {
    gameOver = false;
    userScore = 0;
    userScoreDisplay.textContent = userScore;
    userScoreDisplay.classList.remove('won')
    compScore = 0;
    compScoreDisplay.textContent = compScore;
    compScoreDisplay.classList.remove('lost')

    textDisplay.textContent = 'Choose a hand'
    roundSelectionsDisplay.textContent = ''

})

// Get random computer hand
function randomComputerChoice() {
    let randNum = Math.floor(Math.random() * 3)
    return gameHands[randNum]
}

// Helper function
// Convert lettter to word for use with DOM
function convertLetterToWord(i) {
    if(i === 'r') return 'Rock'
    if(i === 'p') return 'Paper'
    if(i === 's') return 'Scissors'
}