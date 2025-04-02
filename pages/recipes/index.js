import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RecipeCard from '../../components/RecipeCard';
import FilterSidebar from '../../components/FilterSidebar';

/**
 * RecipesList component - displays a list of recipes with filtering options
 * Similar to eBay's product listings with sidebar filters and grid layout
 */
export default function RecipesList() {
  const router = useRouter();
  const { search, tag } = router.query;
  
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    cuisineType: tag ? [tag] : [],
    dietary: [],
    mealType: [],
    difficulty: '',
    cookingTime: '',
  });

  // Mock data for recipes
  const mockRecipes = [
    {
      id: '1',
      title: 'Classic Margherita Pizza',
      thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      authorName: 'John Smith',
      authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      duration: '45 min',
      difficulty: 'Medium',
      cuisineType: 'Italian',
      mealType: 'Dinner',
      tags: ['Italian', 'Pizza', 'Dinner'],
      dietary: [],
      cookingTime: '30to60',
      videoPreview: 'https://example.com/video1.mp4'
    },
    {
      id: '2',
      title: 'Spicy Thai Basil Chicken',
      thumbnail: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92',
      authorName: 'Emily Chen',
      authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      duration: '30 min',
      difficulty: 'Easy',
      cuisineType: 'Asian',
      mealType: 'Dinner',
      tags: ['Asian', 'Chicken', 'Spicy'],
      dietary: ['Gluten-Free'],
      cookingTime: '15to30',
      videoPreview: 'https://example.com/video2.mp4'
    },
    {
      id: '3',
      title: 'Chocolate Lava Cake',
      thumbnail: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
      authorName: 'Michael Brown',
      authorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      duration: '40 min',
      difficulty: 'Medium',
      cuisineType: 'American',
      mealType: 'Dessert',
      tags: ['Dessert', 'Chocolate', 'Cake'],
      dietary: ['Vegetarian'],
      cookingTime: '30to60',
      videoPreview: 'https://example.com/video3.mp4'
    },
    {
      id: '4',
      title: 'Mediterranean Grilled Vegetable Salad',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      authorName: 'Sarah Johnson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/66.jpg',
      duration: '25 min',
      difficulty: 'Easy',
      cuisineType: 'Mediterranean',
      mealType: 'Lunch',
      tags: ['Vegetarian', 'Salad', 'Healthy'],
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      cookingTime: '15to30',
      videoPreview: 'https://example.com/video4.mp4'
    },
    {
      id: '5',
      title: 'Creamy Mushroom Risotto',
      thumbnail: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371',
      authorName: 'David Wilson',
      authorAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      duration: '50 min',
      difficulty: 'Hard',
      cuisineType: 'Italian',
      mealType: 'Dinner',
      tags: ['Italian', 'Rice', 'Vegetarian'],
      dietary: ['Vegetarian'],
      cookingTime: '30to60',
      videoPreview: 'https://example.com/video5.mp4'
    },
    {
      id: '6',
      title: 'Homemade Beef Tacos',
      thumbnail: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
      authorName: 'Maria Rodriguez',
      authorAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      duration: '35 min',
      difficulty: 'Medium',
      cuisineType: 'Mexican',
      mealType: 'Dinner',
      tags: ['Mexican', 'Beef', 'Dinner'],
      dietary: [],
      cookingTime: '30to60',
      videoPreview: 'https://example.com/video6.mp4'
    },
    {
      id: '7',
      title: 'Fresh Berry Smoothie Bowl',
      thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      authorName: 'Jessica Lee',
      authorAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      duration: '15 min',
      difficulty: 'Easy',
      cuisineType: 'American',
      mealType: 'Breakfast',
      tags: ['Breakfast', 'Smoothie', 'Healthy'],
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      cookingTime: 'under15',
      videoPreview: 'https://example.com/video7.mp4'
    },
    {
      id: '8',
      title: 'Garlic Butter Shrimp Pasta',
      thumbnail: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
      authorName: 'Robert Taylor',
      authorAvatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      duration: '30 min',
      difficulty: 'Medium',
      cuisineType: 'Italian',
      mealType: 'Dinner',
      tags: ['Pasta', 'Seafood', 'Quick'],
      dietary: [],
      cookingTime: '15to30',
      videoPreview: 'https://example.com/video8.mp4'
    },
    {
      id: '9',
      title: 'Vegetarian Buddha Bowl',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      authorName: 'Rachel Green',
      authorAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      duration: '20 min',
      difficulty: 'Easy',
      cuisineType: 'Asian',
      mealType: 'Lunch',
      tags: ['Vegetarian', 'Bowl', 'Healthy'],
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
      cookingTime: '15to30',
      videoPreview: 'https://example.com/video9.mp4'
    },
    {
      id: '10',
      title: 'Slow Cooker Beef Stew',
      thumbnail: 'https://images.unsplash.com/photo-1608835291093-394b4a3a1a22',
      authorName: 'James Wilson',
      authorAvatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      duration: '6 hrs',
      difficulty: 'Easy',
      cuisineType: 'American',
      mealType: 'Dinner',
      tags: ['Beef', 'Slow Cooker', 'Winter'],
      dietary: ['Dairy-Free'],
      cookingTime: 'over60',
      videoPreview: 'https://example.com/video10.mp4'
    },
    {
      id: '11',
      title: 'Homemade Sourdough Bread',
      thumbnail: 'https://images.unsplash.com/photo-1585478259715-4aa351907a0e',
      authorName: 'Alice Thompson',
      authorAvatar: 'https://randomuser.me/api/portraits/women/76.jpg',
      duration: '3 hrs',
      difficulty: 'Hard',
      cuisineType: 'American',
      mealType: 'Breakfast',
      tags: ['Bread', 'Baking', 'Sourdough'],
      dietary: ['Vegetarian'],
      cookingTime: 'over60',
      videoPreview: 'https://example.com/video11.mp4'
    },
    {
      id: '12',
      title: 'Classic French Omelette',
      thumbnail: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2',
      authorName: 'Pierre Martin',
      authorAvatar: 'https://randomuser.me/api/portraits/men/82.jpg',
      duration: '10 min',
      difficulty: 'Medium',
      cuisineType: 'Mediterranean',
      mealType: 'Breakfast',
      tags: ['Eggs', 'French', 'Quick'],
      dietary: ['Vegetarian', 'Gluten-Free'],
      cookingTime: 'under15',
      videoPreview: 'https://example.com/video12.mp4'
    }
  ];

  // Load recipes on initial render
  useEffect(() => {
    // In a real app, you would fetch from an API here
    setTimeout(() => {
      setRecipes(mockRecipes);
      setFilteredRecipes(mockRecipes);
      setIsLoading(false);
    }, 500); // Simulate API delay
  }, []);

  // Handle URL query parameters
  useEffect(() => {
    if (search) {
      setSearchTerm(search);
    }
    
    if (tag && !currentFilters.cuisineType.includes(tag)) {
      setCurrentFilters(prev => ({
        ...prev,
        cuisineType: [...prev.cuisineType, tag]
      }));
    }
  }, [search, tag]);

  // Apply filters and search
  useEffect(() => {
    if (recipes.length === 0) return;
    
    let filtered = [...recipes];
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        recipe.cuisineType.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply cuisine filter
    if (currentFilters.cuisineType.length > 0) {
      filtered = filtered.filter(recipe => 
        currentFilters.cuisineType.includes(recipe.cuisineType)
      );
    }
    
    // Apply dietary restrictions filter
    if (currentFilters.dietary.length > 0) {
      filtered = filtered.filter(recipe => 
        currentFilters.dietary.every(diet => recipe.dietary.includes(diet))
      );
    }
    
    // Apply meal type filter
    if (currentFilters.mealType.length > 0) {
      filtered = filtered.filter(recipe => 
        currentFilters.mealType.includes(recipe.mealType)
      );
    }
    
    // Apply difficulty filter
    if (currentFilters.difficulty) {
      filtered = filtered.filter(recipe => 
        recipe.difficulty === currentFilters.difficulty
      );
    }
    
    // Apply cooking time filter
    if (currentFilters.cookingTime) {
      filtered = filtered.filter(recipe => 
        recipe.cookingTime === currentFilters.cookingTime
      );
    }
    
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, currentFilters]);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    setIsMobileFilterOpen(false);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Update URL query parameter (in a real app)
    router.push({
      pathname: '/recipes',
      query: { ...router.query, search: searchTerm }
    }, undefined, { shallow: true });
  };

  // Toggle mobile filters visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <>
      <Head>
        <title>Browse Recipes - Recipe Chef</title>
        <meta name="description" content="Browse and filter delicious recipes from around the world" />
      </Head>

      <div className="container-custom py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Browse Recipes
          </h1>
          
          {/* Mobile filter toggle */}
          <button 
            className="md:hidden inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={toggleMobileFilter}
          >
            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="flex rounded-md shadow-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md text-sm border-gray-300 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Search recipes..."
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={toggleMobileFilter}></div>
              <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-xl p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={toggleMobileFilter}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            </div>
          )}
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
          
          {/* Recipes Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg text-gray-600">Loading recipes...</span>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
                </div>
                <div className="recipe-grid">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 