import { h, JSX, Fragment } from 'preact'
import { useState } from 'preact/hooks'
import type { Canton, Lang } from '../data'
import { If } from './utils'
import QuestionGeo from './QuestionGeo'
import QuestionNeighbors from './QuestionNeighbors'
import QuestionCapital from './QuestionCapital'
import QuestionMaxHeight from './QuestionMaxHeight'
import QuestionPop from './QuestionPop'
import QuestionFlag from './QuestionFlag'
import { useCelebration } from './hooks'
import { cantonNameMap } from '../data'
import type { CorrectA } from './CorrectAnswer'


export interface QuestionProps {
  canton: Canton
  lang: Lang
  onAnswered: (pass: boolean) => void
}

const MAX_QUESTIONS = 5

type Props = Omit<QuestionProps,'onAnswered'> & {
  onEnd: (d: { pass: true } | { pass: false, answer: CorrectA }) => void
}

const getAnswer = (canton: Canton, lang: Lang, d: number): CorrectA => {
  switch (d) {
    case 0: return canton.name[lang]
    case 1: return canton.neighbors.map(id => cantonNameMap[id][lang])
    case 2: return { flag: true, id: canton.id }
    case 3: return canton.capital[lang]
    case 4: return canton.maxHeight
    case 5: return canton.pop
    default: return ''
  }
}

const Question = ({ lang, canton, onEnd }: Props): JSX.Element => {
  const [current, setCurrent] = useState<number>(0)
  const celebrate = useCelebration()

  const onAnswered = async (pass: boolean) => {
    if (pass) { await celebrate() }
    if (pass && current < MAX_QUESTIONS) { return setCurrent(d => d + 1) }
    if (pass && current === MAX_QUESTIONS) { return onEnd({ pass }) }
    return onEnd({ pass: false, answer: getAnswer(canton, lang, current) })
  }

  return (
    <Fragment>
      <If
        condition={current === 0}
        isTrue={<QuestionGeo lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
      <If
        condition={current === 1}
        isTrue={<QuestionNeighbors lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
      <If
        condition={current === 2}
        isTrue={<QuestionFlag lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
      <If
        condition={current === 3}
        isTrue={<QuestionCapital lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
      <If
        condition={current === 4}
        isTrue={<QuestionMaxHeight lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
      <If
        condition={current === 5}
        isTrue={<QuestionPop lang={lang} canton={canton} onAnswered={onAnswered} />}
      />
    </Fragment>
  )
}

export default Question
