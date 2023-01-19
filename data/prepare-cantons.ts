import { wiki } from './wiki.ts'
import { getNeighbors } from './get-neighbors.ts'
import { getPath } from './get-path.ts'
import { getProps } from './get-props.ts'

const withProps = wiki.map(d => ({ ...getProps(d.id), ...d }))
const data = withProps.map(d => ({
  area: d.area,
  capital: d.capital,
  maxHeight: d.maxHeight,
  name: d.name,
  neighbors: getNeighbors(withProps, d),
  path: getPath(d.id),
  pop: d.pop,
  year: d.year,
}))

const file = `
interface Canton {
  area: number
  capital: { de: string, fr: string, local: string }
  maxHeight: number
  name: { de: string, fr: string, local: string }
  neighbors: string[]
  path: string
  pop: number
  year: number
}

export const cantons: Canton[] = ${JSON.stringify(data, null, 2)}
`

console.log(file)