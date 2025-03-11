import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import watchData from '../../data/data'

const ProductDetail = ({ addToCart, darkTheme }) => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
      // const data = await res.json();
      const data = watchData
      const foundProduct = data.watches.find(w => w.id === parseInt(id));
      setProduct(foundProduct);
    };
    fetchData();
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link href='/products'>
        <button
          className={`mb-8 flex items-center text-gray-600 ${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50'} hover:text-gray-900`}
        >
          
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Products
         
        </button> </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'}">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-center object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`h-5 w-5 ${
                          product.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </p>
                <p className="text-gray-500 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>SKU: {product.sku}</span>
                  <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                  <span>Brand: {product.brand}</span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  addToCart({ ...product, quantity });
                  setQuantity(1);
                }}
                className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">2-Year Warranty</h3>
                <p className="text-gray-500 mt-1">Comprehensive manufacturer warranty covering all components</p>
              </div>
            </div>
            {/* Add more features as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;