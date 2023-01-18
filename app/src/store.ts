import { createStore } from 'solid-js/store'
import { cantons, Canton } from './data'

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

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
