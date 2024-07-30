const fs = require('fs')


const INPUT = './inputFiles/input4.txt'
const file = fs.readFileSync(INPUT, { encoding: 'utf8' })
const lines = file.split('\n')

let totalPoints = 0

for (const line of lines) {
  const points = calculateCardPoints(line)
  console.log('points @ ', points)
  break
}

function calculateCardPoints(line) {
  const re = /Card\s+\d+:\s*((?:\d{1,2}\s+){10})\s*\|\s*((?:\d{1,2}\s*)+)/
  const match = line.match(re)

  const winningNumbers = match[1].trim().split(/\s+/)
  const givenNumbers = match[2].trim().split(/\s+/)
  console.log('winningNumbers @ ', winningNumbers)
  console.log('givenNumbers @ ', givenNumbers)
  
  return 0
}
