import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css'
import pizzaData from './data.js'

function Pizza({pizzaObject}){
	return (
		<div className={`pizza ${pizzaObject.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObject.photoName} alt={pizzaObject.name}/>
			<div>
				<h3>{pizzaObject.name}</h3>
				<p>{pizzaObject.ingredients}</p>
				<span>{pizzaObject.soldOut ? "Sold Out" : pizzaObject.price}</span>
			</div>
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
		
		{pizzaData.length > 0 ? (
			<React.Fragment>
				<p>Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
				<ul className="pizzas">
					{pizzaData.map(pizza => (
						<Pizza pizzaObject={pizza} key={pizza.name}/>
					))}
				</ul>
			</React.Fragment>
			):(
				<p>We're still working on our menu. Please come back later!</p>
		)}
		</main>
	)
}

function Footer(){
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	
	const isOpen = hour >= openHour && hour <= closeHour;

  return <footer className='footer'>
	  {isOpen ? (
		<Order closeHour={closeHour}/>
	  ):(
		<p>We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>
	  )}
	  </footer>;
}

function Order({closeHour}){
	return (
		<div className='order'>
			<p>We're opened until {closeHour}:00. Come vist us or order online.</p>
			<button className='btn'>Order</button>
		</div>
)}

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