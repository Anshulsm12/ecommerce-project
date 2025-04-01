import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStore } from '../store/store';

export default function CartItem({ item }) {
  const [isLoading, setIsLoading] = useState(true);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className="relative h-20 w-20 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="animate-pulse h-full w-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        )}
      </div>
      
      <div className="flex-1 ml-4">
        <h3 className="text-md font-medium dark:text-white">{item.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="bg-gray-200 dark:bg-gray-700 rounded-full p-1"
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </motion.button>
        
        <span className="w-8 text-center dark:text-white">{item.quantity}</span>
        
        <motion.button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 dark:bg-gray-700 rounded-full p-1"
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </motion.button>
      </div>
      
      <div className="ml-6 text-right">
        <p className="font-medium dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
        <motion.button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 text-sm mt-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
}