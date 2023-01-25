import { h, Fragment } from 'preact'
import { For } from './utils'
import { text } from '../data'
import type { Lang } from '../data'

interface Props {
  lang: Lang
  setLang: (d: Lang) => void
}

const langMap: Record<Lang,string> = {
  de: 'Deutsch',
  local: 'English',
  fr: 'Français',
}

const SelectLanguage = ({ lang, setLang }: Props) => (
  <Fragment>
    <label for="language">{text.lang[lang]}</label>
    <select onChange={e => setLang(e.currentTarget.value as Lang)}>
      <For
        each={Object.keys(text.lang) as Lang[]}
        render={d => (
          <option value={d} selected={d === lang}>
            {langMap[d]}
          </option>
        )}
      />
    </select>
  </Fragment>
)

export default SelectLanguage
