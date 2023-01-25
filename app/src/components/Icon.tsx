import { h, JSX, Fragment } from 'preact'

const wrap = (className: string, content: JSX.Element, notInlined?: boolean) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    style={ notInlined ? '' : 'width:1em;position:relative;top:0.15em;' }
    class={String(className)}
  >
    {content}
  </svg>
)

interface Props {
  type: 'check' | 'x'
  notInlined?: boolean
}


const Icon = ({ type, notInlined }: Props) => {
  switch (type) {
    case 'check': return wrap(
      'icon-check',
      <polyline points="20 6 9 17 4 12"/>,
      notInlined,
    )
    case 'x': return wrap(
      'icon-x',
      <Fragment>
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </Fragment>,
      notInlined,
    )
    default: return (
      <Fragment />
    )
  }
}

export default Icon
