import { h, JSX, Fragment } from 'preact'
import AnswerSelect from './AnswerSelect'
import type { QuestionProps } from './Question'
import { text } from '../data'

const choices: { label: string, value: [number, number] }[] = [
    { label: '< 1000m', value: [0, 1000] },
    { label: '1000 - 2000m', value: [1000, 2000] },
    { label: '2000 - 3000m', value: [2000, 3000] },
    { label: '> 3000m', value: [3000, Infinity] },
]

const isCorrect = (correct: number) =>
    ([min, max]: [number, number]) => 
        min <= correct && correct <= max

const QuestionMaxHeight = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => (
  <Fragment>
    <h3>{canton.name[lang]}</h3>
    <h4>{text.guessMaxHeight[lang]}</h4>
    <AnswerSelect<[number,number]>
      choices={choices}
      isCorrect={isCorrect(canton.maxHeight)}
      onAnswered={onAnswered}
    />
 </Fragment>
)

export default QuestionMaxHeight