import { useState } from 'react';
import Link from 'next/link';

const ProductCard = ({ product, index }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-green-600 dark:text-green-400 font-bold">
            ${product.price?.toFixed(2)}
          </span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors duration-200 active:scale-95 transform"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;