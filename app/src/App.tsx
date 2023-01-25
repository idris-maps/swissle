import { h } from 'preact'
import { useState } from 'preact/hooks'
import { If } from './components/utils'
import Question from './components/Question'
import CorrectAnswer from './components/CorrectAnswer'
import StartPage from './components/StartPage'
import { getRandomCanton, getBrowserLang, Lang, Canton } from './data'

const App = () => {
  const [lang, setLang] = useState<Lang>(getBrowserLang())
  const [canton, setCanton] = useState<Canton>()
  const [failedAnswer, setFailedAnswer] = useState<string|string[]|number|undefined>(undefined)

  const onStart = () => {
    setFailedAnswer(undefined)
    setCanton(getRandomCanton())
  }

  const onEnd = ({ pass, answer }: { pass: boolean, answer?: string | number | string[] }) => {
    console.log({ pass, answer })
    if (!pass && answer) {
      setFailedAnswer(answer)
    } else {
      setFailedAnswer(undefined)
      setCanton(undefined)
      console.log({ canton, failedAnswer })
    }
  }

  return (
    <div class="app-content">
      <If
        condition={!canton}
        isTrue={(
          <StartPage
            lang={lang}
            setLang={setLang}
            onStart={onStart}
          />
        )}
      />
      <If
        condition={Boolean(failedAnswer)}
        isTrue={(
          <CorrectAnswer
            answer={failedAnswer}
            lang={lang}
            onRestart={onStart}
          />
        )}
      />
      <If
        condition={Boolean(canton) && !failedAnswer}
        isTrue={(
          <Question
            canton={canton}
            lang={lang}
            onEnd={onEnd}
          />
        )}
      />
    </div>
  )
}

export default () => (
  <main>
    <div class="app">
      <App />
    </div>
  </main>
)
