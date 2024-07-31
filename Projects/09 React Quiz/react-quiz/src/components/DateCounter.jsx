import { useReducer } from "react";

function DateCounter() {

  const [state, dispatch] = useReducer(reducer, {count: 0, step: 1}); // note that an object was passed in for the inital state
  const {count, step} = state;

  /**
   * The reducer function examines the action and 
   * computes the next state based on the action and the current state
   */
	function reducer(state, action) {
		switch(action.type) {
			case 'dec':
				return {...state, count: state.count - state.step};
			case 'inc':
				return {...state, count: state.count + state.step};
			case 'setCount':
				return {...state, count: action.payload};
			case 'setStep':
				return {...state, step: action.payload};
      case 'reset':
        return {count: 0, step: 1};
			default: 
				throw new Error("Unknown Action");
		}
	}

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  // calls the dispatch function with a decrement action
  const dec = function () {
    dispatch({type: 'dec'});
  };

  // calls the dispatch function with a increment action
  const inc = function () {
    dispatch({type: 'inc'});
  };

  // calls the dispatch function with a set count action
  const defineCount = function (e) {
    dispatch({type: 'setCount', payload: Number(e.target.value)});
  };

  // calls the dispatch function with a set step action
  const defineStep = function (e) {
    dispatch({type: 'setStep', payload: Number(e.target.value)});
  };

  // calls the dispatch function with a reset action
  const reset = function () {
    dispatch({type: 'reset'});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
