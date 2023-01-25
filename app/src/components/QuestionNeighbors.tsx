import { h, JSX, Fragment } from 'preact'
import AnswerInput from './AnswerInput'
import Map from './Map'
import { For } from './utils'
import type { QuestionProps } from './Question'
import { cantonNames, getCantonById, cantonAbbrevMap, text } from '../data'
import { useState } from 'preact/hooks'

const QuestionNeighbors = ({ canton, lang, onAnswered }: QuestionProps): JSX.Element => {
  const names = canton.neighbors.map(d => getCantonById(d).name[lang])
  const [selected, setSelected] = useState<string[]>([])

  const onChoice = (res: string) => {
    setSelected(d => [...d, res])
  }

  return (
    <Fragment>
      <h3>{canton.name[lang]}</h3>
      <h4>{text.guessNeighbors[lang]}</h4>
      <div class="neighbors">
        <For
          each={canton.neighbors}
          render={id => (
            <Map
              path={getCantonById(id).path}
              selected={selected.map(d => cantonAbbrevMap[d]).includes(id)}
            />
          )}
        />
      </div>
      <AnswerInput
        id="geo"
        choices={cantonNames[lang]}
        expectedCorrect={4}
        isCorrect={d => names.includes(d)} 
        onAnswered={onAnswered}
        onChoice={onChoice}
        slots={6}
      />
    </Fragment>
  )
}

export default QuestionNeighbors
