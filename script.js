//DOM elements
const boxPlayer1 = document.getElementById("boxPlayer1")
const boxPlayer2 = document.getElementById("boxPlayer2")
const roundPlayer1 = document.getElementById("roundPlayer1")
const roundPlayer2 = document.getElementById("roundPlayer2")
const globalPlayer1 = document.getElementById("globalPlayer1")
const globalPlayer2 = document.getElementById("globalPlayer2")
const newGameButton = document.getElementById("newGameButton")
const diceResult = document.getElementById("dice")
const rollDiceButton = document.getElementById("rollDiceButton")
const holdButton = document.getElementById("holdButton")

let round = 0
let player1 = {string: "Player1", score : 0, box: boxPlayer1, roundDisplay: roundPlayer1, globalDisplay: globalPlayer1}
let player2 = {string: "Player2", score : 0, box: boxPlayer2, roundDisplay: roundPlayer2, globalDisplay: globalPlayer2}
let activePlayer = player1

//DOM elements


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
  round = 0
  player1.score = 0
  player2.score = 0
  refreshDisplay(player1, "roundDisplay", 0)
  refreshDisplay(player2, "roundDisplay", 0)
  refreshDisplay(player1, "globalDisplay", 0)
  refreshDisplay(player2, "globalDisplay", 0)
}

function getDiceResult () {
  return Math.floor(Math.random() * 6 + 1)
} 

function throwDice (player) {
  result = getDiceResult()
  diceResult.innerText = result
  if (result === 1) {
    youLose() 
  } 
  round += result
  //player["roundDisplay"].innerText = round
  refreshDisplay(player, "roundDisplay", round )
  console.log(result + " " + round)
}

function hold (player) {
  player.score += round
  round = 0
  refreshDisplay(player, "globalDisplay", player.score)
  refreshDisplay(player, "roundDisplay", 0)

  //player.globalDisplay.innerText = player.score
  if (player.score >= 20) {
    youWin()
    return
  }
  
  switchPlayer()
}

function refreshDisplay (player, property, content) {
  player[property].innerText = content
}



//startGame()
rollDiceButton.addEventListener("click", ()=>{throwDice(activePlayer)})
holdButton.addEventListener("click", ()=>{hold(activePlayer)})
newGameButton.addEventListener("click", ()=>{newGame()})