import { h } from 'preact'
import { For } from './utils'

interface Props<T> {
    choices: { label: string, value: T }[]
    isCorrect: (d: T) => boolean
    onAnswered: (d: boolean) => void
}

const AnswerSelect = <T,>({ choices, onAnswered, isCorrect }: Props<T>) => (
  <div class="answer-select">
    <For
      each={choices}
      render={d => (
        <button onClick={() => onAnswered(isCorrect(d.value))}>
          {d.label}
        </button>
      )}  
    />
  </div>
)

export default AnswerSelect