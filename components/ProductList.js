import { useRef, useCallback } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onLoadMore, hasMore }) => {
  const observer = useRef();
  
  const lastProductElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, onLoadMore]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-100 transition-opacity duration-300">
      {products.map((product, index) => (
        <div
          key={product.id}
          ref={index === products.length - 1 ? lastProductElementRef : null}
          className="transform transition-transform duration-300 ease-in-out"
          style={{
            animationDelay: `${index * 100}ms`,
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out forwards'
          }}
        >
          <ProductCard 
            product={product}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;