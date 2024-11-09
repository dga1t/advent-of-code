const headers = { 'Cookie': 'session=53616c7465645f5fd7a2dd59d16426f3534295a5bdad47408453c2ccc9fa21e277f091b1d7801865793f7f5c1e44a615ad03b907993639cafe40c07c1a99ec69'}

let response = await fetch('https://adventofcode.com/2023/day/7/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)
 
const cardRank = {
  'A': 13,
  'K': 12,
  'Q': 11,
  'J': 10,
  'T': 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1
}

// Hand type arrays ordered by their strength desc:
let fiveOfKind = []
let fourOfKind = []
let fullHouse = []
let threeOfKind = []
let twoPair = []
let onePair = []
let highCard = []

populateHandTypeArrays(inputs)

// TODO - run sortHandsOfSameType on each hand type arr (create a single obj ??)

function populateHandTypeArrays(inputs) {
  // const test = inputs.slice(0, 3)
  // console.log('test --- ', test)
  
  for (const hand of inputs) {
    const cards = hand.match(/([A-Z2-9]{5})/)[0]
    // console.log('cards in hand --- ', cards)
    // console.log('cards in hand length --- ', cards.length)
    
    if (isFiveOfAKind(cards)) {
      fiveOfKind.push(hand)
      continue
    }
    if (isFourOfAKind(cards)) {
      fourOfKind.push(hand)
      continue
    }
    if (isFullHouse(cards)) {
      fullHouse.push(hand)
      continue
    }
    if (isThreeOfAKind(cards)) {
      threeOfKind.push(hand)
      continue
    }
    if (isTwoPair(cards)) {
      twoPair.push(hand)
      continue
    }
    if (isOnePair(cards)) {
      onePair.push(hand)
      continue
    }
    if (isHighCard(cards)) highCard.push(hand)
    
  }
}

console.log('fiveOfKind arr === ', fiveOfKind)
console.log('fourOfKind arr === ', fourOfKind)
console.log('fullHouse arr === ', fullHouse)
// console.log('threeOfKind arr === ', threeOfKind)
// console.log('twoPair arr === ', twoPair)
// console.log('onePair arr === ', onePair)
// console.log('highCard arr === ', highCard)

function sortHandsOfSameType(hands) {
  hands.sort(compareHands)
}

function compareHands(hand1, hand2) {
  for (let i = 0; i < hand1.length; i++) {
    if (cardRank[hand1[i]] > cardRank[hand2[i]]) return -1
    if (cardRank[hand1[i]] < cardRank[hand2[i]]) return 1
  }
  return 0  // hands are identical in strength
}

function getCardCounts(hand) {
  const counts = {}
  for (const card of hand) {
    counts[card] = (counts[card] || 0) + 1
  }
  return Object.values(counts).sort((a, b) => b - a)
}

function isFiveOfAKind(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 5
}

function isFourOfAKind(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 4 && counts[1] === 1
}

function isFullHouse(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 3 && counts[1] === 2
}

function isThreeOfAKind(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 3 && counts[1] === 1 && counts[2] === 1
}

function isTwoPair(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 2 && counts[1] === 2 && counts[2] === 1
}

function isOnePair(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 2 && counts[1] === 1 && counts[2] === 1 && counts[3] === 1
}

function isHighCard(hand) {
  const counts = getCardCounts(hand)
  return counts[0] === 1 && counts.length === 5
}
