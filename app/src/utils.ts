import { Lang } from "./data"

export const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const isLang = (d: string): d is Lang => ['de', 'fr'].includes(d)

export const getBrowserLang = () => {
  const langs = navigator.languages.map(d => d.split('-')[0].toLowerCase())
  return langs.reduce((r: Lang | undefined, d) => {
    if (r) { return r }
    if (isLang(d)) { return d }
    return r
  }, undefined) || 'local'
}
