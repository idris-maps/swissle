import { Component, createSignal, createMemo, For } from 'solid-js'
import Map from './Map'
import InputChoice from './InputChoice'
import { canton, getLang } from '../store'
import { cantonNames } from '../data'

const QuestionGeo: Component = () => {
  const [attempts, setAttempts] = createSignal<string[]>([])
  const choices = createMemo(() => cantonNames[getLang()].filter(d => !attempts().includes(d)))
  const onSelect = (d: string) => {
    if (d === canton.name[getLang()]) {
      console.log('pass')
      return
    }
    if (attempts().length > 1) {
      console.log('fail')
      return
    }
    setAttempts(arr => [...arr, d])
  }

  return (
    <>
      <Map canton={canton} />
      <InputChoice
        id="geo"
        onSelect={onSelect}
        choices={choices()}
      />
      <ul>
        <For each={attempts()}>
          {(d, i) => <li data-index={i}>{d}</li>}
        </For>
      </ul>
    </>
  )
}

export default QuestionGeo