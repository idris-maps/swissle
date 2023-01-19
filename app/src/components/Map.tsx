import type { Component } from 'solid-js';
import type { Canton } from '../data'

interface Props {
  canton: Canton
}

const Map: Component<Props> = ({ canton }: Props) => (
  <svg viewBox="0 0 200 200">
    <path d={canton.path} fill="currentColor" />
  </svg>
)

export default Map
