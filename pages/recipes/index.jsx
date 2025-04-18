import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RecipeCard from "../../components/RecipeCard";
import FilterSidebar from "../../components/FilterSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import recipesData from "../../data/recipes.json";
import { X } from "lucide-react";

/**
 * RecipesList component - displays a list of recipes with filtering options
 * Supports filtering via both query parameters and path segments (/recipes/cuisineType)
 */
export default function RecipesList({ cuisineTypeFromPath }) {
  const router = useRouter();
  const { search, tag, filter } = router.query;

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    cuisineType: cuisineTypeFromPath
      ? [cuisineTypeFromPath.toLowerCase()]
      : tag
      ? [tag.toLowerCase()]
      : [],
    dietary: [],
    mealType: [],
    difficulty: "",
    cookingTime: "",
  });

  // Load recipes on initial render
  useEffect(() => {
    // In a real app, you would fetch from an API here
    setTimeout(() => {
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
      setIsLoading(false);
    }, 500); // Simulate API delay
  }, []);

  // Process URL parameters to update filters
  useEffect(() => {
    if (!router.isReady) return;

    // Only run this if we actually have URL parameters
    if (Object.keys(router.query).length === 0 && !cuisineTypeFromPath) return;

    const newFilters = {
      cuisineType: cuisineTypeFromPath
        ? [cuisineTypeFromPath.toLowerCase()]
        : [],
      dietary: [],
      mealType: [],
      difficulty: "",
      cookingTime: "",
    };

    let filtersChanged = false;

    // Handle search parameter
    if (search && search !== searchTerm) {
      setSearchTerm(search);
      filtersChanged = true;
    }

    // Handle tag parameter
    if (
      tag &&
      !newFilters.cuisineType.some((c) => c.toLowerCase() === tag.toLowerCase())
    ) {
      newFilters.cuisineType.push(tag.toLowerCase());
      filtersChanged = true;
    }

    // Handle filter parameter (generic)
    if (filter) {
      if (typeof filter === "string") {
        filtersChanged =
          processFilterParameter(filter, newFilters) || filtersChanged;
      } else if (Array.isArray(filter)) {
        filter.forEach((f) => {
          filtersChanged =
            processFilterParameter(f, newFilters) || filtersChanged;
        });
      }
    }

    // Handle specific filter parameters
    const { cuisineType, mealType, dietary, difficulty, cookingTime } =
      router.query;

    // Process cuisineType parameter
    if (cuisineType && cuisineType !== cuisineTypeFromPath) {
      if (typeof cuisineType === "string") {
        if (
          !newFilters.cuisineType.some(
            (c) => c.toLowerCase() === cuisineType.toLowerCase()
          )
        ) {
          newFilters.cuisineType.push(cuisineType.toLowerCase());
          filtersChanged = true;
        }
      } else if (Array.isArray(cuisineType)) {
        cuisineType.forEach((c) => {
          if (
            !newFilters.cuisineType.some(
              (existing) => existing.toLowerCase() === c.toLowerCase()
            )
          ) {
            newFilters.cuisineType.push(c.toLowerCase());
            filtersChanged = true;
          }
        });
      }
    }

    // Process mealType parameter
    if (mealType) {
      if (typeof mealType === "string") {
        newFilters.mealType.push(mealType.toLowerCase());
        filtersChanged = true;
      } else if (Array.isArray(mealType)) {
        mealType.forEach((m) => {
          newFilters.mealType.push(m.toLowerCase());
          filtersChanged = true;
        });
      }
    }

    // Process dietary parameter
    if (dietary) {
      if (typeof dietary === "string") {
        newFilters.dietary.push(dietary.toLowerCase());
        filtersChanged = true;
      } else if (Array.isArray(dietary)) {
        dietary.forEach((d) => {
          newFilters.dietary.push(d.toLowerCase());
          filtersChanged = true;
        });
      }
    }

    // Process difficulty parameter
    if (difficulty) {
      newFilters.difficulty = difficulty.toLowerCase();
      filtersChanged = true;
    }

    // Process cookingTime parameter
    if (cookingTime) {
      newFilters.cookingTime = cookingTime;
      filtersChanged = true;
    }

    // Update current filters if changes were made
    if (filtersChanged) {
      setCurrentFilters(newFilters);
    }
  }, [
    router.isReady,
    router.query,
    cuisineTypeFromPath,
    search,
    tag,
    searchTerm,
  ]);

  // Helper function to process filter parameter values
  const processFilterParameter = (filterValue, filters) => {
    let changed = false;
    const filterValueLower = filterValue.toLowerCase();

    // Check if it's a cuisine type
    const cuisineTypes = [
      "italian",
      "asian",
      "american",
      "mediterranean",
      "mexican",
    ];
    if (cuisineTypes.includes(filterValueLower)) {
      if (
        !filters.cuisineType.some((c) => c.toLowerCase() === filterValueLower)
      ) {
        filters.cuisineType.push(filterValueLower);
        changed = true;
      }
    }
    // Check if it's a meal type
    else if (
      ["breakfast", "lunch", "dinner", "dessert"].includes(filterValueLower)
    ) {
      if (!filters.mealType.some((m) => m.toLowerCase() === filterValueLower)) {
        filters.mealType.push(filterValueLower);
        changed = true;
      }
    }
    // Check if it's a dietary restriction
    else if (
      ["vegetarian", "vegan", "gluten-free", "dairy-free"].includes(
        filterValueLower
      )
    ) {
      if (!filters.dietary.some((d) => d.toLowerCase() === filterValueLower)) {
        filters.dietary.push(filterValueLower);
        changed = true;
      }
    }
    // Check if it's a difficulty level
    else if (["easy", "medium", "hard"].includes(filterValueLower)) {
      if (filters.difficulty !== filterValueLower) {
        filters.difficulty = filterValueLower;
        changed = true;
      }
    }
    // Check if it's a cooking time
    else if (["under15", "15to30", "30to60", "over60"].includes(filterValue)) {
      if (filters.cookingTime !== filterValue) {
        filters.cookingTime = filterValue;
        changed = true;
      }
    }

    return changed;
  };

  // Apply filters and search
  useEffect(() => {
    if (recipes.length === 0) return;

    let filtered = [...recipes];

    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          recipe.cuisineType.toLowerCase().includes(searchLower)
      );
    }

    // Apply cuisine filter
    if (currentFilters.cuisineType.length > 0) {
      filtered = filtered.filter((recipe) =>
        currentFilters.cuisineType.some(
          (type) => type.toLowerCase() === recipe.cuisineType.toLowerCase()
        )
      );
    }

    // Apply dietary restrictions filter
    if (currentFilters.dietary.length > 0) {
      filtered = filtered.filter((recipe) =>
        currentFilters.dietary.every((diet) =>
          recipe.dietary.some(
            (recipeDiet) => recipeDiet.toLowerCase() === diet.toLowerCase()
          )
        )
      );
    }

    // Apply meal type filter
    if (currentFilters.mealType.length > 0) {
      filtered = filtered.filter((recipe) =>
        currentFilters.mealType.some(
          (type) => type.toLowerCase() === recipe.mealType.toLowerCase()
        )
      );
    }

    // Apply difficulty filter
    if (currentFilters.difficulty) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.difficulty.toLowerCase() ===
          currentFilters.difficulty.toLowerCase()
      );
    }

    // Apply cooking time filter
    if (currentFilters.cookingTime) {
      filtered = filtered.filter(
        (recipe) => recipe.cookingTime === currentFilters.cookingTime
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, currentFilters]);

  // Handle filter changes
  const handleFilterChange = (filters) => {
    // If we have a cuisine type from path, make sure it stays in the filters
    if (
      cuisineTypeFromPath &&
      !filters.cuisineType.some(
        (c) => c.toLowerCase() === cuisineTypeFromPath.toLowerCase()
      )
    ) {
      filters.cuisineType = [
        ...filters.cuisineType,
        cuisineTypeFromPath.toLowerCase(),
      ];
    }

    setCurrentFilters(filters);
    setIsMobileFilterOpen(false);
  };

  // Toggle mobile filters visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Reset all filters
  const handleClearFilters = () => {
    const clearedFilters = {
      cuisineType: cuisineTypeFromPath
        ? [cuisineTypeFromPath.toLowerCase()]
        : [],
      dietary: [],
      mealType: [],
      difficulty: "",
      cookingTime: "",
    };

    setSearchTerm("");
    setCurrentFilters(clearedFilters);

    // Also clear URL parameters while preserving path cuisine type
    const query = cuisineTypeFromPath
      ? { cuisineType: cuisineTypeFromPath }
      : {};
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
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
                    initialFilters={currentFilters}
                  />
                </div>
              </div>
            )}

            {/* Desktop Filter Sidebar */}
            <div className="hidden md:block md:w-1/4 flex-shrink-0">
              <div className="sticky top-5">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  lockedCuisineType={cuisineTypeFromPath}
                  initialFilters={currentFilters}
                />
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="flex-1">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
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
                    Clear Filters
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

                  {/* Active Filters Area */}
                  {(currentFilters.cuisineType.length > 0 ||
                    currentFilters.dietary.length > 0 ||
                    currentFilters.mealType.length > 0 ||
                    currentFilters.difficulty ||
                    currentFilters.cookingTime) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* Show cuisine type filters */}
                      {currentFilters.cuisineType.map((cuisine) => (
                        <button
                          key={`cuisine-${cuisine}`}
                          onClick={() => {
                            const newFilters = {...currentFilters};
                            newFilters.cuisineType = newFilters.cuisineType.filter(
                              c => c !== cuisine && c !== cuisine.toLowerCase()
                            );
                            handleFilterChange(newFilters);
                          }}
                          disabled={cuisine.toLowerCase() === cuisineTypeFromPath?.toLowerCase()}
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                            ${cuisine.toLowerCase() === cuisineTypeFromPath?.toLowerCase()
                              ? "bg-primary/20 text-primary/70 cursor-not-allowed"
                              : "bg-primary/10 text-primary hover:bg-primary/20"
                            }`}
                        >
                          {cuisine}
                          {cuisine.toLowerCase() !== cuisineTypeFromPath?.toLowerCase() && (
                            <X className="ml-1.5 h-3.5 w-3.5" />
                          )}
                        </button>
                      ))}
                      
                      {/* Show dietary filters */}
                      {currentFilters.dietary.map((diet) => (
                        <button
                          key={`diet-${diet}`}
                          onClick={() => {
                            const newFilters = {...currentFilters};
                            newFilters.dietary = newFilters.dietary.filter(d => d !== diet);
                            handleFilterChange(newFilters);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200"
                        >
                          {diet}
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      ))}
                      
                      {/* Show meal type filters */}
                      {currentFilters.mealType.map((meal) => (
                        <button
                          key={`meal-${meal}`}
                          onClick={() => {
                            const newFilters = {...currentFilters};
                            newFilters.mealType = newFilters.mealType.filter(m => m !== meal);
                            handleFilterChange(newFilters);
                          }}
                          className="inline-flex items-center px-3 py-1.5 hover:text-primary text-primary rounded-full text-sm font-medium "
                        >
                          {meal}
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      ))}
                      
                      {/* Show difficulty filter if set */}
                      {currentFilters.difficulty && (
                        <button
                          onClick={() => {
                            const newFilters = {...currentFilters};
                            newFilters.difficulty = "";
                            handleFilterChange(newFilters);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200"
                        >
                          {currentFilters.difficulty}
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      )}
                      
                      {/* Show cooking time filter if set */}
                      {currentFilters.cookingTime && (
                        <button
                          onClick={() => {
                            const newFilters = {...currentFilters};
                            newFilters.cookingTime = "";
                            handleFilterChange(newFilters);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200"
                        >
                          {currentFilters.cookingTime === "under15" ? "Under 15 min" :
                           currentFilters.cookingTime === "15to30" ? "15-30 min" :
                           currentFilters.cookingTime === "30to60" ? "30-60 min" : "Over 60 min"}
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      )}
                      
                      {/* Clear all filters button */}
                      {!cuisineTypeFromPath || 
                       currentFilters.dietary.length > 0 || 
                       currentFilters.mealType.length > 0 || 
                       currentFilters.difficulty || 
                       currentFilters.cookingTime || 
                       currentFilters.cuisineType.length > (cuisineTypeFromPath ? 1 : 0) ? (
                        <button
                          onClick={handleClearFilters}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200"
                        >
                          Clear all
                          <X className="ml-1.5 h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </div>
                  )}

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
                            <div>
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
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {recipe.description}
                              </p>
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-x-4 gap-y-2">
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  {recipe.duration ||
                                    (recipe.prepTime && recipe.cookTime
                                      ? `${
                                          recipe.prepTime + recipe.cookTime
                                        } mins`
                                      : "N/A")}
                                </span>
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                  </svg>
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
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 mr-1 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                  {recipe.servings} servings
                                </span>
                              </div>
                              <a
                                href={`/recipes/${recipe.id}`}
                                className="inline-flex items-center px-4 py-2 font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
                              >
                                View Recipe
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 ml-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      Load More Recipes
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
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
