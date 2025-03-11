import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ cartCount, toggleTheme, darkTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className={`${darkTheme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        <Link href="/" className="text-3xl font-bold flex items-center">
  <div className="h-12 w-16">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full text-blue-600" // Change color with Tailwind text-color classes
      aria-hidden="true"
    >
      {/* Watch face */}
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      
      {/* Watch crown */}
      <rect x="11" y="2" width="2" height="4" rx="1" fill="currentColor" />
      
      {/* Watch strap connectors */}
      <path 
        d="M8 16L5 20H19L16 16" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
      />
    </svg>
  </div>
  TimeCraft
</Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
            <Link href="/cart" className="flex items-center hover:text-blue-500">
              <FiShoppingCart className="mr-1" /> Cart ({cartCount})
            </Link>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkTheme ? <FiSun /> : <FiMoon />}
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-blue-500">Logout</button>
            ) : (
              <Link href="/login" className="hover:text-blue-500">Login</Link>
            )}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
            <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
            <Link href="/cart" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Cart ({cartCount})</Link>
            <button onClick={toggleTheme} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkTheme ? 'Light Theme' : 'Dark Theme'}
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
            ) : (
              <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;