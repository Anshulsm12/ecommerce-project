import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';
import ProductSkeleton from '../components/ProductSkeleton';
import ErrorDisplay from '../components/ErrorDisplay';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // Use state to store the initial timestamp
  const [lastUpdate] = useState(() => {
    // Format the date consistently
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  });

  const fetchProducts = async (pageNum) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=10&page=${pageNum}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      setProducts(prev => pageNum === 1 ? data : [...prev, ...data]);
      setFilteredProducts(prev => {
        const newProducts = pageNum === 1 ? data : [...prev, ...data];
        return selectedCategory === 'All' 
          ? newProducts 
          : newProducts.filter(product => product.category === selectedCategory);
      });
      
      setHasMore(data.length === 10);
    } catch (error) {
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
    
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shop Our Products</h1>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdate}
          </span>
        </div>
        
        {error ? (
          <ErrorDisplay 
            message={error}
            onRetry={() => fetchProducts(page)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CategoryFilter 
                categories={products?.length 
                  ? ['All', ...new Set(products.map(product => product.category))] 
                  : ['All']}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
            <div className="md:col-span-3">
              <ProductList 
                products={filteredProducts}
                onLoadMore={loadMore}
                hasMore={hasMore}
              />
              
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {[...Array(6)].map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}