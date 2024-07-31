import PropTypes from 'prop-types';

export default function StartScreen({numQuestions, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className='btn btn-ui' onClick={() => dispatch({type: "start"})}>Let&apos;s start</button>
        </div>
    );
}

StartScreen.propTypes = {
    numQuestions: PropTypes.number,
    dispatch: PropTypes.func
};