import { h, Fragment } from 'preact'
import { If, For } from './utils'
import Icon from './Icon'
import StartButton from './StartButton'
import { text } from '../data'
import type { Lang } from '../data'

const isString = (d: any): d is string => String(d) === d
const isArrayOfStrings = (d: any): d is string[] => Array.isArray(d) && d.every(isString)

interface Props {
  answer: string | string[] | number
  lang: Lang
  onRestart: () => void
}

const CorrectAnswer = ({ answer, lang, onRestart }: Props) => (
  <Fragment>
    <div class="correct-answer-icon">
      <Icon type="x" notInlined={true} />
    </div>
    <h3>{text.answerWas[lang]}</h3>
    <If
      condition={isArrayOfStrings(answer)}
      isTrue={(
        <ul>
          <For
            each={answer as string[]}
            render={d => <li class="correct-answer">{d}</li>}
          />
        </ul>
      )}
      isFalse={<p class="correct-answer">{String(answer)}</p>}
    />
    <StartButton onClick={onRestart} lang={lang} retry={true} />
  </Fragment>
)

export default CorrectAnswer
