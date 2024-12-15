const headers = { 'Cookie': 'session=53616c7465645f5fd7a2dd59d16426f3534295a5bdad47408453c2ccc9fa21e277f091b1d7801865793f7f5c1e44a615ad03b907993639cafe40c07c1a99ec69'}

let response = await fetch('https://adventofcode.com/2023/day/8/input', { headers })
let txt = await response.text()
let inputs = txt.trim().split('\n')
// console.log('inputs --- ', inputs)
// console.log('inputs.length--- ', inputs.length)

const moves = inputs[0]
const nodes = inputs.slice(2)
// console.log('moves ---', moves)
// console.log('moves.length ---', moves.length)
// console.log('nodes ---', nodes)
// console.log('nodes.length ---', nodes.length)

const nodesMap = getNodesMap(nodes)
// console.log('nodesMap ---', nodesMap)

const partOneResult = followMoves(nodesMap, moves)
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

function followMoves(nodesMap, moves) {
  let steps = 0
  let current = 'AAA'
  
  while (current != 'ZZZ') {
    for (const move of moves) {
      const [leftNode, rightNode] = nodesMap.get(current)
      // console.log('leftNode ---', leftNode)
      // console.log('rightNode ---', rightNode)
      current = move === 'L' ? leftNode : rightNode      
      steps++
      if (current === 'ZZZ') break
    }
  }
  return steps
}
