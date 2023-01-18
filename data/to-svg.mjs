import { geoMercator, geoPath } from 'd3'
import { writeFile } from 'fs/promises'
import { getBbox } from './get-bbox.mjs'
import geo from './geo.js'
import { wiki } from './data.mjs'

const WIDTH = 200
const HEIGHT = 200

const projectOne = async feature => {
  const {
    KTNR: id,
    KTNAME: name,
    Z_MAX: maxHeight,
    E_CNTR: x,
    N_CNTR: y,
  } = feature.properties

  const projection = geoMercator().fitExtent([[0, 0], [WIDTH, HEIGHT]], feature)
  const pathCreator = geoPath().projection(projection)
  const path = pathCreator(feature)
  const svg = `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}"><path fill="currentColor" d="${path}"></path></svg>`
  const data = {
    id, name, maxHeight,
    center: [x, y],
    path,
    ...wiki.find(w => w.id === id),
  }

  await writeFile('svgs/' + data.abbrev + '.svg', svg)

  return { ...data, year: Number(data.date.split('-')[0]) }
}

Promise.all(geo.features.map(projectOne))
  .then(d => console.log(JSON.stringify(d, null, 2)))