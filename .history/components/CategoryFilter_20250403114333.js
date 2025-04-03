export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        className={`px-4 py-2 rounded-full transition-colors duration-200 ${
          selectedCategory === 'all'
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={() => onSelectCategory('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            selectedCategory === category
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}