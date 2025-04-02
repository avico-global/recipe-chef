import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * FilterSidebar component - displays filters for recipe listings
 * Supports locked cuisine types from URL path parameters
 */
const FilterSidebar = ({ onFilterChange, lockedCuisineType, initialFilters }) => {
  // Default filter state
  const [filters, setFilters] = useState(initialFilters || {
    cuisineType: [],
    dietary: [],
    mealType: [],
    difficulty: '',
    cookingTime: '',
  });

  // Initialize filters with props when component mounts or props change
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Toggle cuisine type checkboxes
  const handleCuisineChange = (e) => {
    const { value, checked } = e.target;
    
    // Don't allow unchecking the locked cuisine type
    if (value === lockedCuisineType && !checked) {
      return;
    }
    
    setFilters(prev => {
      const updatedCuisine = checked 
        ? [...prev.cuisineType, value]
        : prev.cuisineType.filter(type => type !== value);
      
      const updatedFilters = {
        ...prev,
        cuisineType: updatedCuisine
      };
      
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };

  // Toggle dietary restriction checkboxes
  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    
    setFilters(prev => {
      const updatedDietary = checked 
        ? [...prev.dietary, value]
        : prev.dietary.filter(type => type !== value);
      
      const updatedFilters = {
        ...prev,
        dietary: updatedDietary
      };
      
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };

  // Handle meal type checkboxes
  const handleMealTypeChange = (e) => {
    const { value, checked } = e.target;
    
    setFilters(prev => {
      const updatedMealType = checked 
        ? [...prev.mealType, value]
        : prev.mealType.filter(type => type !== value);
      
      const updatedFilters = {
        ...prev,
        mealType: updatedMealType
      };
      
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };

  // Handle radio button selections
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    
    setFilters(prev => {
      const updatedFilters = {
        ...prev,
        [name]: value
      };
      
      if (onFilterChange) {
        onFilterChange(updatedFilters);
      }
      
      return updatedFilters;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    const resetState = {
      cuisineType: lockedCuisineType ? [lockedCuisineType] : [],
      dietary: [],
      mealType: [],
      difficulty: '',
      cookingTime: '',
    };
    
    setFilters(resetState);
    
    if (onFilterChange) {
      onFilterChange(resetState);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Refine Results</h2>
          <button 
            onClick={resetFilters}
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
      
      <div className="p-5 space-y-6">
        {/* Cuisine Type */}
        <div className="filter-section">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Cuisine Type</h3>
          <div className="space-y-2">
            {['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian'].map((cuisine) => (
              <div key={cuisine} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <input
                    id={`cuisine-${cuisine}`}
                    name="cuisineType"
                    value={cuisine}
                    type="checkbox"
                    checked={filters.cuisineType.includes(cuisine)}
                    onChange={handleCuisineChange}
                    disabled={cuisine === lockedCuisineType}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label 
                    htmlFor={`cuisine-${cuisine}`} 
                    className={`ml-3 text-sm cursor-pointer ${
                      cuisine === lockedCuisineType 
                        ? 'text-primary font-medium' 
                        : filters.cuisineType.includes(cuisine)
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-600'
                    }`}
                  >
                    {cuisine}
                    {cuisine === lockedCuisineType && (
                      <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                        Locked
                      </span>
                    )}
                  </label>
                </div>
                <Link 
                  href={`/recipes/cuisine/${cuisine.toLowerCase()}`}
                  className="ml-auto text-xs text-primary hover:text-primary-hover opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View All
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dietary Restrictions */}
        <div className="filter-section pt-5 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Dietary Restrictions</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'].map((diet) => (
              <div key={diet} className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id={`diet-${diet}`}
                    name="dietary"
                    value={diet}
                    type="checkbox"
                    checked={filters.dietary.includes(diet)}
                    onChange={handleDietaryChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <label 
                  htmlFor={`diet-${diet}`} 
                  className={`ml-2 text-sm ${filters.dietary.includes(diet) ? 'font-medium text-gray-900' : 'text-gray-600'}`}
                >
                  {diet}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Meal Type */}
        <div className="filter-section pt-5 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Meal Type</h3>
          <div className="flex flex-wrap gap-2">
            {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'].map((meal) => (
              <label
                key={meal}
                htmlFor={`meal-${meal}`}
                className={`inline-flex items-center px-3 py-1.5 border ${
                  filters.mealType.includes(meal) 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                } rounded-full text-sm font-medium cursor-pointer transition-colors`}
              >
                <input
                  id={`meal-${meal}`}
                  name="mealType"
                  value={meal}
                  type="checkbox"
                  checked={filters.mealType.includes(meal)}
                  onChange={handleMealTypeChange}
                  className="sr-only"
                />
                {meal}
              </label>
            ))}
          </div>
        </div>
        
        {/* Difficulty */}
        <div className="filter-section pt-5 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Difficulty</h3>
          <div className="flex items-center space-x-4">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <label
                key={level}
                htmlFor={`difficulty-${level}`}
                className={`
                  px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer
                  ${filters.difficulty === level 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  transition-colors duration-200
                `}
              >
                <input
                  id={`difficulty-${level}`}
                  name="difficulty"
                  value={level}
                  type="radio"
                  checked={filters.difficulty === level}
                  onChange={handleRadioChange}
                  className="sr-only"
                />
                {level}
              </label>
            ))}
          </div>
        </div>
        
        {/* Cooking Time */}
        <div className="filter-section pt-5 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Cooking Time</h3>
          <div className="space-y-3">
            {[
              { value: 'under15', label: 'Under 15 minutes' },
              { value: '15to30', label: '15-30 minutes' },
              { value: '30to60', label: '30-60 minutes' },
              { value: 'over60', label: 'Over 60 minutes' }
            ].map((timeOption) => (
              <div key={timeOption.value} className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id={`time-${timeOption.value}`}
                    name="cookingTime"
                    value={timeOption.value}
                    type="radio"
                    checked={filters.cookingTime === timeOption.value}
                    onChange={handleRadioChange}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <label 
                  htmlFor={`time-${timeOption.value}`}
                  className={`ml-3 text-sm ${filters.cookingTime === timeOption.value ? 'font-medium text-gray-900' : 'text-gray-600'}`}
                >
                  {timeOption.label}
                </label>
                
                {filters.cookingTime === timeOption.value && (
                  <svg className="ml-2 h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Apply Filters Button (Mobile) */}
      <div className="px-5 pb-5 md:hidden">
        <button
          className="w-full py-3 bg-primary text-white rounded-lg shadow hover:bg-primary-hover transition-colors font-medium"
          onClick={() => onFilterChange && onFilterChange(filters)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 