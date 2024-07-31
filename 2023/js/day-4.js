const fs = require('fs')


const INPUT = './inputFiles/input4.txt'
const file = fs.readFileSync(INPUT, { encoding: 'utf8' })
const lines = file.split('\n')

lines.pop() // pop last empty line

let totalPoints = 0

for (const line of lines) {
  const [winningNumbers, givenNumbers] = splitCardNumbers(line)
  // console.log('winningNumbers @ ', winningNumbers)
  // console.log('givenNumbers @ ', givenNumbers)
  
  const points = calculatePoints(winningNumbers, givenNumbers)
  // console.log('points @ ', points)
  totalPoints+=points
}

console.log('total points @ ', totalPoints)

function splitCardNumbers(line) {
  const re = /Card\s+\d+:\s*((?:\d{1,2}\s+){10})\s*\|\s*((?:\d{1,2}\s*)+)/
  const match = line.match(re)
  
  const winningNumbers = match[1].trim().split(/\s+/)
  const givenNumbers = match[2].trim().split(/\s+/)
  
  return [winningNumbers, givenNumbers]
}

function calculatePoints(winningNumbers, givenNumbers) {
  let points = 0
  for (const winningNum of winningNumbers) {
    for (const givenNum of givenNumbers) {
      if (winningNum === givenNum) {
        if (points === 0) points++
        else points = points * 2
      }
    }
  }
  return points
}
