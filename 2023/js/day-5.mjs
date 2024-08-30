const headers = { 'Cookie': 'session=53616c7465645f5feaeaca0de6413a3502ea86f79285584e1ffa5d1094fedb13c1963766789c1a04f962954f9866cfb73457d6b2e746e8fe04bfd29cf73e3b65'}

let response = await fetch('https://adventofcode.com/2023/day/5/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

let seeds = []
let seedToSoil = []
let soliToFertilizer = []
let fertilizerToWater = []
let waterToLight = []
let lightToTemperature = []
let temperatureToHumidity = []
let humididtyToLocation = []

// prepare structured data
for (const line of inputs) {
  if (line.includes('seeds')) {
    seeds = line.slice(7).split(' ')
  }
}
console.log('seeds --- ', seeds)

