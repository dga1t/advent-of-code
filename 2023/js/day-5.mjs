const headers = { 'Cookie': 'session=53616c7465645f5feaeaca0de6413a3502ea86f79285584e1ffa5d1094fedb13c1963766789c1a04f962954f9866cfb73457d6b2e746e8fe04bfd29cf73e3b65'}

let response = await fetch('https://adventofcode.com/2023/day/5/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

const seeds = inputs.shift().slice(7).split(' ')
// console.log('seeds --- ', seeds)

const almanac = {
  seedToSoil: [],
  soliToFertilizer: [],
  fertilizerToWater: [],
  waterToLight: [],
  lightToTemperature: [],
  temperatureToHumidity: [],
  humididtyToLocation: []  
}

let curEntryIdx = -1
let almanacEntries = Object.entries(almanac)
let curAlmanacKey = null

// prepare ze almanac data struct
for (let i = 0; i < inputs.length; i++) {
  if (inputs[i] === '') continue
  if (inputs[i].includes('map')) {
    curEntryIdx++
    curAlmanacKey = almanacEntries[curEntryIdx][0]
    continue
  }
  almanac[curAlmanacKey].push(inputs[i].split(' ').map(str => parseInt(str)))
}

// console.log('almanac === ', almanac)

// Each line within a map contains three numbers:
// the destination range start, the source range start, and the range length.
// Any source numbers that aren't mapped correspond to the same destination number.
// Find the lowest location number that corresponds to any of the initial seeds.

function findLowestLocation() {
  let mapInput = seeds  // start with seed nums
  
  for (const map in almanac) {
    let destNums = []
    
    for (const input of mapInput) {
      const mappedSource = almanac[map].filter(numsGroup => input > numsGroup[1] && input < numsGroup[1] + numsGroup[2])
      
      let destNum
      if (mappedSource.length) destNum = input - mappedSource[0][1] + mappedSource[0][0]        
      else destNum = input
      
      destNums.push(destNum)
    } 
    mapInput = destNums  // upate at the end of each almanac map
  }
  const lowestLocation = Math.min(...mapInput)
  console.log('lowestLocation --- ', lowestLocation)
}

findLowestLocation()
