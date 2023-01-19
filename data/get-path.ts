import { d3 } from './deps.ts'

const SIZE = 200

interface Feat {
  properties: { id: number }
  geometry: unknown
}

const features: Feat[] = JSON.parse(await Deno.readTextFile('geo.json')).features

export const getPath = (id: number): string => {
  const feature = features.find(d => d.properties.id === id)
  if (!feature) {
    throw new Error('No geo for ' + id)
  }

  // @ts-ignore ?
  const projection = d3.geoMercator().fitExtent([[0, 0], [SIZE, SIZE]], feature)
  const pathCreator = d3.geoPath().projection(projection)
  // @ts-ignore ?
  return pathCreator(feature)
}
