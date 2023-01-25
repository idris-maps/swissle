import { h, JSX, Fragment } from 'preact'
import AnswerInput from './AnswerInput'
import Map from './Map'
import type { QuestionProps } from './Question'
import { cantonNames, text } from '../data'

const QuestionGeo = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => (
  <Fragment>
    <h3>{text.guessGeo[lang]}</h3>
    <Map path={canton.path} />
    <AnswerInput
      id="geo"
      choices={cantonNames[lang]}
      isCorrect={d => d === canton.name[lang]} 
      onAnswered={onAnswered}
      slots={3}
    />
 </Fragment>
)

export default QuestionGeo
