import { For } from 'solid-js'
import type { Component } from 'solid-js';

interface Props {
  id: string
  choices: string[]
  onSelect: (d: string) => void
}

const onInput = ({ choices, onSelect }: Props) => {
  return (e: InputEvent & { currentTarget: HTMLInputElement }) => {
    const value = e.currentTarget.value
    if (choices.includes(value)) {
      onSelect(value)
      e.currentTarget.value = ''
    }
  }
}

const InputChoice: Component<Props> = props => (
  <>
    <input
      list={props.id}
      onInput={onInput(props)}
    />
    <pre>{JSON.stringify(props.choices)}</pre>
    <datalist id={props.id}>
      <For each={props.choices}>
        {(d, i) => (
          <option
            data-index={i()}
            value={d}
          />
        )}
      </For>
    </datalist>
  </>
)

export default InputChoice