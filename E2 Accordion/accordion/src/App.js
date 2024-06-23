import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion items={faqs}/>
    </div>
  );
}

function Accordion({items}) {
  const [currentOpen, setOpen] = useState(null);

  function toggleOpen(num){
    setOpen(current => current === num ? null : num);
  }

  return (
    <div className="accordion">
      {items.map((element, i) => 
        <AccordionItem num={i} 
        title={element.title} 
        currentOpen={currentOpen} 
        onOpen={toggleOpen}>
          {element.text}
        </AccordionItem>
      )}
    </div>
  );
}

function AccordionItem({num, title, currentOpen, onOpen, children}) {
  const isOpen = currentOpen === num;

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={() => onOpen(num)}>
      <p className="number">{num <= 9 ? "0" + num : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <p className="content-box">{children}</p> : ""}
    </div>
  );
}
