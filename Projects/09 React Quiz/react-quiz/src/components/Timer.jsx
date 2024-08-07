import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useQuizContext } from '../contexts/QuizContext';

export default function Timer() {
    const {dispatch, secondsRemaining} = useQuizContext();
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(() => {
        const id = setInterval(() => dispatch({type: 'tick'}), 1000);

        // stop the timer between renders + when component unmounts 
        // otherwise a new timer will be created each time component mounts 
        // and we will have several timers calling dispatch at once (time will cound down faster)
        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className='timer'>
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
}

Timer.propTypes = {
    dispatch: PropTypes.func,
    secondsRemaining: PropTypes.number
}