import { h, JSX, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import type { QuestionProps } from './Question'
import { getFlags, text, Flag } from '../data'
import { For } from './utils'

const CHANCES = 3

interface ChoiceProps {
  flag: Flag
  onClick: (d: string) => void
  isSelected: boolean
}

const Choice = ({ flag, onClick, isSelected }: ChoiceProps) => {
  const onSelect = () => {
    if (!isSelected) {
      onClick(flag.abbrev)
    }
  }

  return (
    <div
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter') { onSelect() } }}
      class={isSelected ? 'selected-flag' : ''}
    >
      <svg viewBox={flag.viewBox} dangerouslySetInnerHTML={{ __html: flag.content }} />
    </div>
  )
}

const QuestionFlag = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [choices, setChoices] = useState<Flag[]>([])

  useEffect(() => {
    setChoices(getFlags(canton.id))
  }, [canton])

  const onClick = (id: string) => {
    if (id === canton.id) {
      return onAnswered(true)
    }
    const _guesses = [...guesses, id]
    if (_guesses.length === CHANCES) {
      return onAnswered(false)
    }
    setGuesses(_guesses)
  }

  return (
    <Fragment>
      <h3>{canton.name[lang]}</h3>
      <h4>{text.guessFlag[lang]}</h4>
      <div class="flags">
        <For
          each={choices}
          render={flag => (
            <Choice
              flag={flag}
              onClick={onClick}
              isSelected={guesses.includes(flag.abbrev)}
            />
          )}
        />
      </div>
    </Fragment>
  )
}

export default QuestionFlag
