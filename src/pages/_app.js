import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedCart = localStorage.getItem('cart');
    if (savedTheme) setDarkTheme(savedTheme === 'dark');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className={`min-h-screen ${darkTheme ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar 
        cartCount={cartCount} 
        toggleTheme={toggleTheme} 
        darkTheme={darkTheme}
      />
      <Component {...pageProps} addToCart={addToCart} cart={cart} setCart={setCart} darkTheme={darkTheme} />
    </div>
  );
}

export default MyApp;