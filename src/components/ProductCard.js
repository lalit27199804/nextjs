import Link from 'next/link';

const ProductCard = ({ product, addToCart, darkTheme }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${darkTheme ? 'bg-gray-800' : 'bg-white'}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-500 mb-4">${product.price}</p>
      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"><Link href={`/products/${product.id}`}>
          View Details
        </Link></button>
        
        <button 
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;