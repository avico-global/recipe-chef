import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
        filtersChanged = processFilterValue(query.filter, newFilters) || filtersChanged;
      } else if (Array.isArray(query.filter)) {
        query.filter.forEach(filterValue => {
          filtersChanged = processFilterValue(filterValue, newFilters) || filtersChanged;
        });
      }
    }

    // Process specific filter parameters if they exist
    if (query.cuisineType) {
      const values = Array.isArray(query.cuisineType) ? query.cuisineType : [query.cuisineType];
      values.forEach(val => {
        if (!newFilters.cuisineType.some(v => v.toLowerCase() === val.toLowerCase())) {
          newFilters.cuisineType.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (query.mealType) {
      const values = Array.isArray(query.mealType) ? query.mealType : [query.mealType];
      values.forEach(val => {
        if (!newFilters.mealType.some(v => v.toLowerCase() === val.toLowerCase())) {
          newFilters.mealType.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (query.dietary) {
      const values = Array.isArray(query.dietary) ? query.dietary : [query.dietary];
      values.forEach(val => {
        if (!newFilters.dietary.some(v => v.toLowerCase() === val.toLowerCase())) {
          newFilters.dietary.push(val.toLowerCase());
          filtersChanged = true;
        }
      });
    }

    if (query.difficulty && newFilters.difficulty !== query.difficulty.toLowerCase()) {
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
    
    // Cuisine types from mock data
    const cuisineTypes = ["italian", "asian", "american", "mediterranean", "mexican"];
    if (cuisineTypes.includes(filterValueLower)) {
      if (!newFilters.cuisineType.some(v => v.toLowerCase() === filterValueLower)) {
        newFilters.cuisineType.push(filterValueLower);
        changed = true;
      }
    }
    
    // Meal types from mock data
    else if (["breakfast", "lunch", "dinner", "dessert"].includes(filterValueLower)) {
      if (!newFilters.mealType.some(v => v.toLowerCase() === filterValueLower)) {
        newFilters.mealType.push(filterValueLower);
        changed = true;
      }
    }
    
    // Dietary options from mock data
    else if (["vegetarian", "vegan", "gluten-free", "dairy-free"].includes(filterValueLower)) {
      if (!newFilters.dietary.some(v => v.toLowerCase() === filterValueLower)) {
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
      if (newFilters[type].some(v => v.toLowerCase() === valueLower)) {
        newFilters[type] = newFilters[type].filter(item => item.toLowerCase() !== valueLower);
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
              val => val.toLowerCase() !== valueLower
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
              val => val.toLowerCase() !== valueLower
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
          if (!currentQuery[type].some(val => val.toLowerCase() === valueLower)) {
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
          if (!currentQuery.filter.some(val => val.toLowerCase() === valueLower)) {
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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      {/* Cuisine Type Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Cuisine Type</h3>
        {["Italian", "Asian", "American", "Mediterranean", "Mexican"].map((type) => (
          <label key={type} className="block py-1 flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox text-primary"
              checked={filters.cuisineType.some(v => v.toLowerCase() === type.toLowerCase())}
              onChange={() =>
                handleFilterChange("cuisineType", type.toLowerCase())
              }
              disabled={lockedCuisineType === type.toLowerCase()}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      
      {/* Meal Type Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Meal Type</h3>
        {["Breakfast", "Lunch", "Dinner", "Dessert"].map((type) => (
          <label key={type} className="block py-1 flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox text-primary"
              checked={filters.mealType.some(v => v.toLowerCase() === type.toLowerCase())}
              onChange={() =>
                handleFilterChange("mealType", type.toLowerCase())
              }
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      
      {/* Dietary Restrictions Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Dietary Restrictions</h3>
        {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((type) => (
          <label key={type} className="block py-1 flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox text-primary"
              checked={filters.dietary.some(v => v.toLowerCase() === type.toLowerCase())}
              onChange={() =>
                handleFilterChange("dietary", type.toLowerCase())
              }
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      
      {/* Difficulty Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Difficulty</h3>
        {["Easy", "Medium", "Hard"].map((level) => (
          <label key={level} className="block py-1 flex items-center gap-2">
            <input
              type="radio"
              className="form-radio text-primary"
              name="difficulty"
              checked={filters.difficulty === level.toLowerCase()}
              onChange={() =>
                handleFilterChange("difficulty", level.toLowerCase())
              }
            />
            <span>{level}</span>
          </label>
        ))}
      </div>
      
      {/* Cooking Time Section */}
      <div className="mb-4">
        <h3 className="font-semibold">Cooking Time</h3>
        {[
          { label: "Under 15 minutes", value: "under15" },
          { label: "15 to 30 minutes", value: "15to30" },
          { label: "30 to 60 minutes", value: "30to60" },
          { label: "Over 60 minutes", value: "over60" }
        ].map((time) => (
          <label key={time.value} className="block py-1 flex items-center gap-2">
            <input
              type="radio"
              className="form-radio text-primary"
              name="cookingTime"
              checked={filters.cookingTime === time.value}
              onChange={() => handleFilterChange("cookingTime", time.value)}
            />
            <span>{time.label}</span>
          </label>
        ))}
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
            const query = lockedCuisineType ? { cuisineType: lockedCuisineType } : {};
            router.push({
              pathname: router.pathname,
              query
            }, undefined, { shallow: true });
          }}
          className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
