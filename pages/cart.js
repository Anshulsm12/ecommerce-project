// pages/cart.js (Cart Page)
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/store';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { cart, clearCart, getCartTotal } = useStore();
  
  // Calculate totals
  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? 10 : 0;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% discount if subtotal is over $100
  const total = subtotal + shipping - discount;
  
  return (
    <>
      <Head>
        <title>Your Cart - GROWTHZI</title>
        <meta name="description" content="Review your shopping cart" />
      </Head>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-xl font-semibold mt-4 mb-2 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/">
            <motion.a 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
            
            <div className="mt-6 flex justify-between">
              <motion.button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Cart
              </motion.button>
              
              <Link href="/">
                <motion.a 
                  className="text-green-500 hover:text-green-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.a>
              </Link>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium dark:text-white">${shipping.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold dark:text-white">Total</span>
                    <span className="font-bold text-xl dark:text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>
              
              <div className="mt-4 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}