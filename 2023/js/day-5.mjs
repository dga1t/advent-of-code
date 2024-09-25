const headers = { 'Cookie': 'session=53616c7465645f5f19ec1723624ca1bf2d3a9d1fa3b33138a33d0fd5a744581f04ace0bf46e11952e84a6db596596bc3d087ae8c1def96b2114c4c9a3e844b23'}

let response = await fetch('https://adventofcode.com/2023/day/5/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

const seeds = inputs.shift().slice(7).split(' ')
console.log('seeds --- ', seeds)

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

function findLowestLocation(mapInput) {  
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
  return Math.min(...mapInput)
}

// uncomment and run 4 part 1 solution
// const lowestLocation = findLowestLocation(seeds)
// console.log('lowestLocation --- ', lowestLocation)

// VEERY SLOOW - find a way to optimize
function findLowestLocationPartTwo(mapInput) {
  const lowestLocations = []
  for (let i = 0; i < mapInput.length; i+=2) {
    const seedsRangeStart = parseInt(mapInput[i])
    const seedsRangeEnd = parseInt(mapInput[i]) + parseInt(mapInput[i+1])
    const batchSize = 100000
    let seedsBatch = []
    for (let j = seedsRangeStart; j < seedsRangeEnd; j++) {
      seedsBatch.push(j)
      if (seedsBatch.length === batchSize) {
        console.log('seedsBatch.length --- ', seedsBatch.length)
        const lowestLocation = findLowestLocation(seedsBatch)
        lowestLocations.push(lowestLocation)
        seedsBatch = []
      }
    }
    if (seedsBatch.length > 0) {
      console.log('remaining seedsBatch.length --- ', seedsBatch.length)
      const lowestLocation = findLowestLocation(seedsBatch)
      lowestLocations.push(lowestLocation)      
    }
  }
  console.log('lowestLocations.length === ', lowestLocations.length)
  return Math.min(lowestLocations)
}
const lowestLocationPartTwo = findLowestLocationPartTwo(seeds)
console.log('lowestLocationPartTwo --- ', lowestLocationPartTwo)
