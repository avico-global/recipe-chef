import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import RecipeCard from "../../components/RecipeCard";
import FilterSidebar from "../../components/FilterSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * RecipesList component - displays a list of recipes with filtering options
 * Supports filtering via both query parameters and path segments (/recipes/cuisineType)
 */
export default function RecipesList({ cuisineTypeFromPath }) {
  const router = useRouter();
  const { search, tag } = router.query;

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    cuisineType: cuisineTypeFromPath ? [cuisineTypeFromPath] : tag ? [tag] : [],
    dietary: [],
    mealType: [],
    difficulty: "",
    cookingTime: "",
  });

  // Mock data for recipes
  const mockRecipes = [
    {
      id: "1",
      title: "Classic Margherita Pizza",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      authorName: "John Smith",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      duration: "45 min",
      difficulty: "Medium",
      cuisineType: "Italian",
      mealType: "Dinner",
      tags: ["Italian", "Pizza", "Dinner"],
      dietary: [],
      cookingTime: "30to60",
      videoPreview: "https://example.com/video1.mp4",
    },
    {
      id: "2",
      title: "Spicy Thai Basil Chicken",
      thumbnail: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
      authorName: "Emily Chen",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      duration: "30 min",
      difficulty: "Easy",
      cuisineType: "Asian",
      mealType: "Dinner",
      tags: ["Asian", "Chicken", "Spicy"],
      dietary: ["Gluten-Free"],
      cookingTime: "15to30",
      videoPreview: "https://example.com/video2.mp4",
    },
    {
      id: "3",
      title: "Chocolate Lava Cake",
      thumbnail: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      authorName: "Michael Brown",
      authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      duration: "40 min",
      difficulty: "Medium",
      cuisineType: "American",
      mealType: "Dessert",
      tags: ["Dessert", "Chocolate", "Cake"],
      dietary: ["Vegetarian"],
      cookingTime: "30to60",
      videoPreview: "https://example.com/video3.mp4",
    },
    {
      id: "4",
      title: "Mediterranean Grilled Vegetable Salad",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      authorName: "Sarah Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/women/66.jpg",
      duration: "25 min",
      difficulty: "Easy",
      cuisineType: "Mediterranean",
      mealType: "Lunch",
      tags: ["Vegetarian", "Salad", "Healthy"],
      dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
      cookingTime: "15to30",
      videoPreview: "https://example.com/video4.mp4",
    },
    {
      id: "5",
      title: "Creamy Mushroom Risotto",
      thumbnail: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
      authorName: "David Wilson",
      authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      duration: "50 min",
      difficulty: "Hard",
      cuisineType: "Italian",
      mealType: "Dinner",
      tags: ["Italian", "Rice", "Vegetarian"],
      dietary: ["Vegetarian"],
      cookingTime: "30to60",
      videoPreview: "https://example.com/video5.mp4",
    },
    {
      id: "6",
      title: "Homemade Beef Tacos",
      thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
      authorName: "Maria Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      duration: "35 min",
      difficulty: "Medium",
      cuisineType: "Mexican",
      mealType: "Dinner",
      tags: ["Mexican", "Beef", "Dinner"],
      dietary: [],
      cookingTime: "30to60",
      videoPreview: "https://example.com/video6.mp4",
    },
    {
      id: "7",
      title: "Fresh Berry Smoothie Bowl",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      authorName: "Jessica Lee",
      authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
      duration: "15 min",
      difficulty: "Easy",
      cuisineType: "American",
      mealType: "Breakfast",
      tags: ["Breakfast", "Smoothie", "Healthy"],
      dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
      cookingTime: "under15",
      videoPreview: "https://example.com/video7.mp4",
    },
    {
      id: "8",
      title: "Garlic Butter Shrimp Pasta",
      thumbnail: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
      authorName: "Robert Taylor",
      authorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      duration: "30 min",
      difficulty: "Medium",
      cuisineType: "Italian",
      mealType: "Dinner",
      tags: ["Pasta", "Seafood", "Quick"],
      dietary: [],
      cookingTime: "15to30",
      videoPreview: "https://example.com/video8.mp4",
    },
    {
      id: "9",
      title: "Vegetarian Buddha Bowl",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      authorName: "Rachel Green",
      authorAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      duration: "20 min",
      difficulty: "Easy",
      cuisineType: "Asian",
      mealType: "Lunch",
      tags: ["Vegetarian", "Bowl", "Healthy"],
      dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
      cookingTime: "15to30",
      videoPreview: "https://example.com/video9.mp4",
    },
    {
      id: "10",
      title: "Slow Cooker Beef Stew",
      thumbnail: "https://images.unsplash.com/photo-1608835291093-394b4a3a1a22",
      authorName: "James Wilson",
      authorAvatar: "https://randomuser.me/api/portraits/men/54.jpg",
      duration: "6 hrs",
      difficulty: "Easy",
      cuisineType: "American",
      mealType: "Dinner",
      tags: ["Beef", "Slow Cooker", "Winter"],
      dietary: ["Dairy-Free"],
      cookingTime: "over60",
      videoPreview: "https://example.com/video10.mp4",
    },
    {
      id: "11",
      title: "Homemade Sourdough Bread",
      thumbnail: "https://images.unsplash.com/photo-1585478259715-4aa351907a0e",
      authorName: "Alice Thompson",
      authorAvatar: "https://randomuser.me/api/portraits/women/76.jpg",
      duration: "3 hrs",
      difficulty: "Hard",
      cuisineType: "American",
      mealType: "Breakfast",
      tags: ["Bread", "Baking", "Sourdough"],
      dietary: ["Vegetarian"],
      cookingTime: "over60",
      videoPreview: "https://example.com/video11.mp4",
    },
    {
      id: "12",
      title: "Classic French Omelette",
      thumbnail: "https://images.unsplash.com/photo-1612240498936-65f5101365d2",
      authorName: "Pierre Martin",
      authorAvatar: "https://randomuser.me/api/portraits/men/82.jpg",
      duration: "10 min",
      difficulty: "Medium",
      cuisineType: "Mediterranean",
      mealType: "Breakfast",
      tags: ["Eggs", "French", "Quick"],
      dietary: ["Vegetarian", "Gluten-Free"],
      cookingTime: "under15",
      videoPreview: "https://example.com/video12.mp4",
    },
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
      setCurrentFilters((prev) => ({
        ...prev,
        cuisineType: [...prev.cuisineType, tag],
      }));
    }

    if (
      cuisineTypeFromPath &&
      !currentFilters.cuisineType.includes(cuisineTypeFromPath)
    ) {
      setCurrentFilters((prev) => ({
        ...prev,
        cuisineType: [...prev.cuisineType, cuisineTypeFromPath],
      }));
    }
  }, [search, tag, cuisineTypeFromPath]);

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
        currentFilters.cuisineType.includes(recipe.cuisineType)
      );
    }

    // Apply dietary restrictions filter
    if (currentFilters.dietary.length > 0) {
      filtered = filtered.filter((recipe) =>
        currentFilters.dietary.every((diet) => recipe.dietary.includes(diet))
      );
    }

    // Apply meal type filter
    if (currentFilters.mealType.length > 0) {
      filtered = filtered.filter((recipe) =>
        currentFilters.mealType.includes(recipe.mealType)
      );
    }

    // Apply difficulty filter
    if (currentFilters.difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === currentFilters.difficulty
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
      !filters.cuisineType.includes(cuisineTypeFromPath)
    ) {
      filters.cuisineType = [...filters.cuisineType, cuisineTypeFromPath];
    }

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
    router.push(
      {
        pathname: "/recipes",
        query: { ...router.query, search: searchTerm },
      },
      undefined,
      { shallow: true }
    );
  };

  // Toggle mobile filters visibility
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
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
          {cuisineTypeFromPath && (
            <div className="mb-6 flex items-center">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center">
                <span className="font-medium">
                  Filtered by cuisine: {cuisineTypeFromPath}
                </span>
                <button
                  onClick={() => router.push("/recipes")}
                  className="ml-2 text-primary hover:text-primary-hover focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
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
            <div className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
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
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentFilters({
                        cuisineType: cuisineTypeFromPath
                          ? [cuisineTypeFromPath]
                          : [],
                        dietary: [],
                        mealType: [],
                        difficulty: "",
                        cookingTime: "",
                      });
                    }}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
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
