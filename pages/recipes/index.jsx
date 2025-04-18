import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RecipeCard from "../../components/RecipeCard";
import FilterSidebar from "../../components/FilterSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import recipesData from "../../data/recipes.json";
import { X, Heart, Clock, FileText, ChevronDown, ArrowRight, Users } from "lucide-react";

/**
 * RecipesList component - displays a list of recipes with filtering options
 * Supports filtering via both query parameters and path segments (/recipes/cuisineType)
 */
export default function RecipesList({ cuisineTypeFromPath }) {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Simplified filter state
  const [filters, setFilters] = useState({
    search: "",
    cuisineType: cuisineTypeFromPath ? [cuisineTypeFromPath.toLowerCase()] : [],
    dietary: [],
    mealType: [],
    difficulty: "",
    cookingTime: "",
  });

  // Load initial recipes
  useEffect(() => {
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
      setIsLoading(false);
  }, []);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('recipeFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Handle URL query parameters
  useEffect(() => {
    if (!router.isReady) return;

    const newFilters = {
      search: router.query.search || "",
      cuisineType: cuisineTypeFromPath
        ? [cuisineTypeFromPath.toLowerCase()]
        : [],
      dietary: [],
      mealType: [],
      difficulty: "",
      cookingTime: "",
    };

    // Process query parameters
    Object.entries(router.query).forEach(([key, value]) => {
      if (!value) return;

      switch (key) {
        case "cuisineType":
          if (!cuisineTypeFromPath) {
            newFilters.cuisineType = Array.isArray(value)
              ? value.map((v) => v.toLowerCase())
              : [value.toLowerCase()];
          }
          break;
        case "dietary":
          newFilters.dietary = Array.isArray(value)
            ? value.map((v) => v.toLowerCase())
            : [value.toLowerCase()];
          break;
        case "mealType":
          newFilters.mealType = Array.isArray(value)
            ? value.map((v) => v.toLowerCase())
            : [value.toLowerCase()];
          break;
        case "difficulty":
          newFilters.difficulty = value.toLowerCase();
          break;
        case "cookingTime":
          newFilters.cookingTime = value;
          break;
      }
    });

    setFilters(newFilters);
  }, [router.isReady, router.query, cuisineTypeFromPath]);

  // Apply filters to recipes
  useEffect(() => {
    if (recipes.length === 0) return;

    let filtered = [...recipes];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          recipe.cuisineType.toLowerCase().includes(searchTerm)
      );
    }

    // Apply cuisine filter
    if (filters.cuisineType.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.cuisineType.includes(recipe.cuisineType.toLowerCase())
      );
    }

    // Apply dietary filter
    if (filters.dietary.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.dietary.every((diet) =>
          recipe.dietary.some((d) => d.toLowerCase() === diet)
        )
      );
    }

    // Apply meal type filter
    if (filters.mealType.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.mealType.includes(recipe.mealType.toLowerCase())
      );
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty.toLowerCase() === filters.difficulty
      );
    }

    // Apply cooking time filter
    if (filters.cookingTime) {
      filtered = filtered.filter(
        (recipe) => recipe.cookingTime === filters.cookingTime
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, filters]);

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const query = {};

    if (newFilters.search) query.search = newFilters.search;
    if (newFilters.cuisineType.length > 0 && !cuisineTypeFromPath) {
      query.cuisineType = newFilters.cuisineType;
    }
    if (newFilters.dietary.length > 0) query.dietary = newFilters.dietary;
    if (newFilters.mealType.length > 0) query.mealType = newFilters.mealType;
    if (newFilters.difficulty) query.difficulty = newFilters.difficulty;
    if (newFilters.cookingTime) query.cookingTime = newFilters.cookingTime;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  // Handle filter changes from FilterSidebar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    updateURL(newFilters);
    setIsMobileFilterOpen(false);
  };

  // Handle search input
  const handleSearchChange = (searchTerm) => {
    const newFilters = { ...filters, search: searchTerm };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      cuisineType: cuisineTypeFromPath
        ? [cuisineTypeFromPath.toLowerCase()]
        : [],
      dietary: [],
      mealType: [],
      difficulty: "",
      cookingTime: "",
    };

    setFilters(clearedFilters);
    updateURL(clearedFilters);
  };

  // Toggle mobile filters visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Toggle favorite status for a recipe
  const toggleFavorite = (recipeId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter(id => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
  };

  return (
    <>
      <Head>
        <title>
          {cuisineTypeFromPath
            ? `${cuisineTypeFromPath} Recipes -  Recipe Picks`
            : "Browse Recipes - Recipe Picks"}
        </title>
        <meta
          name="description"
          content={
            cuisineTypeFromPath
              ? `Browse delicious ${cuisineTypeFromPath} recipes from around the world`
              : "Browse and filter delicious recipes from around the world"
          }
        />
      </Head>
      <Navbar />

      <div className="w-full bg-gray-50">
        <div className="container mx-auto py-8 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Mobile Filter Sidebar */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-40 md:hidden overflow-hidden">
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={toggleMobileFilter}
                ></div>
                <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={toggleMobileFilter}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    lockedCuisineType={cuisineTypeFromPath}
                    initialFilters={filters}
                  />
                </div>
              </div>
            )}

            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block md:w-1/5 flex-shrink-0">
              <div className="sticky top-5">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  lockedCuisineType={cuisineTypeFromPath}
                  initialFilters={filters}
                />
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="flex-1">
              {/* Display active filters regardless of results */}
              {(filters.cuisineType.length > 0 ||
                filters.dietary.length > 0 ||
                filters.mealType.length > 0 ||
                filters.difficulty ||
                filters.cookingTime ||
                filters.search) && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      Active Filters
                    </h3>
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-primary hover:text-primary-hover underline"
                    >
                      Clear All Filters
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* Show search filter if set */}
                    {filters.search && (
                      <button
                        onClick={() => {
                          const newFilters = { ...filters, search: "" };
                          handleFilterChange(newFilters);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                      >
                        Search: {filters.search}
                        <X className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    )}

                    {/* Show cuisine type filters */}
                    {filters.cuisineType.map((cuisine) => (
                      <button
                        key={`cuisine-${cuisine}`}
                        onClick={() => {
                          const newFilters = { ...filters };
                          newFilters.cuisineType =
                            newFilters.cuisineType.filter(
                              (c) =>
                                c !== cuisine && c !== cuisine.toLowerCase()
                            );
                          handleFilterChange(newFilters);
                        }}
                        disabled={
                          cuisine.toLowerCase() ===
                          cuisineTypeFromPath?.toLowerCase()
                        }
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                          ${
                            cuisine.toLowerCase() ===
                            cuisineTypeFromPath?.toLowerCase()
                              ? "bg-primary/20 text-primary/70 cursor-not-allowed"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                          }`}
                      >
                        {cuisine}
                        {cuisine.toLowerCase() !==
                          cuisineTypeFromPath?.toLowerCase() && (
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        )}
                      </button>
                    ))}

                    {/* Show dietary filters */}
                    {filters.dietary.map((diet) => (
                      <button
                        key={`diet-${diet}`}
                        onClick={() => {
                          const newFilters = { ...filters };
                          newFilters.dietary = newFilters.dietary.filter(
                            (d) => d !== diet
                          );
                          handleFilterChange(newFilters);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200"
                      >
                        {diet}
                        <X className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    ))}

                    {/* Show meal type filters */}
                    {filters.mealType.map((meal) => (
                      <button
                        key={`meal-${meal}`}
                        onClick={() => {
                          const newFilters = { ...filters };
                          newFilters.mealType = newFilters.mealType.filter(
                            (m) => m !== meal
                          );
                          handleFilterChange(newFilters);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200"
                      >
                        {meal}
                        <X className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    ))}

                    {/* Show difficulty filter if set */}
                    {filters.difficulty && (
                      <button
                        onClick={() => {
                          const newFilters = { ...filters };
                          newFilters.difficulty = "";
                          handleFilterChange(newFilters);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200"
                      >
                        {filters.difficulty}
                        <X className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    )}

                    {/* Show cooking time filter if set */}
                    {filters.cookingTime && (
                      <button
                        onClick={() => {
                          const newFilters = { ...filters };
                          newFilters.cookingTime = "";
                          handleFilterChange(newFilters);
                        }}
                        className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200"
                      >
                        {filters.cookingTime === "under15"
                          ? "Under 15 min"
                          : filters.cookingTime === "15to30"
                          ? "15-30 min"
                          : filters.cookingTime === "30to60"
                          ? "30-60 min"
                          : "Over 60 min"}
                        <X className="ml-1.5 h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="flex flex-col justify-center items-center py-24 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
                    <div className="w-16 h-16 border-t-4 border-primary/30 rounded-full absolute top-0 left-0 animate-ping"></div>
                  </div>
                  <span className="text-lg text-gray-600 font-medium">
                    Loading delicious recipes...
                  </span>
                </div>
              ) : filteredRecipes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-6">
                    <Users className="h-12 w-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    No recipes found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Can&apos;t find what you&apos;re looking for? Try adjusting
                    your filters or search for something different.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {filteredRecipes.length}
                      </span>{" "}
                      {filteredRecipes.length === 1 ? "recipe" : "recipes"}
                    </p>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="text-sm border-gray-300 rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                        <option>Most Popular</option>
                        <option>Newest</option>
                        <option>Cook Time</option>
                      </select>
                    </div>
                  </div>

                  {/* Recipe cards display */}
                  <div className="flex flex-col space-y-6">
                    {filteredRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="md:flex h-full">
                          <div className="md:w-2/5 flex-shrink-0 relative">
                            <img
                              src={recipe.thumbnail}
                              alt={recipe.title}
                              className="w-full h-full object-cover md:absolute md:inset-0"
                              style={{ minHeight: "200px" }}
                            />
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                              {recipe.dietary &&
                                recipe.dietary.slice(0, 2).map((diet, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 text-xs font-semibold bg-black/70 text-white rounded-lg backdrop-blur-sm"
                                  >
                                    {diet}
                                  </span>
                                ))}
                            </div>
                          </div>
                          <div className="p-6 md:w-3/5 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                              <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                  {recipe.cuisineType}
                                </span>
                                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                  {recipe.mealType}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors">
                                {recipe.title}
                              </h3>
                              </div>
                              
                              {/* Add favorite button to the top-right of content area */}
                              <button
                                onClick={() => toggleFavorite(recipe.id)}
                                className={`h-10 w-10 ml-2 flex-shrink-0 flex items-center justify-center rounded-full transition-colors cursor-pointer
                                  ${favorites.includes(recipe.id) 
                                    ? 'bg-red-500 text-white' 
                                    : 'bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white'}`}
                                aria-label={favorites.includes(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                              >
                                <Heart
                                  className="h-5 w-5"
                                  fill={favorites.includes(recipe.id) ? "currentColor" : "none"}
                                />
                              </button>
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {recipe.description}
                            </p>

                            <div>
                              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-x-4 gap-y-2">
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                  {recipe.duration ||
                                    (recipe.prepTime && recipe.cookTime
                                      ? `${recipe.prepTime + recipe.cookTime} mins`
                                      : "N/A")}
                                </span>
                                <span className="flex items-center">
                                  <FileText className="h-4 w-4 mr-1 text-gray-400" />
                                  <span
                                    className={`capitalize ${
                                      recipe.difficulty === "easy"
                                        ? "text-green-600"
                                        : recipe.difficulty === "hard"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                    }`}
                                  >
                                    {recipe.difficulty}
                                  </span>
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                              <a
                                href={`/recipes/${recipe.id}`}
                                className="inline-flex items-center px-4 py-2 font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
                              >
                                View Recipe
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Load More Recipes
                      <ChevronDown className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Footer />
      </div>
    </>
  );
}
