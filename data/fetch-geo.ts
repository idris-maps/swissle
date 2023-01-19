import { geotoolbox, project } from './deps.ts'

const _districts = await (await fetch('https://raw.githubusercontent.com/idris-maps/swiss-geodata-2018/master/data/districts.json')).json()
const districts = project.LV95toWGS(_districts)
const cantons = geotoolbox.aggregate(districts, { id: 'KTNR' })
console.log(JSON.stringify(cantons))
