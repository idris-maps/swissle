import { h, JSX, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import { For, If } from './utils'

interface Props {
  choices: string[]
  onSelect: (d: string) => void
}

const onInput = ({ choices, onSelect }: Props) => {
  return (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const value = e.currentTarget.value
    if (choices.includes(value)) {
      onSelect(value)
      e.currentTarget.value = ''
    }
  }
}

const limit = <T,>(n: number, arr: T[]) => arr.slice(0, n)
const diacritics = {
  'à': 'a',
  'â': 'a',
  'ä': 'a',
  'è': 'e',
  'é': 'e',
  'ê': 'e',
  'ö': 'o',
  'ô': 'o',
  'ü': 'u',
  '-': ' ',
}

const replaceDiacritics = (str: string) => Array.from(str).map(d => diacritics[d] || d).join('')
const normalize = (str: string) => replaceDiacritics(str).toLowerCase()

const searchIn = (choices: string[], max = 4) => {
  const _choices = choices.map(d => [normalize(d), d])
  return (term: string) => {
    const t = normalize(term)
    const start = _choices.filter(d => d[0].startsWith(t))
    if (start.length >= max) {
      return limit(max, start.map(d => d[1]))
    }
    const incl = _choices.filter(d => !d[0].startsWith(t) && d[0].includes(t))
    return limit(max, [...start, ...incl].map(d => d[1]))
  }
}

const InputChoice = (props: Props) => {
  const [values, setValues] = useState<string[]>([])
  const [value, setValue] = useState<string>('')

  const onChange = (search: (d: string) => string[]) => (e: JSX.TargetedKeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setValues(value === '' ? [] : search(value))
    setValue(e.currentTarget.value)
  }

  const onClick = (d: string) => () => {
    props.onSelect(d)
    setValue('')
    setValues([])
  }

  const onKeySelect = (d: string) => (e: JSX.TargetedKeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      onClick(d)()
    }
  }

  return (
    <div class="input-choice">
      <ul>
        <For
          each={values}
          render={d => (
            <li
              tabIndex={0}
              onClick={onClick(d)}
              onKeyDown={onKeySelect(d)}
            >
              {d}
            </li>
          )}
        />
      </ul>
      <input
        onInput={onChange(searchIn(props.choices))}
        value={value}
      />
    </div>
  )
}

export default InputChoice
