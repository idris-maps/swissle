import { h, JSX, Fragment } from 'preact'

interface IfProps {
  condition: boolean
  isTrue?: JSX.Element
  isFalse?: JSX.Element
}

export const If =({ condition, isFalse, isTrue }: IfProps) =>
  condition ? (isTrue || <Fragment />) : (isFalse || <Fragment />)

interface ForProps<T> {
  each: T[]
  render: (d: T, i: number) => JSX.Element
}

export const For = <T,>({ each, render }: ForProps<T>) =>
  <Fragment>{each.map((d, i) => render(d, i)) }</Fragment>
