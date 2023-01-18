const data = require('./data.json')

const getDist = ({ center: [x1, y1] }, { center: [x2, y2] }) => {
  const a = Math.abs(x1 - x2)
  const b = Math.abs(y1 - y2)
  return Math.sqrt(a * a + b * b)
}

const getNeighbors = canton =>
  data.map(d => [d.abbrev, getDist(d, canton)])
    .sort((a, b) => a[1] > b[1] ? 1 : -1)
    .filter((d, i) => i !== 0 && i < 5)
    .map(d => d[0])


const res = JSON.stringify(data.map(d => ({
  id: d.abbrev,
  name: d.name,
  path: d.path,
  capital: d.capital,
  pop: d.pop,
  area: d.area,
  year: d.year,
  neighbors: getNeighbors(d),
})), null, 2)

console.log(`
export interface Canton {
  id: string
  name: string
  path: string
  capital: string
  pop: number
  area: number
  year: number
  neighbors: string[]
}

export const cantons: Canton[] = ${res}
`)