import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '../store/store';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  const cart = useStore((state) => state.cart);
  const [theme, setTheme] = useState('light');
  
  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };
  
  // Check for saved theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer" 
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold text-green-500">GROWTHZI</span>
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-6">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            
            <Link href="/cart">
              <motion.div 
                className="relative cursor-pointer" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 GROWTHZI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}