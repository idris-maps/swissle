import { Fragment, h } from 'preact'
import type { Lang } from '../data'
import SelectLanguage from './SelectLanguage'
import StartButton from './StartButton'
import MapCH from './MapCH'

interface Props {
  lang: Lang
  setLang: (d: Lang) => void
  onStart: () => void
}

const StartPage = ({ lang, setLang, onStart }: Props) => (
  <Fragment>
    <h2>SWISSLE</h2>
    <MapCH />
    <SelectLanguage lang={lang} setLang={setLang} />
    <StartButton lang={lang} onClick={onStart} />
  </Fragment>
)

export default StartPage
