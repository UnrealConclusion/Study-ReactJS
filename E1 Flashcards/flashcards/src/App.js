import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <FlashCards/>
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id){
    if (selectedId === id) {
      setSelectedId(null);
    }
    else{
      setSelectedId(id);
    }
  }

  return (
    <div className="flashcards" key={questions.id}>
      {questions.map((q) => 
        <div onClick={() => handleClick(q.id)} className={selectedId !== q.id ? "" : "selected"}>
          {selectedId !== q.id ? q.question : q.answer}
        </div>
      )}
    </div>
  );
}


