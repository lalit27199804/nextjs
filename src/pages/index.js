import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart, darkTheme }) => {
  const [watches, setWatches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      const data = await res.json();
      setWatches(data.watches);
    };
    fetchData();
  }, []);

  const filteredWatches = watches.filter(watch => {
    if (selectedCategory === 'all') return true;
    return watch.category === selectedCategory;
  });

  return (
    <div className={`min-h-screen ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`relative py-20 ${darkTheme ? 'bg-gray-800' : 'bg-blue-600'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${darkTheme ? 'text-white' : 'text-white'}`}>
                Crafting Timeless Legends
              </h1>
              <p className={`text-xl mb-8 ${darkTheme ? 'text-gray-300' : 'text-blue-100'}`}>
                Experience the perfect harmony of Swiss precision and contemporary design. 
                Elevate every moment with watches that tell more than just time.
              </p>
              <button className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                darkTheme ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}>
                <Link href='/products'>Explore Collections</Link> 
              </button>
            </div>
            <div className="md:w-1/2">
              <Image 
                src="https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D" 
                alt="Luxury Watch"
                width={700}
                height={300}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 ${darkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
            Why Choose TimeCraft
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${darkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🎖️</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                Swiss Craftsmanship
              </h3>
              <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Each timepiece is hand-assembled by master watchmakers with 100+ years of heritage
              </p>
            </div>

            <div className={`p-6 rounded-xl ${darkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🔋</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                5-Year Warranty
              </h3>
              <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Confidence in every tick with our comprehensive warranty coverage
              </p>
            </div>

            <div className={`p-6 rounded-xl ${darkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">💎</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
                Luxurious Materials
              </h3>
              <p className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                Premium sapphire crystal, 316L stainless steel, and genuine leather straps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 md:mb-0 ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
            Curated Collections
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : darkTheme 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('men')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'men' 
                  ? 'bg-blue-500 text-white' 
                  : darkTheme 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Men&apos;s Watches
            </button>
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'women' 
                  ? 'bg-blue-500 text-white' 
                  : darkTheme 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Women&apos;s Watches
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <ProductCard 
              key={watch.id} 
              product={watch} 
              addToCart={addToCart} 
              darkTheme={darkTheme}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-16 ${darkTheme ? 'bg-gray-800' : 'bg-blue-600'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className={`text-3xl font-bold mb-4 ${darkTheme ? 'text-white' : 'text-white'}`}>
              Join the TimeCraft Legacy
            </h2>
            <p className={`text-xl mb-8 ${darkTheme ? 'text-gray-300' : 'text-blue-100'}`}>
              Be the first to access limited editions, exclusive events, and personalized services
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  darkTheme 
                    ? 'bg-gray-700 text-white focus:ring-white' 
                    : 'bg-white text-gray-900 focus:ring-blue-500'
                }`}
              />
              <button className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                darkTheme 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-blue-700 text-white hover:bg-blue-800'
              }`}>
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;