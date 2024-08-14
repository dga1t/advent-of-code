const headers = { 'Cookie': 'session=53616c7465645f5feaeaca0de6413a3502ea86f79285584e1ffa5d1094fedb13c1963766789c1a04f962954f9866cfb73457d6b2e746e8fe04bfd29cf73e3b65'}

let response = await fetch('https://adventofcode.com/2023/day/4/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')

let answerPart1 = 0
let answerPart2 = 0

//for part 2 - [amount of cards, winningNums]
let cards = []

function part1() {
  inputs.forEach(input => {
  
    // build arrays
    let myNums = []
    let winningNums = []
    for (var i = 0; i < 10; i++) myNums.push(input.substr(10 + i * 3, 2).trim())
    for (var i = 0; i < 25; i++) winningNums.push(input.substr(42 + i * 3, 2).trim())

    let value = 0.5
    //for part 2
    let matches = 0

    myNums.forEach(num => {
      if (winningNums.includes(num)) {
        value *= 2
        matches++
      }
    })
    cards.push([1, matches])
    
    answerPart1 += Math.floor(value)
  })
  return answerPart1
}

function part2() {
  let something = 0
  //for each card
  for (var i = 0; i < cards.length; i++) {
    //add current card amount to answer
    answerPart2 += cards[i][0]

    //distribute winnings to next cards
    for (var j = 1; j <= cards[i][1]; j++) {
      cards[i + j][0] = cards[i + j][0] + 1 * cards[i][0]
    }
  }
  return answerPart2
}

console.log('part1 answer = ', part1())
console.log('part2 answer = ', part2())