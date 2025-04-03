import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Safely extract categories only when products are available
  const categories = products?.length 
    ? ['All', ...new Set(products.map(product => product.category))] 
    : ['All'];

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle category filter
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.category === category)
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
            <div className="md:col-span-3">
              <ProductList products={filteredProducts} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}