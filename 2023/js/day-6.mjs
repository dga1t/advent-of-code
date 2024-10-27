const headers = { 'Cookie': 'session=53616c7465645f5f19ec1723624ca1bf2d3a9d1fa3b33138a33d0fd5a744581f04ace0bf46e11952e84a6db596596bc3d087ae8c1def96b2114c4c9a3e844b23'}

let response = await fetch('https://adventofcode.com/2023/day/6/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
console.log('inputs --- ', inputs)

const times = inputs[0].split(' ').filter(el => el.length && !isNaN(el))
const distances = inputs[1].split(' ').filter(el => el.length && !isNaN(el))
// console.log('times = ', times)
// console.log('distances = ', distances)

function countWaysToBeatTheRecord(time, distance) {
  let winCounter = 0
  const parsedTime = parseInt(time, 10)
  const parsedDistance = parseInt(distance, 10)

  for (let i = 0; i < parsedTime; i++) {
    const btnMultiplier = i === 0 ? 1 : i
    const rslt = btnMultiplier * (parsedTime - i)
    if (rslt > parsedDistance) winCounter++
  }
  return winCounter
}

// uncomment to get part 1 answer
// let partOne = 1
// for (let i = 0; i < times.length; i++) {
  // partOne *= countWaysToBeatTheRecord(times[i], distances[i])
// }
// console.log('partOne = ', partOne)

// part 2
const time = inputs[0].match(/(\d+)/g).reduce((acc, cur) => acc + cur, '')
const distance = inputs[1].match(/(\d+)/g).reduce((acc, cur) => acc + cur, '')
console.log('time = ', time)
console.log('distance = ', distance)

const partTwo = countWaysToBeatTheRecord(time, distance)
console.log('partTwo = ', partTwo)