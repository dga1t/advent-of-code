const headers = { 'Cookie': 'session=53616c7465645f5fd7a2dd59d16426f3534295a5bdad47408453c2ccc9fa21e277f091b1d7801865793f7f5c1e44a615ad03b907993639cafe40c07c1a99ec69'}

let response = await fetch('https://adventofcode.com/2023/day/7/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

const cardRank = {
  'A': 13,
  'K': 12,
  'Q': 11,
  'T': 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
  'J': 0  // J is weakest now
}

const handTypes = {
  fiveOfKind: [],
  fourOfKind: [],
  fullHouse: [],
  threeOfKind: [],
  twoPair: [],
  onePair: [],
  highCard: []  
}

populateHandTypeArrays(inputs)

for (const hands in handTypes) {
  sortHandsOfSameType(handTypes[hands])
}

let allHandsSorted = []
for (const hands in handTypes) {
  allHandsSorted.push(...handTypes[hands])
}
console.log('allHandsSorted length --- ', allHandsSorted.length)

const result = calculateTotalWinnings(allHandsSorted)
console.log('result --- ', result)

function populateHandTypeArrays(inputs) {
  // const test = inputs.slice(0, 10)
  // console.log('test --- ', test)
  
  for (const hand of inputs) {
    const cards = hand.match(/([A-Z2-9]{5})/)[0]
    // console.log('cards in hand --- ', cards)
    // console.log('cards in hand length --- ', cards.length)
    
    if (isFiveOfAKind(cards)) {
      handTypes.fiveOfKind.push(hand)
      continue
    }
    if (isFourOfAKind(cards)) {
      handTypes.fourOfKind.push(hand)
      continue
    }
    if (isFullHouse(cards)) {
      handTypes.fullHouse.push(hand)
      continue
    }
    if (isThreeOfAKind(cards)) {
      handTypes.threeOfKind.push(hand)
      continue
    }
    if (isTwoPair(cards)) {
      handTypes.twoPair.push(hand)
      continue
    }
    if (isOnePair(cards)) {
      handTypes.onePair.push(hand)
      continue
    }
    if (isHighCard(cards)) handTypes.highCard.push(hand)
  }
}

// console.log('fiveOfKind arr === ', handTypes.fiveOfKind)
// console.log('fourOfKind arr === ', handTypes.fourOfKind)
// console.log('fullHouse arr === ', handTypes.fullHouse)
// console.log('threeOfKind arr === ', handTypes.threeOfKind)
// console.log('twoPair arr === ', handTypes.twoPair)
// console.log('onePair arr === ', handTypes.onePair)
// console.log('highCard arr === ', handTypes.highCard)

function sortHandsOfSameType(hands) {
  hands.sort(compareHands)
}

function compareHands(hand1, hand2) {
  for (let i = 0; i < hand1.length; i++) {
    const rank1 = cardRank[hand1[i]]
    const rank2 = cardRank[hand2[i]]

    if (rank1 > rank2) return -1  // hand1 is stronger
    if (rank1 < rank2) return 1   // hand2 is stronger
  }
  return 0  // hands are identical in strength
}

function countCards(hand) {
  const counts = {}
  for (const card of hand) {
    counts[card] = (counts[card] || 0) + 1
  }
  return counts
}

function isFiveOfAKind(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]  // ignore J when counting other cards

  for (const card in counts) {
    if (counts[card] + jCount >= 5) {
      return true
    }
  }
  return jCount === 5  // all Js are five of a kind
}

function isFourOfAKind(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]

  for (const card in counts) {
    if (counts[card] + jCount >= 4) {
      return true
    }
  }
  return false
}

function isFullHouse(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]

  const sortedCounts = Object.values(counts).sort((a, b) => b - a)
  if (sortedCounts.length >= 2) {
    const threeCount = sortedCounts[0]
    const twoCount = sortedCounts[1]
    return threeCount + jCount >= 3 && twoCount + (jCount - Math.max(0, 3 - threeCount)) >= 2
  }
  return false
}

function isThreeOfAKind(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]

  for (const card in counts) {
    if (counts[card] + jCount >= 3) {
      return true
    }
  }
  return false
}

function isTwoPair(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]

  const sortedCounts = Object.values(counts).sort((a, b) => b - a)
  if (sortedCounts.length >= 2) {
    const firstPair = sortedCounts[0]
    const secondPair = sortedCounts[1]
    return firstPair + jCount >= 2 && secondPair + (jCount - Math.max(0, 2 - firstPair)) >= 2
  }
  return false
}

function isOnePair(hand) {
  const counts = countCards(hand)
  const jCount = counts["J"] || 0
  delete counts["J"]

  for (const card in counts) {
    if (counts[card] + jCount >= 2) {
      return true
    }
  }
  return false
}

function isHighCard(hand) {
  const counts = countCards(hand)
  return Object.keys(counts).length === 5 && !counts["J"]  // no wildcards and distinct cards
}

function calculateTotalWinnings(hands) {
  hands.reverse() // hands are sorted from strongest to weakest, so we need to reverse em
  let totalWinnings = 0
  for (let i = 0; i < hands.length; i++) {
    const bid = hands[i].match(/[A-Z2-9]{5} (\d+)/)[1]  
    totalWinnings += parseInt(bid) * (i + 1)
  }
  return totalWinnings
}
