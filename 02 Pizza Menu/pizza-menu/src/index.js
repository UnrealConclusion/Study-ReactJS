import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css'

function Pizza(){
    return (
        <div>
            <img src='pizzas/spinaci.jpg' alt='pizza'/>
            <h3>Spinaci Pizza</h3>
            <p>Tomato, mozarella, spinach, and ricotta cheese</p>
        </div>
    );
}

function Header(){
    return (
        <header className='header'>
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu(){ 
    return (
        <main className='menu'>
            <h2>Our Menu</h2>
            <Pizza/>
            <Pizza/>
            <Pizza/>
        </main>
    )
}

function Footer(){
    const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	
	const isOpen = hour >= openHour && hour <= closeHour;

    return <footer className='footer'>{new Date().toLocaleTimeString()}. We're currently open</footer>;
}

function App() {
    return (
        <div className='container'>
            <Header/>
            <Menu/>
            <Footer/>
        </div>
    );
}

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);