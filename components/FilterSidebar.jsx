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

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters };
    const valueLower = value.toLowerCase();

    if (type === "difficulty" || type === "cookingTime") {
      // If clicking the already selected value, deselect it
      if (newFilters[type] === valueLower) {
        newFilters[type] = "";
        updateURLParams(type, value, true);
      } else {
        newFilters[type] = valueLower;
        updateURLParams(type, value, false);
      }
    } else {
      // For array-based filters (cuisineType, mealType, dietary)
      if (newFilters[type].some((v) => v.toLowerCase() === valueLower)) {
        newFilters[type] = newFilters[type].filter(
          (item) => item.toLowerCase() !== valueLower
        );
        updateURLParams(type, value, true);
      } else {
        newFilters[type].push(valueLower);
        updateURLParams(type, value, false);
      }
    }

    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const updateURLParams = (type, value, isRemove) => {
    const currentQuery = { ...router.query };
    const valueLower = value.toLowerCase();

    // Handle removal
    if (isRemove) {
      if (type === "difficulty" || type === "cookingTime") {
        // For single value parameters, just delete them
        delete currentQuery[type];
      } else {
        // For array-based parameters
        if (currentQuery[type]) {
          if (typeof currentQuery[type] === "string") {
            if (currentQuery[type].toLowerCase() === valueLower) {
              delete currentQuery[type];
            }
          } else if (Array.isArray(currentQuery[type])) {
            currentQuery[type] = currentQuery[type].filter(
              (val) => val.toLowerCase() !== valueLower
            );
            if (currentQuery[type].length === 0) {
              delete currentQuery[type];
            } else if (currentQuery[type].length === 1) {
              currentQuery[type] = currentQuery[type][0];
            }
          }
        }

        // Also handle the generic 'filter' parameter
        if (currentQuery.filter) {
          if (typeof currentQuery.filter === "string") {
            if (currentQuery.filter.toLowerCase() === valueLower) {
              delete currentQuery.filter;
            }
          } else if (Array.isArray(currentQuery.filter)) {
            currentQuery.filter = currentQuery.filter.filter(
              (val) => val.toLowerCase() !== valueLower
            );
            if (currentQuery.filter.length === 0) {
              delete currentQuery.filter;
            } else if (currentQuery.filter.length === 1) {
              currentQuery.filter = currentQuery.filter[0];
            }
          }
        }
      }
    }
    // Handle addition
    else {
      // Add to specific type parameter
      if (currentQuery[type]) {
        if (typeof currentQuery[type] === "string") {
          if (currentQuery[type].toLowerCase() !== valueLower) {
            currentQuery[type] = [currentQuery[type], valueLower];
          }
        } else if (Array.isArray(currentQuery[type])) {
          if (
            !currentQuery[type].some((val) => val.toLowerCase() === valueLower)
          ) {
            currentQuery[type].push(valueLower);
          }
        }
      } else {
        currentQuery[type] = valueLower;
      }

      // Also add to the generic 'filter' parameter
      if (currentQuery.filter) {
        if (typeof currentQuery.filter === "string") {
          if (currentQuery.filter.toLowerCase() !== valueLower) {
            currentQuery.filter = [currentQuery.filter, valueLower];
          }
        } else if (Array.isArray(currentQuery.filter)) {
          if (
            !currentQuery.filter.some((val) => val.toLowerCase() === valueLower)
          ) {
            currentQuery.filter.push(valueLower);
          }
        }
      } else {
        currentQuery.filter = valueLower;
      }
    }

    // Update URL without full page reload
    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  // Add toggle function
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

      {/* Cuisine Type Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("cuisineType")}
          className="w-full flex justify-between items-center font-medium py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
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
          <div className="mt-3 px-1 grid grid-cols-2 gap-2">
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
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.cuisineType.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "bg-primary/5"
                      : ""
                  }
                  ${
                    lockedCuisineType === type.toLowerCase()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.cuisineType.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }
                  ${
                    lockedCuisineType === type.toLowerCase()
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  {filters.cuisineType.some(
                    (v) => v.toLowerCase() === type.toLowerCase()
                  ) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Meal Type Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("mealType")}
          className="w-full flex justify-between items-center font-medium py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
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
          <div className="mt-3 px-1 grid grid-cols-2 gap-2">
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
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.mealType.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "bg-primary/5"
                      : ""
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.mealType.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {filters.mealType.some(
                    (v) => v.toLowerCase() === type.toLowerCase()
                  ) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Dietary Restrictions Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("dietary")}
          className="w-full flex justify-between items-center font-medium py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700 group-hover:text-gray-900">
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
          <div className="mt-3 px-1 grid grid-cols-2 gap-2">
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
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    filters.dietary.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "bg-primary/5"
                      : ""
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center
                  ${
                    filters.dietary.some(
                      (v) => v.toLowerCase() === type.toLowerCase()
                    )
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {filters.dietary.some(
                    (v) => v.toLowerCase() === type.toLowerCase()
                  ) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Difficulty Section - Special styling for radio buttons */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("difficulty")}
          className="w-full flex justify-between items-center font-medium py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
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
          <div className="mt-3 px-1 flex gap-2">
            {["Easy", "Medium", "Hard"].map((level) => (
              <label
                key={level}
                className={`flex-1 p-3 rounded-lg cursor-pointer border transition-all duration-200
                  ${
                    filters.difficulty === level.toLowerCase()
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="radio"
                    className="sr-only"
                    name="difficulty"
                    checked={filters.difficulty === level.toLowerCase()}
                    onChange={() =>
                      handleFilterChange("difficulty", level.toLowerCase())
                    }
                  />
                  <span className="text-sm">{level}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Cooking Time Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("cookingTime")}
          className="w-full flex justify-between items-center font-medium py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
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
          <div className="mt-3 px-1 grid grid-cols-2 text-center gap-2">
            {[
              { label: "Under 15 minutes", value: "under15" },
              { label: "15 to 30 minutes", value: "15to30" },
              { label: "30 to 60 minutes", value: "30to60" },
              { label: "Over 60 minutes", value: "over60" },
            ].map((time) => (
              <label
                key={time.value}
                className={`flex-1 p-3 rounded-lg cursor-pointer border transition-all duration-200
                  ${
                    filters.cookingTime === time.value
                      ? "bg-primary/10 border-primary text-primary font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="radio"
                    className="sr-only"
                    name="cookingTime"
                    checked={filters.cookingTime === time.value}
                    onChange={() =>
                      handleFilterChange("cookingTime", time.value)
                    }
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
              cuisineType: lockedCuisineType ? [lockedCuisineType] : [],
              dietary: [],
              mealType: [],
              difficulty: "",
              cookingTime: "",
            };
            setFilters(clearedFilters);
            if (onFilterChange) {
              onFilterChange(clearedFilters);
            }

            // Reset URL params but keep any locked cuisine type
            const query = lockedCuisineType
              ? { cuisineType: lockedCuisineType }
              : {};
            router.push(
              {
                pathname: router.pathname,
                query,
              },
              undefined,
              { shallow: true }
            );
          }}
          className="w-full py-2.5 px-4 mt-6 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 
            transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
