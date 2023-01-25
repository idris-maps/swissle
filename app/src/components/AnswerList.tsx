import { h, JSX } from 'preact'
import { For, If } from './utils'
import Icon from './Icon'

interface A {
  label: string
  correct: boolean
}

interface Props {
  answers: A[]
  expectedCorrect: number
  onFull: (pass: boolean) => void 
  slots: number
}

const AnswerList = ({ answers,  expectedCorrect, slots, onFull }: Props): JSX.Element => {
  const correctAnswers = answers.filter(d => d.correct).length
  const pass = correctAnswers === expectedCorrect
  const full = answers.length === slots

  if (full || pass) {
    onFull(pass)
  }

  return (
    <ul class="answer-list">
      <For
        each={Array.from(Array(slots))}
        render={(_, i) => (
          <If
            condition={Boolean(answers[i])}
            isTrue={(
              <li class="answer-list-item">
                <span>{answers[i]?.label}</span>
                <Icon type={answers[i]?.correct ? 'check' : 'x'} />
              </li>
              )}
            isFalse={(
              <li class="answer-list-slot" />
            )}
          />
        )}
      />
    </ul>
  )
}

export default AnswerList;
