import { h, JSX, Fragment } from 'preact'
import { For } from './utils'
import { useFocus } from './hooks'

interface Props {
  id: string
  choices: string[]
  onSelect: (d: string) => void
}

const onInput = ({ choices, onSelect }: Props) => {
  return (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const value = e.currentTarget.value
    if (choices.includes(value)) {
      onSelect(value)
      e.currentTarget.value = ''
    }
  }
}

const InputChoice = (props: Props) => {
  const ref = useFocus<HTMLInputElement>()

  return (
    <Fragment>
      <input
        list={props.id}
        onInput={onInput(props)}
        ref={ref}
      />
      <datalist id={props.id}>
        <For
          each={props.choices}
          render={d => <option value={d} />}
        />
      </datalist>
    </Fragment>
  )
}

export default InputChoice
