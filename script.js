//DOM ELEMENTS

const boxPlayer1 = document.getElementById("box-player1")
const boxPlayer2 = document.getElementById("box-player2")
const namePlayer1 = document.getElementById("name-player1")
const namePlayer2 = document.getElementById("name-player2")
const dotPlayer1 = document.getElementById("dot-player1")
const dotPlayer2 = document.getElementById("dot-player2")
const roundPlayer1 = document.getElementById("round-player1")
const roundPlayer2 = document.getElementById("round-player2")
const globalPlayer1 = document.getElementById("global-player1")
const globalPlayer2 = document.getElementById("global-player2")
const newGameButton = document.getElementById("new-game-button")
const rollDiceButton = document.getElementById("roll-dice-button")
const holdButton = document.getElementById("hold-button")
const diceFaces = document.getElementById("dice").children


// GLOBAL VARIABLES

const maxScore = 10
let round = 0
let player1 = {string: "Player 1", score : 0, box: boxPlayer1, dot: dotPlayer1, nameDisplay: namePlayer1, roundDisplay: roundPlayer1, globalDisplay: globalPlayer1}
let player2 = {string: "Player 2", score : 0, box: boxPlayer2, dot: dotPlayer2, nameDisplay: namePlayer2, roundDisplay: roundPlayer2, globalDisplay: globalPlayer2}
let activePlayer = player1


//FUNCTIONS

//removes the active player features, switch players then set the active player features
function switchPlayer () {
    activePlayer.box.classList.remove("active")
    activePlayer.nameDisplay.classList.remove("font-light")
    activePlayer.dot.classList.add("hidden")
    activePlayer === player1 ? activePlayer = player2 : activePlayer = player1 
    activePlayer.box.classList.add("active")
    activePlayer.nameDisplay.classList.add("font-light")
    activePlayer.dot.classList.remove("hidden")
}

//displays message, say which player won, offer a new game
function youLose () {
  alert("Dommage, " + activePlayer.string + ", vous avez perdu")
  newGame()
}

//displays message, say which player won, offer a new game
function youWin () {
  alert("Félicitations, " + activePlayer.string + " vous gagnez la partie")
  newGame()

}

//sets all scores to zero
function newGame () {
  round = 0
  player1.score = 0
  player2.score = 0
  refreshDisplay(player1, "roundDisplay", 0)
  refreshDisplay(player2, "roundDisplay", 0)
  refreshDisplay(player1, "globalDisplay", 0)
  refreshDisplay(player2, "globalDisplay", 0)
  if (activePlayer === player2) {
    switchPlayer()
  }
}

//generates a random dice throw
function getDiceResult () {
  return Math.floor(Math.random() * 6 + 1)
} 

//picks the right face according to the dice result
function pickFace (elementCollection, result) {
  for (let i = 0; i < elementCollection.length; i++) {
    elementCollection[i].classList.add("hidden")
  }
  let newFace = elementCollection[result-1]
  newFace.classList.remove("hidden")
}

//adds the result to the player's round, check if the player loses
function rollDice (player) {
  let result = getDiceResult()
  pickFace(diceFaces, result)
  if (result === 1) {
    youLose()
    return 
  } 
  round += result
  refreshDisplay(player, "roundDisplay", round )
}

//adds the round score to the global score, sets round to 0, refreshes both displays with the new content
//switches players
function hold (player) {
  player.score += round
  round = 0
  refreshDisplay(player, "globalDisplay", player.score)
  refreshDisplay(player, "roundDisplay", 0)

  if (player.score >= maxScore) {
    youWin()
    return
  }
  switchPlayer()
}

//refreshes the content of the DOM element with given content
function refreshDisplay (player, property, content) {
  player[property].innerText = content
}

rollDiceButton.addEventListener("click", ()=>{rollDice(activePlayer)})
holdButton.addEventListener("click", ()=>{hold(activePlayer)})
newGameButton.addEventListener("click", ()=>{newGame()})