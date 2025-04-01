import { useState } from 'react';

/**
 * FilterSidebar component - displays filters for recipe listings
 * Inspired by eBay's product filtering sidebar
 */
const FilterSidebar = ({ onFilterChange }) => {
  // Default filter state
  const [filters, setFilters] = useState({
    cuisineType: [],
    dietary: [],
    mealType: [],
    difficulty: '',
    cookingTime: '',
  });

  // Toggle cuisine type checkboxes
  const handleCuisineChange = (e) => {
    const { value, checked } = e.target;
    
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
      cuisineType: [],
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
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary-hover"
        >
          Reset All
        </button>
      </div>
      
      {/* Cuisine Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Cuisine Type</h3>
        <div className="space-y-2">
          {['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian'].map((cuisine) => (
            <div key={cuisine} className="flex items-center">
              <input
                id={`cuisine-${cuisine}`}
                name="cuisineType"
                value={cuisine}
                type="checkbox"
                checked={filters.cuisineType.includes(cuisine)}
                onChange={handleCuisineChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`cuisine-${cuisine}`} className="ml-2 text-sm text-gray-600">
                {cuisine}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dietary Restrictions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
        <div className="space-y-2">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'].map((diet) => (
            <div key={diet} className="flex items-center">
              <input
                id={`diet-${diet}`}
                name="dietary"
                value={diet}
                type="checkbox"
                checked={filters.dietary.includes(diet)}
                onChange={handleDietaryChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`diet-${diet}`} className="ml-2 text-sm text-gray-600">
                {diet}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Meal Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Meal Type</h3>
        <div className="space-y-2">
          {['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'].map((meal) => (
            <div key={meal} className="flex items-center">
              <input
                id={`meal-${meal}`}
                name="mealType"
                value={meal}
                type="checkbox"
                checked={filters.mealType.includes(meal)}
                onChange={handleMealTypeChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`meal-${meal}`} className="ml-2 text-sm text-gray-600">
                {meal}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Difficulty */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h3>
        <div className="space-y-2">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <div key={level} className="flex items-center">
              <input
                id={`difficulty-${level}`}
                name="difficulty"
                value={level}
                type="radio"
                checked={filters.difficulty === level}
                onChange={handleRadioChange}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`difficulty-${level}`} className="ml-2 text-sm text-gray-600">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Cooking Time */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Cooking Time</h3>
        <div className="space-y-2">
          {[
            { value: 'under15', label: 'Under 15 minutes' },
            { value: '15to30', label: '15-30 minutes' },
            { value: '30to60', label: '30-60 minutes' },
            { value: 'over60', label: 'Over 60 minutes' }
          ].map((timeOption) => (
            <div key={timeOption.value} className="flex items-center">
              <input
                id={`time-${timeOption.value}`}
                name="cookingTime"
                value={timeOption.value}
                type="radio"
                checked={filters.cookingTime === timeOption.value}
                onChange={handleRadioChange}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`time-${timeOption.value}`} className="ml-2 text-sm text-gray-600">
                {timeOption.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Apply Filters Button (Mobile) */}
      <div className="md:hidden pt-2">
        <button
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          onClick={() => onFilterChange && onFilterChange(filters)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 