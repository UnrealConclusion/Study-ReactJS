import {React, useState} from 'react';

export default function PackingList({items, onDeleteItem, onPackItem, onClearList}) {
    const [sortBy, setSortBy] = useState("packed");
  
    let sortedItems;
    if (sortBy === "input") {
      sortedItems = items;
    }
    else if (sortBy === "description") {
      sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    }
    else if (sortBy === "packed") {
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    }
  
    return (
      <div className='list'>
        <ul>
          {sortedItems.map((item) => 
            <Item key={item.id} id={item.id} description={item.description} quantity={item.quantity} packed={item.packed} onDeleteItem={onDeleteItem} onPackItem={onPackItem}/>
          )}
        </ul>
  
        <div className='actions'>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClearList}>Clear List</button>
        </div>
      </div>
    );
  }
  
  function Item({id, description, quantity, packed, onDeleteItem, onPackItem}) {
    return (
      <li>
        <input type="checkbox" value={packed} onChange={() => onPackItem(id)}/>
        <span style={packed ? {textDecoration:"line-through"} : {}}>
          {quantity} {description}
        </span>
        <button onClick={() => onDeleteItem(id)}>❌</button>
      </li>
    );
  }