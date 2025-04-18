import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

/**
 * FilterSidebar component - displays filters for recipe listings
 * Supports locked cuisine types from URL path parameters
 * Updates URL query parameters when filters change
 */
const FilterSidebar = ({
  onFilterChange,
  lockedCuisineType,
  initialFilters,
}) => {
  const router = useRouter();

  // Default filter state
  const [filters, setFilters] = useState(
    initialFilters || {
      cuisineType: [],
      dietary: [],
      mealType: [],
      difficulty: "",
      cookingTime: "",
    }
  );

  // Add state to track expanded sections
  const [expandedSections, setExpandedSections] = useState({
    cuisineType: true,
    mealType: true,
    dietary: true,
    difficulty: true,
    cookingTime: true,
  });

  // Initialize filters with props when component mounts or props change
  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Read filters from URL params on initial load
  useEffect(() => {
    if (!router.isReady) return;

    const query = router.query;
    const newFilters = { ...filters };
    let filtersChanged = false;

    // Process filter query parameter
    if (query.filter) {
      if (typeof query.filter === "string") {
        filtersChanged =
          processFilterValue(query.filter, newFilters) || filtersChanged;
      } else if (Array.isArray(query.filter)) {
        query.filter.forEach((filterValue) => {
          filtersChanged =
            processFilterValue(filterValue, newFilters) || filtersChanged;
        });
      }
    }

    // Process specific filter parameters if they exist
    if (query.cuisineType) {
      const values = Array.isArray(query.cuisineType)
        ? query.cuisineType
        : [query.cuisineType];
      values.forEach((val) => {
        if (
          !newFilters.cuisineType.some(
            (v) => v.toLowerCase() === val.toLowerCase()
          )
        ) {
          newFilters.cuisineType.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (query.mealType) {
      const values = Array.isArray(query.mealType)
        ? query.mealType
        : [query.mealType];
      values.forEach((val) => {
        if (
          !newFilters.mealType.some(
            (v) => v.toLowerCase() === val.toLowerCase()
          )
        ) {
          newFilters.mealType.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (query.dietary) {
      const values = Array.isArray(query.dietary)
        ? query.dietary
        : [query.dietary];
      values.forEach((val) => {
        if (
          !newFilters.dietary.some((v) => v.toLowerCase() === val.toLowerCase())
        ) {
          newFilters.dietary.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (
      query.difficulty &&
      newFilters.difficulty !== query.difficulty.toLowerCase()
    ) {
      newFilters.difficulty = query.difficulty.toLowerCase();
      filtersChanged = true;
    }

    if (query.cookingTime && newFilters.cookingTime !== query.cookingTime) {
      newFilters.cookingTime = query.cookingTime;
      filtersChanged = true;
    }

    // Update filters and notify parent component if any changes
    if (filtersChanged) {
      setFilters(newFilters);
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  const processFilterValue = (filterValue, newFilters) => {
    let changed = false;
    const filterValueLower = filterValue.toLowerCase();

    // Updated cuisine types
    const cuisineTypes = [
      "italian",
      "asian",
      "american",
      "mediterranean",
      "mexican",
      "indian",
      "french",
      "japanese",
      "chinese",
      "thai",
      "greek",
      "spanish",
      "korean",
      "vietnamese",
      "middle-eastern",
    ];
    if (cuisineTypes.includes(filterValueLower)) {
      if (
        !newFilters.cuisineType.some(
          (v) => v.toLowerCase() === filterValueLower
        )
      ) {
        newFilters.cuisineType.push(filterValueLower);
        changed = true;
      }
    }

    // Updated meal types
    else if (
      [
        "breakfast",
        "lunch",
        "dinner",
        "dessert",
        "brunch",
        "snack",
        "appetizer",
        "side-dish",
        "beverage",
      ].includes(filterValueLower)
    ) {
      if (
        !newFilters.mealType.some((v) => v.toLowerCase() === filterValueLower)
      ) {
        newFilters.mealType.push(filterValueLower);
        changed = true;
      }
    }

    // Updated dietary options
    else if (
      [
        "vegetarian",
        "vegan",
        "gluten-free",
        "dairy-free",
        "keto",
        "paleo",
        "low-carb",
        "nut-free",
        "halal",
        "kosher",
        "pescatarian",
        "egg-free",
        "soy-free",
      ].includes(filterValueLower)
    ) {
      if (
        !newFilters.dietary.some((v) => v.toLowerCase() === filterValueLower)
      ) {
        newFilters.dietary.push(filterValueLower);
        changed = true;
      }
    }

    // Difficulty levels from mock data
    else if (["easy", "medium", "hard"].includes(filterValueLower)) {
      if (newFilters.difficulty !== filterValueLower) {
        newFilters.difficulty = filterValueLower;
        changed = true;
      }
    }

    // Cooking time options from mock data
    else if (["under15", "15to30", "30to60", "over60"].includes(filterValue)) {
      if (newFilters.cookingTime !== filterValue) {
        newFilters.cookingTime = filterValue;
        changed = true;
      }
    }

    return changed;
  };

  // Handle checkbox changes for array-based filters (cuisineType, mealType, dietary)
  const handleCheckboxChange = (type, value) => {
    const valueLower = value.toLowerCase();
    const newFilters = { ...filters };
    
    // Don't allow changes to locked cuisine type
    if (type === 'cuisineType' && lockedCuisineType?.toLowerCase() === valueLower) {
      return;
    }
    
    // Check if value already exists in the filter
    if (newFilters[type].includes(valueLower)) {
      // Remove the value
      newFilters[type] = newFilters[type].filter(v => v !== valueLower);
    } else {
      // Add the value
      newFilters[type] = [...newFilters[type], valueLower];
    }
    
    // Update local state
    setFilters(newFilters);
    
    // Notify parent component
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Handle radio button changes for single-value filters (difficulty, cookingTime)
  const handleRadioChange = (type, value) => {
    const valueLower = type === 'cookingTime' ? value : value.toLowerCase();
    const newFilters = { ...filters };
    
    // If the same value is clicked again, clear it
    if (newFilters[type] === valueLower) {
      newFilters[type] = '';
    } else {
      newFilters[type] = valueLower;
    }
    
    // Update local state
    setFilters(newFilters);
    
    // Notify parent component
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Toggle section visibility
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Move buttonClasses definition here, before the return statement
  const buttonClasses =
    "w-full flex justify-between items-center font-medium py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group";

  return (
    <div className="p-2 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Filters</h2>

      {/* Cuisine Type Section */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection("cuisineType")}
          className={buttonClasses}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700 group-hover:text-gray-900">
              Cuisine Type
            </h3>
            {filters.cuisineType.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                {filters.cuisineType.length}
              </span>
            )}
          </div>
          {expandedSections.cuisineType ? (
            <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          )}
        </button>

        {expandedSections.cuisineType && (
          <div className="mt-1 px-1 grid grid-cols-1 gap-1">
            {[
              "Italian",
              "Asian",
              "American",
              "Mediterranean",
              "Mexican",
              "Indian",
              "French",
              "Japanese",
              "Chinese",
              "Thai",
              "Greek",
              "Spanish",
              "Korean",
              "Vietnamese",
              "Middle-Eastern",
            ].map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.cuisineType.includes(type.toLowerCase())
                      ? "bg-primary/5"
                      : ""
                  }
                  ${
                    lockedCuisineType?.toLowerCase() === type.toLowerCase()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                onClick={(e) => {
                  if (lockedCuisineType?.toLowerCase() !== type.toLowerCase()) {
                    // Only handle click if not on locked cuisine
                    e.preventDefault();
                    handleCheckboxChange("cuisineType", type);
                  }
                }}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.cuisineType.includes(type.toLowerCase())
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }
                  ${
                    lockedCuisineType?.toLowerCase() === type.toLowerCase()
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  {filters.cuisineType.includes(type.toLowerCase()) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Meal Type Section */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection("mealType")}
          className={buttonClasses}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700 group-hover:text-gray-900">
              Meal Type
            </h3>
            {filters.mealType.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                {filters.mealType.length}
              </span>
            )}
          </div>
          {expandedSections.mealType ? (
            <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          )}
        </button>
        {expandedSections.mealType && (
          <div className="mt-1 px-1 grid grid-cols-1 gap-1">
            {[
              "Breakfast",
              "Lunch",
              "Dinner",
              "Dessert",
              "Brunch",
              "Snack",
              "Appetizer",
              "Side-Dish",
              "Beverage",
            ].map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.mealType.includes(type.toLowerCase())
                      ? "bg-primary/5"
                      : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckboxChange("mealType", type);
                }}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.mealType.includes(type.toLowerCase())
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {filters.mealType.includes(type.toLowerCase()) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Dietary Restrictions Section */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection("dietary")}
          className={buttonClasses}
        >
          <div className="flex items-center gap-2 flex-1">
            <h3 className="text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
              Dietary Restrictions
            </h3>
            {filters.dietary.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                {filters.dietary.length}
              </span>
            )}
          </div>
          {expandedSections.dietary ? (
            <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          )}
        </button>
        {expandedSections.dietary && (
          <div className="mt-1 px-1 grid grid-cols-1 gap-1">
            {[
              "Vegetarian",
              "Vegan",
              "Gluten-Free",
              "Dairy-Free",
              "Keto",
              "Paleo",
              "Low-Carb",
              "Nut-Free",
              "Halal",
              "Kosher",
              "Pescatarian",
              "Egg-Free",
              "Soy-Free",
            ].map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.dietary.includes(type.toLowerCase())
                      ? "bg-primary/5"
                      : ""
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckboxChange("dietary", type);
                }}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.dietary.includes(type.toLowerCase())
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {filters.dietary.includes(type.toLowerCase()) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Difficulty Section - Special styling for radio buttons */}
      <div className="mb-2">
        <button
          onClick={() => toggleSection("difficulty")}
          className={buttonClasses}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700 group-hover:text-gray-900">
              Difficulty
            </h3>
            {filters.difficulty && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full capitalize">
                {filters.difficulty}
              </span>
            )}
          </div>
          {expandedSections.difficulty ? (
            <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          )}
        </button>
        {expandedSections.difficulty && (
          <div className="mt-1 px-1 flex gap-1">
            {["Easy", "Medium", "Hard"].map((level) => (
              <label
                key={level}
                className={`flex-1 py-2 px-2 rounded-lg cursor-pointer border transition-all duration-200
                  ${
                    filters.difficulty === level.toLowerCase()
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleRadioChange("difficulty", level);
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="radio"
                    className="sr-only"
                    name="difficulty"
                    checked={filters.difficulty === level.toLowerCase()}
                    readOnly
                  />
                  <span className="text-sm">{level}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Cooking Time Section */}
      <div className="mb-3">
        <button
          onClick={() => toggleSection("cookingTime")}
          className={buttonClasses}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700 group-hover:text-gray-900">
              Cooking Time
            </h3>
            {filters.cookingTime && (
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full capitalize">
                {filters.cookingTime}
              </span>
            )}
          </div>
          {expandedSections.cookingTime ? (
            <ChevronUp className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
          )}
        </button>
        {expandedSections.cookingTime && (
          <div className="mt-1 px-1 grid grid-cols-1 gap-1">
            {[
              { label: "Under 15 minutes", value: "under15" },
              { label: "15 to 30 minutes", value: "15to30" },
              { label: "30 to 60 minutes", value: "30to60" },
              { label: "Over 60 minutes", value: "over60" },
            ].map((time) => (
              <label
                key={time.value}
                className={`flex-1 py-2 px-2 rounded-lg cursor-pointer border transition-all duration-200
                  ${
                    filters.cookingTime === time.value
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleRadioChange("cookingTime", time.value);
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="radio"
                    className="sr-only"
                    name="cookingTime"
                    checked={filters.cookingTime === time.value}
                    readOnly
                  />
                  <span className="text-sm">{time.label}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Clear Filters Button */}
      {(filters.cuisineType.length > 0 ||
        filters.mealType.length > 0 ||
        filters.dietary.length > 0 ||
        filters.difficulty ||
        filters.cookingTime) && (
        <button
          onClick={() => {
            const clearedFilters = {
              cuisineType: lockedCuisineType ? [lockedCuisineType.toLowerCase()] : [],
              dietary: [],
              mealType: [],
              difficulty: "",
              cookingTime: "",
              search: filters.search || "", // Preserve search term
            };
            setFilters(clearedFilters);
            if (onFilterChange) {
              onFilterChange(clearedFilters);
            }
          }}
          className="w-full py-2 px-3 mt-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 
            transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
