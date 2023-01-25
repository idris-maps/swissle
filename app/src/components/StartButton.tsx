import { h } from 'preact'
import { text } from 'src/data'
import type { Lang } from 'src/data'

interface Props {
  lang: Lang
  onClick: () => void
  retry?: boolean
}

const txt = (lang: Lang, retry?: boolean) =>
  retry ? text.retry[lang] : text.start[lang]

const StartButton = ({ onClick, retry, lang }: Props) => (
  <div class="start-button">
    <button onClick={onClick} title={txt(lang, retry)}>
      {txt(lang, retry)}
    </button>
  </div>
)

export default StartButton
