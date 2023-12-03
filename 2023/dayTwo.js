const fs = require('fs');
const events = require('events');
const readline = require('readline');

const bag = {
  red: 12,
  green: 13,
  blue: 14
}

async function dayTwo() {
  const rl = readline.createInterface({
    input: fs.createReadStream('input2.txt'),
    crlfDelay: Infinity
  });
  
  let resultPart1 = 0
  let resultPart2 = 0

  rl.on('line', (line) => {
    
    const gameId = line.split(':').shift().match(/([0-9]{1,3})/)[0]    
    const isValid = checkValidGame(line)    
    if (isValid) resultPart1 += parseInt(gameId)

    const powerOfMinSet = getPowerOfMinimumSet(line)
    resultPart2 += powerOfMinSet
  });
  
  await events.once(rl, 'close');

  console.log('resultPart1: ', resultPart1)
  console.log('resultPart2: ', resultPart2)
  
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

// Part 1
function checkValidGame(line) {
  const gameSets = line.split(':').pop().split(';')
  
  for (const subSet of gameSets) {
    const cubesInSubSet = subSet.split(',')

    for (const cube of cubesInSubSet) {
      if (cube.includes('red')) {
        const num = cube.match(/([0-9]{1,2})/)[0]
        if (num <= bag.red) continue
        else return false
      }
      if (cube.includes('green')) {
        const num = cube.match(/([0-9]{1,2})/)[0]
        if (num <= bag.green) continue
        else return false
      }
      if (cube.includes('blue')) {
        const num = cube.match(/([0-9]{1,2})/)[0]
        if (num <= bag.blue) continue
        else return false
      }
    }
  }
  return true
}

// Part 2
function getPowerOfMinimumSet(line) {
  let redMin = 0
  let greenMin = 0
  let blueMin = 0
  
  const gameSets = line.split(':').pop().split(';')
  
  for (const subSet of gameSets) {
    const cubesInSubSet = subSet.split(',')
    
    for (const cube of cubesInSubSet) {
      if (cube.includes('red')) {
        const num = parseInt(cube.match(/([0-9]{1,2})/)[0])
        if (num > redMin) redMin = num
      }
      if (cube.includes('green')) {
        const num = parseInt(cube.match(/([0-9]{1,2})/)[0])
        if (num > greenMin) greenMin = num
      }
      if (cube.includes('blue')) {
        const num = parseInt(cube.match(/([0-9]{1,2})/)[0])
        if (num > blueMin) blueMin = num
      }
    }
  }
  return redMin * greenMin * blueMin
}

dayTwo().catch(err => console.log('error while running dayTwo: ', err))