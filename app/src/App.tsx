import { h } from 'preact'
import { useState } from 'preact/hooks'
import { If } from './components/utils'
import Question from './components/Question'
import CorrectAnswer, { CorrectA } from './components/CorrectAnswer'
import StartPage from './components/StartPage'
import Success from './components/Success'
import { getRandomCanton, getBrowserLang, Lang, Canton } from './data'

const App = () => {
  const [lang, setLang] = useState<Lang>(getBrowserLang())
  const [canton, setCanton] = useState<Canton>()
  const [failedAnswer, setFailedAnswer] = useState<CorrectA>(undefined)
  const [success, setSuccess] = useState<boolean>(false)

  const onStart = () => {
    setFailedAnswer(undefined)
    setCanton(getRandomCanton(canton ? canton.id : undefined))
  }

  const onEnd = ({ pass, answer }: { pass: boolean, answer?: CorrectA }) => {
    if (!pass && answer) {
      setFailedAnswer(answer)
    } else {
      setSuccess(true)
    }
  }

  const onRestart = () => {
    setFailedAnswer(undefined)
    setCanton(getRandomCanton(canton ? canton.id : undefined))
    setSuccess(false)
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
            onRestart={onRestart}
          />
        )}
      />
      <If
        condition={success}
        isTrue={(
          <Success lang={lang} onRestart={onRestart} />
        )}
      />
      <If
        condition={Boolean(canton) && !failedAnswer && !success}
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
