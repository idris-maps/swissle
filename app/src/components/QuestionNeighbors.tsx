import { Component, createSignal, createMemo, For } from 'solid-js'
import Map from './Map'
import InputChoice from './InputChoice'
import { canton, getLang } from '../store'
import { cantonNames, getCantonById, cantonNameMap } from '../data'

const QuestionNeighbors: Component = () => {
  const expected = canton.neighbors.map(d => [d, cantonNameMap[d][getLang()]])
  const [attempts, setAttempts] = createSignal<{name:string,id?:string}[]>([])
  const choices = createMemo(() =>
    cantonNames[getLang()].filter(d => !attempts().map(d => d.name).includes(d))
  )
  const correct = createMemo(() => attempts().filter(d => Boolean(d.id)))
  const onSelect = (answer: string) => {
    const isCorrect = expected.find(d => d[1] === answer)
    if (isCorrect) {
      if (correct().length === expected.length - 1) {
        console.log('pass')
        return
      }
      setAttempts(arr => [...arr, { name: answer, id: isCorrect[0] }])
      return
    }

    if (attempts().length > 6) {
      console.log('fail')
      return
    }

    setAttempts(arr => [...arr, { name: answer }])
  }

  return (
    <>
      <div style="display:grid;grid-template-columns:repeat(4,1fr)">
        <For each={canton.neighbors}>
          {d => <Map canton={getCantonById(d)} />}
        </For>
      </div>
      <InputChoice
        id="geo"
        onSelect={onSelect}
        choices={choices()}
      />
      <ul>
        <For each={attempts()}>
          {(d, i) => (
            <li data-index={i}>
              <span>{d.name}</span>
              <span>{canton.neighbors.includes(d.id || '')}</span>
            </li>
          )}
        </For>
      </ul>
    </>
  )
}

export default QuestionNeighbors