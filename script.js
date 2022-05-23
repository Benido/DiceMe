//DOM elements
const boxPlayer1 = document.getElementById("box-player1")
const boxPlayer2 = document.getElementById("box-player2")
const roundPlayer1 = document.getElementById("round-player1")
const roundPlayer2 = document.getElementById("round-player2")
const globalPlayer1 = document.getElementById("global-player1")
const globalPlayer2 = document.getElementById("global-player2")
const newGameButton = document.getElementById("new-game-button")
const rollDiceButton = document.getElementById("roll-dice-button")
const holdButton = document.getElementById("hold-button")
const diceFaces = document.getElementById("dice").children


// global variables
let round = 0
let player1 = {string: "Player1", score : 0, box: boxPlayer1, roundDisplay: roundPlayer1, globalDisplay: globalPlayer1}
let player2 = {string: "Player2", score : 0, box: boxPlayer2, roundDisplay: roundPlayer2, globalDisplay: globalPlayer2}
let activePlayer = player1



//functions
function switchPlayer () {
    activePlayer.box.classList.remove("active")
    activePlayer === player1 ? activePlayer = player2 : activePlayer = player1 
    activePlayer.box.classList.add("active")
}

function youLose () {
  //display message, say which player won, offer a new game
  alert("Perdu !")
  newGame()
}

function youWin () {
  //display message, say which player won, offer a new game
  alert(activePlayer.string + " a gagné la partie")
  newGame()

}

function newGame () {
  //set all scores to zero
  round = 0
  player1.score = 0
  player2.score = 0
  refreshDisplay(player1, "roundDisplay", 0)
  refreshDisplay(player2, "roundDisplay", 0)
  refreshDisplay(player1, "globalDisplay", 0)
  refreshDisplay(player2, "globalDisplay", 0)
  activePlayer.box.classList.remove("active")
  activePlayer = player1
  activePlayer.box.classList.add("active")
}

function getDiceResult () {
  return Math.floor(Math.random() * 6 + 1)
} 

function pickFace (elementCollection, result) {
  for (let i = 0; i < elementCollection.length; i++) {
    elementCollection[i].classList.add("hidden")
  }
  let newFace = elementCollection[result-1]
  newFace.classList.remove("hidden")
}

function rollDice (player) {
  result = getDiceResult()
  //diceResult.innerText = result
  pickFace(diceFaces, result)
  if (result === 1) {
    youLose()
    return 
  } 
  round += result
  refreshDisplay(player, "roundDisplay", round )
}

function hold (player) {
  player.score += round
  round = 0
  refreshDisplay(player, "globalDisplay", player.score)
  refreshDisplay(player, "roundDisplay", 0)

  if (player.score >= 100) {
    youWin()
    return
  }
  
  switchPlayer()
}

function refreshDisplay (player, property, content) {
  player[property].innerText = content
}



//startGame()
rollDiceButton.addEventListener("click", ()=>{rollDice(activePlayer)})
holdButton.addEventListener("click", ()=>{hold(activePlayer)})
newGameButton.addEventListener("click", ()=>{newGame()})