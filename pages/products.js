import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStore } from '../../store/store';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { products, fetchProducts, addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  useEffect(() => {
    if (!products.length) {
      fetchProducts();
    }
    
    if (id && products.length) {
      const foundProduct = products.find(p => p.id.toString() === id);
      setProduct(foundProduct);
      setIsLoading(false);
    }
  }, [id, products, fetchProducts]);
  
  const handleMouseMove = (e) => {
    if (!showZoom) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setZoomPosition({ x, y });
  };
  
  const getProductImages = () => {
    if (!product) return [];
    return [
      product.image,
      `${product.image}?v=2`,
      `${product.image}?v=3`,
      `${product.image}?v=4`,
    ];
  };
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (isLoading || !product) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  const productImages = getProductImages();

  return (
    <>
      <Head>
        <title>{product.title} - GROWTHZI</title>
        <meta name="description" content={product.description} />
      </Head>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product images */}
        <div>
          <div 
            className="relative h-96 bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <Image
              src={productImages[activeImage]}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-200"
              style={{
                transform: showZoom 
                  ? `scale(2) translate(${50 - zoomPosition.x * 100}%, ${50 - zoomPosition.y * 100}%)`
                  : 'scale(1) translate(0%, 0%)'
              }}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            {productImages.map((img, index) => (
              <motion.div
                key={index}
                className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeImage === index 
                    ? 'border-green-500' 
                    : 'border-transparent'
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Product info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.round(product.rating?.rate || 0) 
                      ? 'text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 dark:text-white">Quantity</h2>
            <div className="flex items-center">
              <motion.button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                whileTap={{ scale: 0.95 }}
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </motion.button>
              
              <span className="w-12 text-center mx-4 text-xl dark:text-white">{quantity}</span>
              
              <motion.button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 dark:bg-gray-700 rounded-full p-2"
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </motion.button>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Free shipping</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">Secure payment</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">30-day returns</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
