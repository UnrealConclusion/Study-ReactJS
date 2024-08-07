import PropTypes from 'prop-types';
import Options from './Options';
import {useQuizContext} from '../contexts/QuizContext';


export default function Question() {
    const {questions, index, dispatch, answer} = useQuizContext();
    const question = questions[index];

    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer}/>
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.object,
    dispatch: PropTypes.func,
    answer: PropTypes.number
};