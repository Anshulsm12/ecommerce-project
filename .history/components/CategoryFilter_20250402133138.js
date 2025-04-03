import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-full text-sm ${
            selectedCategory === null
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
