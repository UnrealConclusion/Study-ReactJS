
import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className='container'>
      <Calculator/>
    </div>
  );
}

function Calculator() {
  const [bill, setBill] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [friendSatisfaction, setFriendSatisfaction] = useState(0)
  const averageSatisfaction = (satisfaction + friendSatisfaction) / 2
  const tip = (averageSatisfaction * bill) / 100;

  return (
    <div>
      <p>How much was the bill?<input type='number' value={bill} onChange={(e) => setBill(e.target.value)}/></p>
      <p>How did you like the service?
        <select value={satisfaction} onChange={(e) => setSatisfaction(e.target.value)}>
          <option value={0}>Dissatisfied (0%)</option>
          <option value={5}>It was okay (5%)</option>
          <option value={10}>It was good (10%)</option>
          <option value={20}>Absolutely amazing! (20%)</option>
        </select></p>
        <p>How did your friend like the service?
        <select value={friendSatisfaction} onChange={(e) => setFriendSatisfaction(e.target.value)}>
          <option value={0}>Dissatisfied (0%)</option>
          <option value={5}>It was okay (5%)</option>
          <option value={10}>It was good (10%)</option>
          <option value={20}>Absolutely amazing! (20%)</option>
        </select></p>
        <span className='reset'>
          <button onClick={() => {
            setBill(0);
            setSatisfaction(0);
            setFriendSatisfaction(0);
          }}>Reset</button>
        </span>
        {bill > 0 ? <p>{`You pay $${bill} ($${bill} + $${tip} tip)`}</p> : ""}
    </div>
  );
}
export default App;
