import { h, JSX } from "preact"
import { If } from './utils'

interface Props {
  path: string
  selected?: boolean
  onClick?: () => void
}

const Map = ({ path, selected, onClick }: Props): JSX.Element => (
  <div class={selected ? 'map map-selected' : 'map'}>
    <If
      condition={Boolean(onClick)}
      isTrue={(
        <svg viewBox="0 0 200 200" role="button" tabIndex={0} onClick={onClick}>
          <path d={path} fill="currentColor" />
        </svg>
      )}
      isFalse={(
        <svg viewBox="0 0 200 200">
          <path d={path} fill="currentColor" />
        </svg>
      )}
    />
  </div>
)

export default Map
