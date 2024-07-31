import PropTypes from 'prop-types';

export default function Quiz({children}){

    return (
        <main className='main'>
            {children}
        </main>
    );
}

Quiz.propTypes = {
    children: PropTypes.node
};