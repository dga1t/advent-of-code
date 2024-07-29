const fs = require('fs');
const events = require('events');
const readline = require('readline');


async function dayOne() {
  const rl = readline.createInterface({
    input: fs.createReadStream('input1.txt'),
    crlfDelay: Infinity
  });
  
  let result = 0

  rl.on('line', (line) => {
    const lineSum = getFirstAndLastNumberPart2(line);    
    result += parseInt(lineSum)
  });
  
  await events.once(rl, 'close');

  console.log('result: ', result)
  
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

function getFirstAndLastNumberPart1(line) {
  let first 
  let last 

  for (let i = 0; i < line.length; i++) {
    if (/^\d+$/.test(line.charAt(i))) {
      first = line.charAt(i)
      break
    }
  }

  for (let j = line.length; j >= 0; j--) {
    if (/^\d+$/.test(line.charAt(j))) {
      last = line.charAt(j)
      break
    }
  }

  return first + last
}

const convertToNumber = digitOrWord => isNaN(parseInt(digitOrWord)) ? wordToNumberMap[digitOrWord] : parseInt(digitOrWord);

const wordToNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function getFirstAndLastNumberPart2(line) {
  const numbers = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(a => a[1])

  const first = convertToNumber(numbers[0]);
  const last = convertToNumber(numbers.at(-1));

  return `${first}${last}`
}

dayOne().catch(err => console.log('error while running dayOne: ', err))