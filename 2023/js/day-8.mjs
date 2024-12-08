const headers = { 'Cookie': 'session=53616c7465645f5fd7a2dd59d16426f3534295a5bdad47408453c2ccc9fa21e277f091b1d7801865793f7f5c1e44a615ad03b907993639cafe40c07c1a99ec69'}

let response = await fetch('https://adventofcode.com/2023/day/8/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)
// console.log('inputs.length--- ', inputs.length)

const instructions = inputs[0]
const nodes = inputs.slice(2)
// console.log('instructions ---', instructions)
// console.log('instructions.length ---', instructions.length)
// console.log('nodes ---', nodes)
// console.log('nodes.length ---', nodes.length)

const nodesMap = getNodesMap(nodes)
// console.log('nodesMap ---', nodesMap)

const partOneResult = followInstructions(nodesMap, instructions)
console.log('partOneResult ---', partOneResult)

function getNodesMap(nodes) {
  const re = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/
  const rslt = new Map()
  for (const node of nodes) {
    const [full, parentNode, leftNode, rightNode] = node.match(re)
    rslt.set(parentNode, [leftNode, rightNode])
  }
  return rslt
}

function followInstructions(nodesMap, instructions) {
  let stepsCounter = 0
  let curParentNode = nodesMap.entries().next().value[0]  // starting with the first node
  // console.log('starting parentNode ===', curParentNode)
  
  for (let i = 0; i < instructions.length; i++) {
    stepsCounter++
    const [leftNode, rightNode] = nodesMap.get(curParentNode)
    // console.log('leftNode ---', leftNode)
    // console.log('rightNode ---', rightNode)
    
    curParentNode = instructions[i] === 'L' ? leftNode : rightNode
    // console.log('curParentNode ---', curParentNode)
    
    if (curParentNode === 'ZZZ') {
      console.info('*** found ZZZ!!1 ***')
      return stepsCounter
    }
    
    if (i === instructions.length - 1) {
      console.log('stepsCounter ---', stepsCounter)
      console.info('*** starting from the beginning of instructions again oO ***')
      i = 0
    }
  }
  
  console.info('*** did not find ZZZ :( ***')
  return stepsCounter
}

