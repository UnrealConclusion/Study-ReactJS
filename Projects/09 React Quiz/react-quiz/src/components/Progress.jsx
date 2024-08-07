import PropTypes from 'prop-types';
import {useQuizContext} from '../contexts/QuizContext';

export default function Progress() {
    const {index, numQuestions, points, maxPoints, answer} = useQuizContext();

    return (
        <header className='progress'>
            <progress max={numQuestions} value={index + Number(answer != null)}/>
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPoints}</p>
        </header>
    );
}

Progress.propTypes = {
    index: PropTypes.number,
    numQuestions: PropTypes.number,
    points: PropTypes.number,
    maxPoints: PropTypes.number,
    answer: PropTypes.number
};