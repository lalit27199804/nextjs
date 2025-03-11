import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductCard from '../../components/ProductCard';

const Products = ({ addToCart, darkTheme }) => {
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
              Men's Watches
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
              Women's Watches
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
    </div>
  );
};

export default Products;