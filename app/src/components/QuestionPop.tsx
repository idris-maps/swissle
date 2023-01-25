import { h, JSX, Fragment } from 'preact'
import AnswerSelect from './AnswerSelect'
import type { QuestionProps } from './Question'
import { text } from '../data'

const choices: { label: string, value: [number, number] }[] = [
    { label: '< 100\'000', value: [0, 100000] },
    { label: '100\'000 - 200\'000', value: [100000, 200000] },
    { label: '200\'000 - 500\'000', value: [200000, 500000] },
    { label: '> 500\'000', value: [500000, Infinity] },
]

const isCorrect = (correct: number) =>
    ([min, max]: [number, number]) => 
        min <= correct && correct <= max

const QuestionPop = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => (
  <Fragment>
    <h3>{canton.name[lang]}</h3>
    <h4>{text.guessPop[lang]}</h4>
    <AnswerSelect<[number,number]>
      choices={choices}
      isCorrect={isCorrect(canton.pop)}
      onAnswered={onAnswered}
    />
 </Fragment>
)

export default QuestionPop
