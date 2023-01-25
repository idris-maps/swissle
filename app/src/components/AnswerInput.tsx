import { h, JSX, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import AnswerList from './AnswerList'
import InputChoice from './InputChoice'

interface Props {
  choices: string[]
  expectedCorrect?: number
  isCorrect: (d: string) => boolean 
  onAnswered: (pass: boolean) => void
  onChoice?: (d: string) => void
  slots: number
}

type A = { label:string; correct:boolean }

const AnswerInput = (props: Props): JSX.Element => {
  const [choices, setChoices] = useState<string[]>(props.choices)
  const [answers, setAnswers] = useState<A[]>([])

  const onSelect = (res: string) => {
    if (props.onChoice) { props.onChoice(res) }
    setChoices((choices: string[]) => choices.filter(d => d !== res))
    setAnswers((answers: A[]) => [...answers, { label: res, correct: props.isCorrect(res)}])
  }

  return (
    <Fragment>
      <AnswerList
        answers={answers}
        expectedCorrect={props.expectedCorrect || 1}
        slots={props.slots}
        onFull={props.onAnswered}
      />
      <InputChoice
        choices={choices}
        onSelect={onSelect}
      />
    </Fragment>
  )
}

export default AnswerInput
