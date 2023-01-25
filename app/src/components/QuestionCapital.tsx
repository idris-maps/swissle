import { h, JSX, Fragment } from 'preact'
import AnswerInput from './AnswerInput'
import type { QuestionProps } from './Question'
import { cities, text } from '../data'

const QuestionCapital = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => (
  <Fragment>
    <h3>{canton.name[lang]}</h3>
    <h4>{text.guessCapital[lang]}</h4>
    <AnswerInput
      choices={cities[lang]}
      isCorrect={d => d === canton.capital[lang]} 
      onAnswered={onAnswered}
      slots={3}
    />
  </Fragment>
)

export default QuestionCapital
