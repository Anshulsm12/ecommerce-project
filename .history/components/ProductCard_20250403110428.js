import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useStore } from '../store/store';

export default function ProductCard({ product }) {
  const addToCart = useStore((state) => state.addToCart);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 w-full overflow-hidden">
          {/* Replace Next.js Image with regular img tag */}
          <img
            src={product.image}
            alt={product.title || product.name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <svg className="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {product.title || product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-green-600 dark:text-green-400 font-bold">${(product.price || 0).toFixed(2)}</span>
          <motion.button
            onClick={() => addToCart(product)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}