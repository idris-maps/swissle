import { cantons } from './cantons.ts'

const cities: string[] = JSON.parse(await Deno.readTextFile('cities.json'))

const skip = cantons.reduce((r: string[], d) => ([...r, d.capital.de, d.capital.fr, d.capital.local]), [])

const data = cities.filter(d => !skip.includes(d)).sort()

console.log(`
export const cities = ${JSON.stringify(data, null, 2)}
`)