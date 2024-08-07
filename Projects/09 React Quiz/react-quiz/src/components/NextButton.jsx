import PropTypes from 'prop-types';
import { useQuizContext } from '../contexts/QuizContext';

export default function NextButton() {
    const {dispatch, answer, index, numQuestions} = useQuizContext();
    
    if (answer === null) {
        return;
    }

    // finished the quiz
    if (index === numQuestions-1) {
        return (
            <button className='btn btn-ui' onClick={() => dispatch({type: "finished"})}>
                Finish
            </button>
        );
    }

    return (
        <button className='btn btn-ui' onClick={() => dispatch({type: "nextQuestion"})}>
            Next
        </button>
    );
}

NextButton.propTypes = {
    dispatch: PropTypes.func,
    answer: PropTypes.number,
    index: PropTypes.number,
    numQuestions: PropTypes.number
};