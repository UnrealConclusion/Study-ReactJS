import { Fragment, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious(){
    if (step > 1){
      setStep(currentStep => currentStep - 1);
    }
  }

  function handleNext(){
    if (step < 3){
      setStep(currentStep => currentStep + 1);
    }
  }

  function handleClose(){
    setIsOpen(isOpen ? false : true);
  }

  return (
    <Fragment>
      <button className="close" onClick={handleClose}>&times;</button>
      { isOpen &&
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">Step {step - 1}: {messages[step-1]}</p>
          <div className="buttons">
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>Previous</Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>Next</Button>
          </div>
        </div>
      }
    </Fragment>
  );
}

function Button({textColor, bgColor, onClick, children}) {
  return (
    <button style={{color: textColor, backgroundColor: bgColor}} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  return <Steps/>
}
export default App;
