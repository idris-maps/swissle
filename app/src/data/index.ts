export * from './cantons'
import { cantons } from './cantons'
import { cities as _cities } from './cities'

export type Lang = 'de' | 'fr' | 'local'

const capitals = {
  de: cantons.map(d => d.capital.de),
  fr: cantons.map(d => d.capital.fr),
  local: cantons.map(d => d.capital.local),
}

export const cities = {
  de: [...capitals.de, ..._cities].sort(),
  fr: [...capitals.fr, ..._cities].sort(),
  local: [...capitals.local, ..._cities].sort(),
}

export const cantonNames = {
  de: cantons.map(d => d.name.de).sort(),
  fr: cantons.map(d => d.name.fr).sort(),
  local: cantons.map(d => d.name.local).sort(),
}

export const cantonNameMap = cantons.reduce((r: Record<string,Record<Lang,string>>, d) => {
  r[d.id] = d.name
  return r
}, {})

export const getCantonById = (id: string) => {
  const d = cantons.find(d => d.id === id)
  if (!d) { throw new Error(`Canton id ${id} does not exist`) }
  return d
}

export const getCantonName = (lang: Lang, id: string) => getCantonById(id).name[lang]