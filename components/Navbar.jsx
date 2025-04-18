import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  Heart,
  Book,
  Menu as MenuIcon,
  X,
  Radio,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

/**
 * Navbar component - displays site navigation and search
 * Inspired by eBay's clean navigation with prominent search bar
 */
const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Cuisines");

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click was outside both dropdown containers
      const isOutsideDesktop =
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target);
      const isOutsideMobile =
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target);

      if (
        (isOutsideDesktop && isOutsideMobile) ||
        (isOutsideDesktop && !mobileDropdownRef.current) ||
        (isOutsideMobile && !desktopDropdownRef.current)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();

    // Add search query if it exists
    if (searchQuery.trim()) {
      searchParams.append("search", searchQuery.trim());
    }

    // Add cuisine type if it's not "All Cuisines"
    if (selectedCategory !== "All Cuisines") {
      searchParams.append("cuisineType", selectedCategory.toLowerCase());
    }

    // Build the URL
    const queryString = searchParams.toString();
    const url = `/recipes${queryString ? `?${queryString}` : ""}`;

    // Navigate to the recipes page with the filters
    router.push(url);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);

    // Don't navigate if "All Cuisines" is selected
    if (category !== "All Cuisines") {
      // Convert the cuisine name to URL-friendly format
      const cuisineParam = category.toLowerCase();
      router.push(`/recipes?cuisineType=${cuisineParam}`);
    } else {
      router.push("/recipes");
    }
  };

  const cuisines = [
    "All Cuisines",
    "Italian",
    "Chinese",
    "Japanese",
    "Indian",
    "Mexican",
    "Thai",
    "French",
    "Mediterranean",
    "Greek",
    "Spanish",
    "Korean",
    "Vietnamese",
    "Middle Eastern",
    "American",
    "Brazilian",
    "Caribbean",
    "African",
  ];

  return (
    <nav className="w-full bg-white border-gray-200">
      {/* Top mini-nav (sign in, etc) - adjusted to match eBay spacing */}
      <div className="hidden sm:block bg-white py-2 text-sm border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-5">
          <div className="flex items-center">
            <span className="text-gray-700 mr-1">Hi!</span>
            <Link href="/signin" className="text-primary hover:text-blue-800">
              Sign in
            </Link>
            <span className="text-gray-500 mx-1">or</span>
            <Link href="/register" className="text-primary hover:text-blue-800">
              register
            </Link>
          </div>
          <div className="flex items-center space-x-5 justify-end">
            {/* <Link
              href="/meal-planner"
              className="text-gray-700 hover:text-blue-600"
            >
              Meal Planner
            </Link> */}

            <Link href={"/top-10-recipes"} className="  border-primary ">
              Top 10 Picks
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Help & Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar with search - updated with responsive classes */}
      <div className="container mx-auto py-2 px-4 sm:px-5">
        <div className="flex items-center justify-between">
          {/* Logo - adjusted spacing */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center mr-4 sm:mr-6"
          >
            <Image
              src="/assets/logo.png"
              alt="Recipe Picks"
              width={190}
              height={100}
            />
          </Link>

          {/* Search bar - desktop */}
          <div className="flex-grow hidden sm:block">
            <form onSubmit={handleSearch} className="flex w-full gap-2">
              <div className="flex w-full border border-black rounded-full relative">
                <div
                  className="flex items-center px-2 sm:px-4 py-2 cursor-pointer border-r border-gray-400"
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  ref={desktopDropdownRef}
                >
                  <span className="text-xs sm:text-sm whitespace-nowrap">
                    {selectedCategory}
                  </span>
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 text-gray-500" />

                  {/* Desktop category dropdown */}
                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-50 max-h-96 overflow-y-auto w-48">
                      {cuisines.map((cuisine) => (
                        <div
                          key={cuisine}
                          className={`px-4 py-1 text-sm cursor-pointer hover:bg-primary/10 ${
                            selectedCategory === cuisine ? "bg-primary/10" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategorySelect(cuisine);
                          }}
                        >
                          {cuisine}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow py-2 px-2 sm:px-4 text-sm sm:text-base border-0 focus:ring-0 focus:outline-none"
                  placeholder="Search for recipes..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary transition-colors duration-300 border-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop links - adjusted spacing and responsive visibility */}
          <div className="hidden md:flex items-center ml-3 sm:ml-5 space-x-4 sm:space-x-6">
            <Link
              href="/favorites"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-[10px] sm:text-xs mt-1">Favorites</span>
            </Link>
            {/* <Link
              href="/live-cooking"
              className="text-gray-700 hover:text-blue-600 flex flex-col items-center"
            >
              <Radio className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-[10px] sm:text-xs mt-1">Live Cooking</span>
            </Link> */}
          </div>

          {/* Mobile menu button - adjusted positioning */}
          <div className="md:hidden flex items-center ml-2 sm:ml-4">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden mt-3">
          <form onSubmit={handleSearch} className="w-full">
            <div
              className="flex border border-gray-400 rounded-full overflow-hidden"
              ref={mobileDropdownRef}
            >
              <div
                className="flex items-center justify-between px-3 py-1.5 bg-gray-100 w-full cursor-pointer border-b border-gray-400"
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                <span className="text-xs sm:text-sm">{selectedCategory}</span>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
              </div>
            </div>

            {isCategoryDropdownOpen && (
              <div className="bg-white border border-gray-300 rounded-md shadow-md mt-1 mb-2 max-h-60 overflow-y-auto">
                {cuisines.map((cuisine) => (
                  <div
                    key={cuisine}
                    className={`px-4 py-2.5 text-sm cursor-pointer border-b border-gray-100 ${
                      selectedCategory === cuisine ? "bg-blue-100" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(cuisine);
                    }}
                  >
                    {cuisine}
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

      {/* Category navigation */}
      <div className="hidden md:block bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start lg:justify-center space-x-4 sm:space-x-6 py-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/recipes?filter=breakfast"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Breakfast
            </Link>
            <Link
              href="/recipes?filter=lunch"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Lunch
            </Link>
            <Link
              href="/recipes?filter=dinner"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Dinner
            </Link>
            <Link
              href="/recipes?filter=desserts"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Desserts
            </Link>
            <Link
              href="/recipes?filter=vegetarian"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Vegetarian
            </Link>
            <Link
              href="/recipes?filter=international"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              International
            </Link>
            <Link
              href="/recipes?filter=seasonal"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Seasonal
            </Link>
            <Link
              href="/kitchen-tips"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Kitchen Tips
            </Link>
            {/* <Link
              href="/ingredient-deals"
              className="text-gray-700 hover:text-primary whitespace-nowrap"
            >
              Ingredient Deals
            </Link> */}
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown - UPDATED to remove shopping list */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/live-cooking"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Cooking
            </Link>
            <Link
              href="/favorites"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              href="/favorites"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Saved Recipes
            </Link>
            <Link
              href="/recipes?filter=breakfast"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Breakfast
            </Link>
            <Link
              href="/recipes?filter=lunch"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Lunch
            </Link>
            <Link
              href="/recipes?filter=dinner"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Dinner
            </Link>
            <Link
              href="/desserts"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Desserts
            </Link>
            <Link
              href="/recipes?filter=vegetarian"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Vegetarian
            </Link>
            <Link
              href="/recipes?filter=international"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              International Cuisine
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Help & Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
