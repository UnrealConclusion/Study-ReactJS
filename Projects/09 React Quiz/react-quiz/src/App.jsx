import { useEffect, useReducer } from 'react'
import { Header, Quiz, Loader, Error, StartScreen, Question, NextButton, Progress, FinishScreen, Footer, Timer} from './components'
import { useQuizContext } from './contexts/QuizContext';

function App() {
  const { status } = useQuizContext();

  return (
    <div className='app'>
      <Header/>
      <Quiz>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen/>}
        {status === "active" && 
          <>
            <Progress/>
            <Question/>
            <Footer>
              <Timer/>
              <NextButton/>
            </Footer>
          </>
        }
        {status === "finished" && 
          <FinishScreen/>
        }
      </Quiz>
    </div>
  )
}

export default App
