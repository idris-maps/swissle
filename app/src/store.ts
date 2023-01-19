import { createStore } from 'solid-js/store'
import { cantons, Canton, Lang } from './data'
import { getRandom, getBrowserLang } from './utils'

export const [canton, setCanton] = createStore<Canton>(getRandom(cantons))

const getNextCanton = (current: Canton): Canton => {
  const next = getRandom(cantons)
  if (!next || next.id === current.id) {
    return getNextCanton(current)
  }
  return next
}

export const getNewCanton = () => {
  const next = getNextCanton(canton)
  setCanton(next)
}

const [language, setLanguage] = createStore<{ choice: Lang }>({ choice: 'local' })

window.addEventListener('load', () => {
  setLanguage({ choice: getBrowserLang() })
})

export const getLang = () => language.choice

type Level = 'geo' | 'neighbors' | 'capital'

const levels: Level[] = ['geo', 'neighbors', 'capital']

interface LevelState {
  id: Level
  done?: boolean
  pass?: boolean
}

const [levelStates, setLevelStates] = createStore<{ state: LevelState[] }>({ state: levels.map(id => ({ id })) })

export const getCurrentLevel = () => levelStates.state.find(d => !d.done)?.id

export const setLevelResult = (level: Level, pass: boolean) => {
  
} 