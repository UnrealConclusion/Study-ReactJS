import { createContext, useContext, useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const QuizContext = createContext();

const initialState = {
    questions: [],
    status: "loading", // loading, error, ready, active, finished
    index: 0,
    answer: null,
    points: 0, 
    highscore: 0,
    secondsRemaining: null,
    numQuestions: 0,
    maxPoints: 0
};

function reducer(state, action) {
    switch(action.type) {
      case 'dataReceived':
        return {...state, questions: action.payload, status: "ready", numQuestions: action.payload.length, maxPoints: action.payload.reduce((accumulator, current) => accumulator + current.points, 0)};
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

function QuizProvider({ children }) {
    const [{questions, index, answer, points, highscore, status, secondsRemaining, numQuestions, maxPoints}, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      fetch("http://localhost:8000/questions")
        .then(res => res.json())
        .then(data => dispatch({type: "dataReceived", payload: data}))
        .catch(() => dispatch({type: "dataFailed"}));
    }, []);
  
    return (
        <QuizContext.Provider
            value={{
                questions,
                index,
                answer, 
                points, 
                highscore,
                status,
                secondsRemaining,
                numQuestions,
                maxPoints,

                dispatch
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuizContext() {
    const context = useContext(QuizContext);

    if (context === undefined) {
        throw new Error("Quiz context used outside of Quiz provider");
    }

    return context;
}

export { QuizProvider, useQuizContext };