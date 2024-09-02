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
  almanac[curAlmanacKey].push(inputs[i])
}

// console.log('almanac === ', almanac)

// Each line within a map contains three numbers:
// the destination range start, the source range start, and the range length.
// Any source numbers that aren't mapped correspond to the same destination number.

// Find the lowest location number that corresponds to any of the initial seeds.

function mapSourceToDestNum(curNum, dest, source, range) {
  // if num is out of source range then the dest num is the same 
  if (curNum < source || curNum > source + range) {
    return curNum
  }
  const diff = curNum - source
  return dest + diff
}

let lowestLocation = Infinity

function findLowestLocationNum() {
  let curNumToMap = 0
  for (const seedNum of seeds) {
    curNumToMap = parseInt(seedNum)
    for (const map in almanac) {
      console.log('map --- ', map)
      // console.log('almanac[map] --- ',almanac[map])
      
      // pick lowest dest num from each map ??
      let curLowestMapNum = Infinity
      for (const nums of almanac[map]) {
        // console.log('nums --- ', nums)
        const [dest, source, range] = nums.split(' ').map(str => parseInt(str))
        const destNum = mapSourceToDestNum(curNumToMap, dest, source, range)
        if (destNum < curLowestMapNum) curLowestMapNum = destNum 
        // console.log('curLowestMapNum --- ', curLowestMapNum)
      }
      curNumToMap = curLowestMapNum
      console.log('curNumToMap 1 --- ', curNumToMap)
      console.log('typeof curNumToMap 1 --- ', typeof curNumToMap)
    }
    if (curNumToMap < lowestLocation) {
      console.log('curNumToMap 2 --- ', curNumToMap)
      lowestLocation = curNumToMap
    }
    
    console.log('lowestLocation --- ', lowestLocation)
  }
}

findLowestLocationNum()

