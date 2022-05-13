let global, round

function getDiceThrow () {
  return Math.floor(Math.random() * 6 + 1)
} 

for(let i = 0; i < 10; i++) {
  console.log(getDiceThrow())
}
