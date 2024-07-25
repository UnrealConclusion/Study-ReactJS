import { useState } from "react";
import "./index.css"
function Counter(){
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count)

  function handleReset(){
    setCount(0);
    setStep(1);
  }

  return(
    <div className="Counter">
      <div>
        <input type="range" value={step} min={0} max={10} onChange={(e) => setStep(e.target.value)}/>
        <label htmlFor="Step">Step {step}</label>
      </div>
      <div>
        <button onClick={() => setCount(count - step)}>−</button> 
        <input type="text" 
          value={count} 
          onChange={(e) => {
            if (!isNaN(e.target.value)){
              setCount(Number(Number(e.target.value)));
            }
          }
        }/>
        <button onClick={() => setCount(count + step)}>✚</button>
      </div>
      <h1>{count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `} {date.toDateString()}</h1>

      {step !== 1 || count !== 0 ?
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
        : ""
      }
    </div>
  );
}

function App() {
  return (
    <main>
      <Counter/>
    </main>
  );
}

export default App;
