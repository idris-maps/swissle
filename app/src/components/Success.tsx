import { Fragment, h } from 'preact'
import type { Lang } from '../data'
import StartButton from './StartButton'

interface Props {
  lang: Lang
  onRestart: () => void
}

const Success = ({ lang, onRestart }: Props) => (
  <Fragment>
    <div class="success">
      <img src="clap.png" alt="Bravo!!!" />
    </div>
    <StartButton lang={lang} onClick={onRestart} retry={true} />
  </Fragment>
)

export default Success
