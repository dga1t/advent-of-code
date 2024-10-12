const headers = { 'Cookie': 'session=53616c7465645f5f19ec1723624ca1bf2d3a9d1fa3b33138a33d0fd5a744581f04ace0bf46e11952e84a6db596596bc3d087ae8c1def96b2114c4c9a3e844b23'}

let response = await fetch('https://adventofcode.com/2023/day/6/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)

const times = inputs[0].split(' ').filter(el => el.length && !isNaN(el))
const distances = inputs[1].split(' ').filter(el => el.length && !isNaN(el))

function countWaysToBeatTheRecord(time, distance) {
  let winCounter = 0
  // i - button pressed time, j - race time 
  for (let i = 0; i < parseInt(time); i++) {
    let rslt = 0
    let btnMultiplier = i === 0 ? 1 : i // should not be 0 on first iteration
    for (let j = 0; j < parseInt(time); j++) {
      if (j === 0) j = j + i  // shorten race time by the time button was pressed
      rslt += btnMultiplier * 1
    }
    if (rslt > parseInt(distance)) winCounter++
  }
  // console.log('winCounter = ', winCounter)
  return winCounter
}

let partOne = 1
for (let i = 0; i < times.length; i++) {
  partOne *= countWaysToBeatTheRecord(times[i], distances[i])
}
console.log('partOne = ', partOne)
