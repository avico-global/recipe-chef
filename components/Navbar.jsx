import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  Heart,
  Book,
  Menu as MenuIcon,
  X,
} from "lucide-react";

/**
 * Navbar component - displays site navigation and search
 * Inspired by eBay's clean navigation with prominent search bar
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigation logic would go here
    console.log(
      `Searching for: ${searchQuery} in category: ${selectedCategory}`
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const recipeCategories = [
    "All Categories",
    "Appetizers",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desserts",
    "Beverages",
    "Baking",
    "Grilling",
    "Soups & Stews",
    "Salads",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "International",
    "Quick & Easy",
    "Seasonal",
    "Holiday",
    "Ingredients",
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      {/* Top mini-nav (sign in, etc) - adjusted to match eBay spacing */}
      <div className="bg-white py-1.5 text-sm border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-gray-700 mr-1">Hi!</span>
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
            <span className="text-gray-500 mx-1">or</span>
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800"
            >
              register
            </Link>
          </div>
          <div className="flex items-center space-x-5">
            <Link
              href="/daily-recipes"
              className="text-gray-700 hover:text-blue-600"
            >
              Daily Recipes
            </Link>
            <Link href="/premium" className="text-gray-700 hover:text-blue-600">
              Premium Content
            </Link>
            <Link
              href="/meal-planner"
              className="text-gray-700 hover:text-blue-600"
            >
              Meal Planner
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-blue-600">
              Help & Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar with search - updated with rounded UI */}
      <div className="container mx-auto py-2">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center mr-6">
            <span className="text-2xl font-bold">
              <span className="text-red-500">Recipe</span>
              <span className="text-blue-500">Cooks</span>
            </span>
          </Link>

          {/* Search bar with category dropdown - UPDATED with rounded UI */}
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="flex w-full gap-2">
              <div className="flex w-full border border-gray-400 rounded-full overflow-hidden">
                <div
                  className="flex items-center px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 border-r border-gray-400"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  <span className="text-sm whitespace-nowrap">
                    {selectedCategory}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow py-2 px-4 border-0 focus:ring-0 focus:outline-none"
                  placeholder="Search for recipes, ingredients, cuisines..."
                  onClick={() => setIsCategoryDropdownOpen(false)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-full text-white font-medium py-2 px-6 transition-colors duration-300 border-0"
              >
                Search
              </button>

              {/* Categories dropdown styling updated */}
              {isCategoryDropdownOpen && (
                <div className="absolute z-10 mt-12 bg-white border border-gray-300 rounded-lg shadow-lg w-56 max-h-96 overflow-y-auto">
                  <div className="py-1">
                    {recipeCategories.map((category) => (
                      <div
                        key={category}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                          selectedCategory === category ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Desktop links - UPDATED to remove shopping list */}
          <div className="hidden md:flex items-center ml-5 space-x-6">
            <Link
              href="/saved-recipes"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-1">Favorites</span>
            </Link>
            <Link
              href="/my-cookbook"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <Book className="h-5 w-5" />
              <span className="text-xs mt-1">My Cookbook</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <MenuIcon className="block h-6 w-6" />
              ) : (
                <X className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search - UPDATED with rounded UI */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch} className="w-full">
            <div className="flex border border-gray-400 rounded-full overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-2 bg-gray-100 w-full cursor-pointer border-b border-gray-400"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <span className="text-sm">{selectedCategory}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>

            {isCategoryDropdownOpen && (
              <div className="bg-white border border-gray-300 rounded-md shadow-md mt-1 mb-2 max-h-60 overflow-y-auto">
                {recipeCategories.map((category) => (
                  <div
                    key={category}
                    className={`px-4 py-2.5 text-sm cursor-pointer border-b border-gray-100 ${
                      selectedCategory === category ? "bg-blue-100" : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}

            <div className="flex border border-gray-400 rounded-full overflow-hidden mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow py-2 px-4 border-0 focus:ring-0 focus:outline-none"
                placeholder="Search recipes..."
                onClick={() => setIsCategoryDropdownOpen(false)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Category navigation - updated to match eBay's style exactly */}
      <div className="hidden md:block bg-white border-t border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-center space-x-6 py-2 px-4 text-sm overflow-x-auto">
            <Link
              href="/live-cooking"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Live Cooking
            </Link>
            <Link
              href="/saved"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Saved Recipes
            </Link>
            <Link
              href="/quick-meals"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Quick Meals
            </Link>
            <Link
              href="/breakfast"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Breakfast
            </Link>
            <Link
              href="/lunch"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Lunch & Dinner
            </Link>
            <Link
              href="/desserts"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Desserts
            </Link>
            <Link
              href="/vegetarian"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Vegetarian
            </Link>
            <Link
              href="/international"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              International
            </Link>
            <Link
              href="/seasonal"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Seasonal
            </Link>
            <Link
              href="/kitchen-tips"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Kitchen Tips
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap"
            >
              Ingredient Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown - UPDATED to remove shopping list */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/live-cooking"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Cooking
            </Link>
            <Link
              href="/saved-recipes"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Saved Recipes
            </Link>
            <Link
              href="/breakfast"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Breakfast
            </Link>
            <Link
              href="/lunch-dinner"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Lunch & Dinner
            </Link>
            <Link
              href="/desserts"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Desserts
            </Link>
            <Link
              href="/vegetarian"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Vegetarian
            </Link>
            <Link
              href="/international"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              International Cuisine
            </Link>
            <Link
              href="/my-cookbook"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              My Cookbook
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
