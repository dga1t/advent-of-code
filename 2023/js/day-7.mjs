const headers = { 'Cookie': 'session=53616c7465645f5f19ec1723624ca1bf2d3a9d1fa3b33138a33d0fd5a744581f04ace0bf46e11952e84a6db596596bc3d087ae8c1def96b2114c4c9a3e844b23'}

let response = await fetch('https://adventofcode.com/2023/day/7/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

// Hands strength:
// Five of a kind
// Four of a kind
// Full house
// Three of a kind
// Two pair
// High card

const sortedHands = orderHandsByStrength(inputs)
// console.log('sortedHands --- ', sortedHands)

function orderHandsByStrength(inputs) {
  const result = []
  
  for (const hand of inputs) {
    const cards = hand.match(/([A-Z2-9]{5})/)[0]
    console.log('cards --- ', cards)
  }
}
