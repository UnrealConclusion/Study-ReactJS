import { useState } from "react";
import "./index.css"
function Counter(){
  const {count, setCount} = useState(0);
  const {step, setStep} = useState(0);

  return(
    <div className="Counter">
    
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
