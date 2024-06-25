import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({children, onClick}) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(show => !show);
    setSelected(null);
  }

  function handleAddFriend(newFriend){
    setFriends([...friends, newFriend]);
  }

  function handleSelection(friend) {
    setSelected((current) => current?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(paidByFriend) {
    setFriends(friends.map((friend) => friend.id === selected.id ? {...friend, balance: friend.balance + paidByFriend} : friend));
    setSelected(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} selected={selected} onSelection={handleSelection}/>
        {showAddFriend ? <FormAddFriend onAddFriend={handleAddFriend}/> : ""}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      {selected ? <FormSplitBill friend={selected} onSplitBill={handleSplitBill}/> : ""}
    </div>
  );
}

function FriendList({friends, selected, onSelection}) {
  return (
    <ul>
      {friends.map((friend) => <Friend key={friend.id} friend={friend} selected={selected} onSelection={onSelection}/>)}
    </ul>
  );
}

function Friend({friend, selected, onSelection}) {
  const isSelected = friend.id === selected?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {
        friend.balance === 0 && <p>You and {friend.name} are even</p>
      }
      {
        friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>
      }
      {
        friend.balance > 0 && <p className="green">{friend.name} owes ${Math.abs(friend.balance)}</p>
      }
      <Button onClick={() => onSelection(friend)}>{isSelected ? "close" : "Select"}</Button>
    </li>
  );
}

function FormAddFriend({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image){
      return
    }

    const id = crypto.randomUUID();
    const newFriend = {
      id, 
      name, 
      image: `${image}?=${id}`,
      balance: 0
    }

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <label>🖼️ Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({friend, onSplitBill}) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!bill || !paidByUser || paidByUser < 0) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {friend.name}</h2>

      <label>💰 Bill Value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

      <label>🧍‍♀️ Your expense</label>
      <input type="text" value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value) )}/>

      <label>👫 {friend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}/>

      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split Bill</Button>
    </form>
  );
}