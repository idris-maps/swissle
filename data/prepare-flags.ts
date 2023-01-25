import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts";
import { readDirDeep } from 'https://deno.land/x/anders@v1.0.5/dirs/mod.ts'

export const readAsXML = (fileContent: string) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(fileContent, 'text/html')
  if (!xml) { throw Error('[readAsXML]: could not parse file') }
  return xml
}

const readOne = async (filename: string) => {
  const abbrev = filename.split('.svg')[0]
  const file = await Deno.readTextFile('flags/' + filename)
  const xml = readAsXML(file)
  const svg = xml.getElementsByTagName('svg')[0]
  const viewBox = svg.getAttribute('viewBox')
  const content = svg.innerHTML
  return { abbrev, viewBox, content }
}

const filenames = await readDirDeep('flags')

const data = (await Promise.all(filenames.map(readOne)))
  .reduce((r, d) => ({ ...r, [d.abbrev]: { viewBox: d.viewBox, content: d.content } }), {})

console.log(`
interface Flags {
  [key:string]: {
    viewBox: string
    content: string
  }
}

export const flags: Flags = ${JSON.stringify(data, null, 2)}
`)