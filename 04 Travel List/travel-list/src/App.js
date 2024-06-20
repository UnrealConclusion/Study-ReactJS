import {React, useState} from 'react';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackingList/>
      <Stats/>
    </div>
  );
}

function Logo() {
  return (
    <h1>🏝️ Far Away 🧳</h1>
  );
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event){
    event.preventDefault();

    if (!description) return;

    const newItem = {
	    description: description,
	    quantity: quantity,
	    packed: false,
	    id: Date.now()
    }
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => 
          <option value={num} key={num}>
            {num}
          </option>
        )}
      </select>
      <input 
        type="text" 
        placeholder="Item..." 
        value={description} 
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className='list'>
      <ui>
        {initialItems.map((item) => 
          <Item key={item.id} id={item.id} description={item.description} quantity={item.quantity} packed={item.packed}/>
        )}
      </ui>
    </div>
  );
}

function Item({id, description, quantity, packed}) {
  return (
    <li>
      <span style={packed ? {textDecoration:"line-through"} : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>🧳 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default App;
