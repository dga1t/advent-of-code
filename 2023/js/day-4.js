const fs = require('fs')


const INPUT = './2023/js/inputFiles/input4.txt'
const file = fs.readFileSync(INPUT, { encoding: 'utf8' })
const lines = file.split('\n')

lines.pop() // pop last empty line

let totalPoints = 0 // part 1 result
let totalCards = 1  // part 2 result

// part 2 vars
// they r mutated
let currentCardNum = 1
let cardCounter = { 1: 1 }

for (const line of lines) {
  const [winningNums, givenNums] = splitCardNumbers(line)
  // console.log('winningNums @ ', winningNums)
  // console.log('givenNums @ ', givenNums)
  
  const points = calculatePoints(winningNums, givenNums)
  // console.log('points @ ', points)
  totalPoints+=points
  
  const cards = countScratchcards(winningNums, givenNums)
  if (cards > 0) console.log('total cards @ ', cards)
  // if (currentCardNum === 3) break   // 4 testing
  
}

console.log('total points @ ', totalPoints)

function splitCardNumbers(line) {
  const re = /Card\s+\d+:\s*((?:\d{1,2}\s+){10})\s*\|\s*((?:\d{1,2}\s*)+)/
  const match = line.match(re)
  
  const winningNums = match[1].trim().split(/\s+/)
  const givenNums = match[2].trim().split(/\s+/)
  
  return [winningNums, givenNums]
}

// part 1 func
function calculatePoints(winningNums, givenNums) {
  let points = 0
  for (const winningNum of winningNums) {
    for (const givenNum of givenNums) {
      if (winningNum === givenNum) {
        if (points === 0) points++
        else points = points * 2
      }
    }
  }
  return points
}

// part 2 func
function countScratchcards(winningNums, givenNums) {
  let cards = 0
  let winningNumsCounter = 0
  
  for (const winningNum of winningNums) {
    for (const givenNum of givenNums) {
      if (winningNum === givenNum) winningNumsCounter++
    }
  }
  
  // console.log('winningNumsCounter @', winningNumsCounter)
  
  for (let i = 1; i <= winningNumsCounter; i++) {
    const key = currentCardNum + i
    const curValue = cardCounter[key]
    const newValue = curValue ? curValue + 1 : 1
    Object.assign(cardCounter, { [key]: newValue })
    
    // TODO - check the end of the table and don't add cards past it ??
  }
  
  if (lines.length === currentCardNum) {
    // calculate total cards (and reutrn the result ?)
    cards = Object.values(cardCounter).reduce((a, b) => a + b, 0)
    
    return cards
    // console.log('currentCardNum @ ', currentCardNum)
    // console.log('cardCounter @ ', cardCounter)
  }
  
  currentCardNum++
  
  return 0
}
