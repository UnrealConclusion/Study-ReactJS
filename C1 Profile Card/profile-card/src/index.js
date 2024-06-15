import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import profileData from './data.js';

function Card({name, avatar, description, skills}){
  return (
    <div className='card'>
      <img className='avatar' src={avatar} alt='peter'/>
      <div className='data'>
        <h1>{name}</h1>
        <p>{description}</p>
        <div className='skill-list'>
          {skills.map(({skill, color, emoji}, i) => <span className='skill' style={{backgroundColor: color}}>{skill} {emoji}</span>)}
        </div>
      </div>
    </div>
  )
}

function App(){
  return (
    profileData.map(profile => 
      <Card 
      name={profile.name}
      avatar={profile.avatar}
      description={profile.description}
      skills={profile.skills}/>
    )
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
