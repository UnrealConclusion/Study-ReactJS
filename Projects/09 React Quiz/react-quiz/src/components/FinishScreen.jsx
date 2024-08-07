import PropTypes from 'prop-types';
import { useQuizContext } from '../contexts/QuizContext';

export default function FinishScreen() {
    const {points, maxPoints, highscore, dispatch} = useQuizContext();
    const percentage = (points / maxPoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";

    return (
        <>
            <p className='result'>
                {emoji} You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)})%
            </p>
            <p className='highscore'>Highscore: {highscore} points</p>
            <button className='btn btn-ui' onClick={() => dispatch({type: 'restart'})}>Reset</button>
        </>
    );
}

FinishScreen.propTypes = {
    points: PropTypes.number,
    maxPoints: PropTypes.number,
    highscore: PropTypes.number,
    dispatch: PropTypes.func
}