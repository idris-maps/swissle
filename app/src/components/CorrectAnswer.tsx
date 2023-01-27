import { h, Fragment } from 'preact'
import { If, For } from './utils'
import Icon from './Icon'
import StartButton from './StartButton'
import { text, getFlag } from '../data'
import type { Lang } from '../data'

const isString = (d: any): d is string => String(d) === d
const isArrayOfStrings = (d: any): d is string[] => Array.isArray(d) && d.every(isString)
const isFlag = (d: any): d is { flag: true, id: string } => typeof d === 'object' && d.flag 

export type CorrectA = string | string[] | number | { flag: true, id: string }

interface Props {
  answer: CorrectA
  lang: Lang
  onRestart: () => void
}

const FlagAnswer = ({ answer }: { answer: CorrectA }) => {
  if (!isFlag(answer)) { return undefined }
  const { viewBox, content } = getFlag(answer.id)
  return (
    <div class="flag-answer">
      <svg viewBox={viewBox} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
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
    />
    <If
      condition={!isArrayOfStrings(answer) && isFlag(answer)}
      isTrue={<FlagAnswer answer={answer} />}
      isFalse={<p class="correct-answer">{String(answer)}</p>}
    />
    <StartButton onClick={onRestart} lang={lang} retry={true} />
  </Fragment>
)

export default CorrectAnswer
