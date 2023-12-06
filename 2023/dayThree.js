const fs = require('fs')
const allAttached = []

fs.readFile('./input3.txt', 'utf8', function (e, d) {
  const lines = d.split(/\n/g)
  const allResults = []
  let total = 0

  lines.forEach((line, lineIdx) => {
    if (line === '') {
      return
    }
    const numbersOrSymbols = line.match(/(\d+)|(\D+)/g)
    const getStars = line.split('')
    const results = numbersOrSymbols.filter((part, partIdx) => {
      return partOneSolution(part, partIdx, lines, lineIdx, numbersOrSymbols)
    })
    const resultsTwo = getStars.filter((char, charIdx) => {
      return partTwoSolution(char, charIdx, lines, lineIdx, getStars)
    })
    allResults.push(results)
  })

  const allResultsAsNumbers = allResults.flat().map((n) => +n)
  total = allResultsAsNumbers.flat().reduce((t, n) => t + n)
  
  const newAttached = allAttached.filter(i => i.length === 2)
  const totalsTwo = newAttached.map(i => i[0] * i[1])
  const final = totalsTwo.reduce((t,n) => t + n)

  console.log(final)
})

function getIndexRangeOfNum(p, arr, idx) {
  const before = arr.slice(0, idx).join('')
  let start = before.length - 1
  let end = start + p.length + 2
  if (start < 0) start = 0
  return [start, end]
}

function checkSelected(line, range) {
  if (!line) {
    return
  }
  const start = line.slice(0, range[0])
  const num = line.slice(range[0], range[1])
  let hasSymbol = false
  num.split('').forEach((n) => {
    if (num.match(/\d+/) === null) {
      if (n !== '.') {
        hasSymbol = true
      }
    }
  })
  return hasSymbol
}

function extractNumberFromStringIndex(idx, string) {
  let num = []
  let prepend = []
  let append = []
  if (!string[idx].match(/\d/)) {
    return false
  } else {
    num.push(string[idx])
  }
  if (checkOffset(string, idx, -1) !== '') {
    prepend = [checkOffset(string, idx, -2), checkOffset(string, idx, -1)]
  }
  if (checkOffset(string, idx, 1) !== '') {
    append = [checkOffset(string, idx, 1), checkOffset(string, idx, 2)]
  }
  return [...prepend, ...num, ...append].join('')
}

function checkOffset(string, idx, offset) {
  if (string[idx + offset].match(/\d/)) {
    return string[idx + offset]
  } else {
    return ''
  }
}

function partTwoSolution(char, charIdx, lines, lineIdx, getStars) {
  if (char.match(/\*/) === null) {
    return false
  }
  let attachedNums = []

  const lastCharOfPrev = getStars[charIdx - 1] && getStars[charIdx - 1]
  //check for number here instead
  if (lastCharOfPrev && lastCharOfPrev.match(/\d/)) {
    const preNum = extractNumberFromStringIndex(charIdx - 1, lines[lineIdx])
    attachedNums.push(preNum)
  }
  // check if next match has a number at the beginning
  const firstCharOfNext = getStars[charIdx + 1] && getStars[charIdx + 1]
  if (firstCharOfNext && firstCharOfNext.match(/\d/)) {
    const postNum = extractNumberFromStringIndex(charIdx + 1, lines[lineIdx])
    attachedNums.push(postNum)
  }
  // calculate the idx of the start-1 and end+1 of the number
  // in line above, we need to check the character before, the index, and the
  // character after.
  // if the character directly above has a number, we should be able to skip
  // the other ones... i think
  if (lines[lineIdx - 1][charIdx].match(/\d/)) {
    const aboveNum = extractNumberFromStringIndex(charIdx, lines[lineIdx - 1])
    attachedNums.push(aboveNum)
  } else {
    if (lines[lineIdx - 1][charIdx - 1].match(/\d/)) {
      const aboveNum = extractNumberFromStringIndex(
        charIdx - 1,
        lines[lineIdx - 1]
      )
      attachedNums.push(aboveNum)
    }

    if (lines[lineIdx - 1][charIdx + 1].match(/\d/)) {
      const aboveNum = extractNumberFromStringIndex(
        charIdx + 1,
        lines[lineIdx - 1]
      )
      attachedNums.push(aboveNum)
    }
  }

  if (lines[lineIdx + 1]) {
    if (lines[lineIdx + 1][charIdx].match(/\d/)) {
      const aboveNum = extractNumberFromStringIndex(charIdx, lines[lineIdx + 1])
      attachedNums.push(aboveNum)
    } else {
      if (lines[lineIdx + 1][charIdx - 1].match(/\d/)) {
        const aboveNum = extractNumberFromStringIndex(
          charIdx - 1,
          lines[lineIdx + 1]
        )
        attachedNums.push(aboveNum)
      }
      if (lines[lineIdx + 1][charIdx + 1].match(/\d/)) {
        const aboveNum = extractNumberFromStringIndex(
          charIdx + 1,
          lines[lineIdx + 1]
        )
        attachedNums.push(aboveNum)
      }
    }
  }
  allAttached.push(attachedNums)
  return false
}

function partOneSolution(part, partIdx, lines, lineIdx, numbersOrSymbols) {
  if (part.match(/\d+/) === null) {
    return false
  }
  const lastCharOfPrev =
    numbersOrSymbols[partIdx - 1] &&
    numbersOrSymbols[partIdx - 1].charAt(
      numbersOrSymbols[partIdx - 1] && numbersOrSymbols[partIdx - 1].length - 1
    )
  if (lastCharOfPrev && lastCharOfPrev !== '.') {
    return true
  }
  // check if next match has a symbol at the beginning
  const firstCharOfNext =
    numbersOrSymbols[partIdx + 1] && numbersOrSymbols[partIdx + 1].charAt(0)
  if (firstCharOfNext && firstCharOfNext !== '.') {
    return true
  }
  // calculate the idx of the partt-1 and end+1 of the number
  const idxRange = getIndexRangeOfNum(part, numbersOrSymbols, partIdx)
  if (checkSelected(lines[lineIdx - 1], idxRange)) {
    return true
  }
  // check the line after in the index range for anything that isn't a .
  // if there's a symbol, add the number to results
  const nextRange = checkSelected(lines[lineIdx + 1], idxRange)
  if (nextRange) {
    return true
  }
  return false
}