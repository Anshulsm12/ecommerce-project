import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500">No products found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}