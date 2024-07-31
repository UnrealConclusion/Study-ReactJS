import { useEffect, useReducer } from 'react'
import { Header, Quiz, Loader, Error, StartScreen, Question, NextButton, Progress, FinishScreen, Footer, Timer} from './components'

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0, 
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: "ready"};
    case 'dataFailed':
      return {...state, status: "error"};
    case 'start':
      return {...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION};
    case 'newAnswer':
      return {
        ...state, 
        answer: action.payload,
        points: action.payload === state.questions.at(state.index).correctOption ? state.points + state.questions.at(state.index).points : state.points
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1, 
        answer: null
      }
    case 'finished':
      return {...state, status: "finished", highscore: state.points > state.highscore ? state.points : state.highscore};
    case 'restart':
      return {...initialState, questions: state.questions, highscore: state.highscore, status: 'ready'};
    case 'tick': 
      return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining === 0 ? "finished" : state.status};
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{questions, index, answer, points, highscore, status, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((accumulator, current) => accumulator + current.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({type: "dataReceived", payload: data}))
      .catch(() => dispatch({type: "dataFailed"}));
  }, []);

  return (
    <div className='app'>
      <Header/>
      <Quiz>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === "active" && 
          <>
            <Progress 
              index={index} 
              numQuestions={numQuestions} 
              points={points} 
              maxPoints={maxPoints} 
              answer={answer}
            />
            <Question 
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
              <NextButton 
                dispatch={dispatch} 
                answer={answer} 
                numQuestions={numQuestions} 
                index={index}
              />
            </Footer>
          </>
        }
        {status === "finished" && 
          <FinishScreen 
            points={points} 
            maxPoints={maxPoints} 
            highscore={highscore}
            dispatch={dispatch}
          />
        }
      </Quiz>
    </div>
  )
}

export default App
