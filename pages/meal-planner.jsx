import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function MealPlanner() {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates());
  const [mealPlan, setMealPlan] = useState(initializeEmptyPlan());
  const [activeDay, setActiveDay] = useState(currentWeek[0].date);
  const [selectedMealType, setSelectedMealType] = useState("breakfast");
  const [showGroceryList, setShowGroceryList] = useState(false);
  const [activePlan, setActivePlan] = useState("custom");

  // Helper function to get dates for current week
  function getWeekDates() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - day);

    return Array(7)
      .fill()
      .map((_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return {
          date: date.toISOString().split("T")[0],
          dayName: new Intl.DateTimeFormat("en-US", {
            weekday: "short",
          }).format(date),
          dayNumber: date.getDate(),
        };
      });
  }

  // Initialize empty meal plan
  function initializeEmptyPlan() {
    const plan = {};
    currentWeek.forEach((day) => {
      plan[day.date] = {
        breakfast: null,
        lunch: null,
        dinner: null,
        snacks: null,
      };
    });
    return plan;
  }

  // Sample recipe data for suggestions
  const sampleRecipes = {
    breakfast: [
      {
        id: 1,
        title: "Avocado Toast with Poached Egg",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8",
        time: "15 min",
        calories: 380,
        difficulty: "Easy",
      },
      {
        id: 2,
        title: "Greek Yogurt with Berries & Granola",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929",
        time: "5 min",
        calories: 320,
        difficulty: "Easy",
      },
      {
        id: 3,
        title: "Spinach and Mushroom Omelette",
        image: "https://images.unsplash.com/photo-1612240498936-65f5101365d2",
        time: "12 min",
        calories: 290,
        difficulty: "Easy",
      },
      {
        id: 4,
        title: "Overnight Chia Pudding",
        image: "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f",
        time: "5 min + overnight",
        calories: 260,
        difficulty: "Easy",
      },
    ],
    lunch: [
      {
        id: 5,
        title: "Mediterranean Chicken Wrap",
        image: "https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd",
        time: "20 min",
        calories: 450,
        difficulty: "Medium",
      },
      {
        id: 6,
        title: "Quinoa Salad with Roasted Vegetables",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        time: "25 min",
        calories: 380,
        difficulty: "Easy",
      },
      {
        id: 7,
        title: "Thai-Inspired Zoodle Soup",
        image: "https://images.unsplash.com/photo-1539755530862-00f623c00382",
        time: "30 min",
        calories: 320,
        difficulty: "Medium",
      },
      {
        id: 8,
        title: "Turkey & Avocado Club Sandwich",
        image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847",
        time: "15 min",
        calories: 510,
        difficulty: "Easy",
      },
    ],
    dinner: [
      {
        id: 9,
        title: "Garlic Butter Salmon with Asparagus",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
        time: "25 min",
        calories: 490,
        difficulty: "Medium",
      },
      {
        id: 10,
        title: "Vegetarian Eggplant Parmesan",
        image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49",
        time: "40 min",
        calories: 420,
        difficulty: "Medium",
      },
      {
        id: 11,
        title: "Grass-Fed Beef Stir Fry",
        image: "https://images.unsplash.com/photo-1542874749-5abf97c8ac0a",
        time: "30 min",
        calories: 540,
        difficulty: "Medium",
      },
      {
        id: 12,
        title: "Grilled Chicken & Vegetable Bowl",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
        time: "35 min",
        calories: 480,
        difficulty: "Medium",
      },
    ],
    snacks: [
      {
        id: 13,
        title: "Apple Slices with Almond Butter",
        image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
        time: "5 min",
        calories: 180,
        difficulty: "Easy",
      },
      {
        id: 14,
        title: "Hummus with Veggie Sticks",
        image: "https://images.unsplash.com/photo-1574031099108-7f97fd325b46",
        time: "5 min",
        calories: 150,
        difficulty: "Easy",
      },
      {
        id: 15,
        title: "Greek Yogurt with Honey",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
        time: "2 min",
        calories: 120,
        difficulty: "Easy",
      },
      {
        id: 16,
        title: "Trail Mix Energy Bites",
        image: "https://images.unsplash.com/photo-1551893665-f843f600794e",
        time: "10 min",
        calories: 160,
        difficulty: "Easy",
      },
    ],
  };

  // Pre-made meal plans
  const premadePlans = {
    balanced: {
      name: "Balanced Nutrition",
      description:
        "A well-rounded plan with balanced macros for general health",
    },
    lowCarb: {
      name: "Low Carb",
      description: "Higher protein and healthy fats with limited carbohydrates",
    },
    vegetarian: {
      name: "Vegetarian",
      description:
        "Plant-based meals rich in vegetables, legumes, and whole grains",
    },
    familyFriendly: {
      name: "Family Friendly",
      description: "Kid-approved recipes that the whole family will enjoy",
    },
    quickAndEasy: {
      name: "Quick & Easy",
      description: "Simple meals that can be prepared in 30 minutes or less",
    },
  };

  // Function to add a recipe to the meal plan
  const addRecipeToMealPlan = (recipe) => {
    setMealPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      newPlan[activeDay] = {
        ...newPlan[activeDay],
        [selectedMealType]: recipe,
      };
      return newPlan;
    });
  };

  // Function to remove a recipe from the meal plan
  const removeRecipeFromMealPlan = (date, mealType) => {
    setMealPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      newPlan[date] = {
        ...newPlan[date],
        [mealType]: null,
      };
      return newPlan;
    });
  };

  // Function to generate a grocery list from the meal plan
  const generateGroceryList = () => {
    // In a real app, this would analyze recipes and generate ingredients
    // For demo purposes, we'll return a static list
    return [
      {
        category: "Produce",
        items: [
          "Avocados (3)",
          "Spinach (1 bag)",
          "Mushrooms (8 oz)",
          "Bell peppers (2)",
          "Onions (2)",
          "Garlic (1 head)",
          "Lemons (2)",
          "Berries (1 pint)",
        ],
      },
      {
        category: "Proteins",
        items: [
          "Eggs (dozen)",
          "Chicken breast (1 lb)",
          "Salmon filets (2)",
          "Greek yogurt (32 oz)",
        ],
      },
      {
        category: "Grains & Bakery",
        items: [
          "Whole grain bread",
          "Quinoa (1 cup)",
          "Brown rice (2 cups)",
          "Granola (8 oz)",
        ],
      },
      {
        category: "Pantry",
        items: [
          "Olive oil",
          "Balsamic vinegar",
          "Almonds (1/2 cup)",
          "Chia seeds (2 tbsp)",
          "Honey",
        ],
      },
      { category: "Dairy", items: ["Milk", "Feta cheese", "Parmesan cheese"] },
    ];
  };

  // Function to toggle and load a pre-made meal plan
  const togglePremadePlan = (planKey) => {
    setActivePlan(planKey);
    // In a real app, this would load the actual plan recipes
    // For demo purposes, we'll just switch the active plan
  };

  // Function to handle week navigation
  const navigateWeek = (direction) => {
    const firstDate = new Date(currentWeek[0].date);
    const offset = direction === "next" ? 7 : -7;
    firstDate.setDate(firstDate.getDate() + offset);

    const newWeek = Array(7)
      .fill()
      .map((_, i) => {
        const date = new Date(firstDate);
        date.setDate(firstDate.getDate() + i);
        return {
          date: date.toISOString().split("T")[0],
          dayName: new Intl.DateTimeFormat("en-US", {
            weekday: "short",
          }).format(date),
          dayNumber: date.getDate(),
        };
      });

    setCurrentWeek(newWeek);
    setActiveDay(newWeek[0].date);
    setMealPlan((prevPlan) => {
      const newPlan = {};
      newWeek.forEach((day) => {
        newPlan[day.date] = {
          breakfast: null,
          lunch: null,
          dinner: null,
          snacks: null,
        };
      });
      return newPlan;
    });
  };

  return (
    <>
      <Head>
        <title>Meal Planner - Recipe Picks</title>
        <meta
          name="description"
          content="Plan your weekly meals, create grocery lists, and discover new recipes with Recipe Picks Meal Planner"
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Meal Planner
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Plan your meals for the week, discover new recipes, and generate
                grocery lists to simplify your cooking routine.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          {/* Weekly calendar navigation */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => navigateWeek("prev")}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(currentWeek[0].date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(currentWeek[6].date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h2>

              <button
                onClick={() => navigateWeek("next")}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {currentWeek.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setActiveDay(day.date)}
                  className={`text-center p-3 rounded-lg transition-colors ${
                    activeDay === day.date
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="text-xs font-medium">{day.dayName}</div>
                  <div
                    className={`text-lg font-bold ${
                      activeDay === day.date ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {day.dayNumber}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meal plan section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-100">
                  <div className="flex">
                    <button
                      onClick={() => setSelectedMealType("breakfast")}
                      className={`${
                        selectedMealType === "breakfast"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
                    >
                      Breakfast
                    </button>
                    <button
                      onClick={() => setSelectedMealType("lunch")}
                      className={`${
                        selectedMealType === "lunch"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
                    >
                      Lunch
                    </button>
                    <button
                      onClick={() => setSelectedMealType("dinner")}
                      className={`${
                        selectedMealType === "dinner"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
                    >
                      Dinner
                    </button>
                    <button
                      onClick={() => setSelectedMealType("snacks")}
                      className={`${
                        selectedMealType === "snacks"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
                    >
                      Snacks
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {new Date(activeDay).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                    {" - "}
                    {selectedMealType.charAt(0).toUpperCase() +
                      selectedMealType.slice(1)}
                  </h3>

                  {/* Current meal selection */}
                  {mealPlan[activeDay][selectedMealType] ? (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={mealPlan[activeDay][selectedMealType].image}
                            alt={mealPlan[activeDay][selectedMealType].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900">
                              {mealPlan[activeDay][selectedMealType].title}
                            </h4>
                            <button
                              onClick={() =>
                                removeRecipeFromMealPlan(
                                  activeDay,
                                  selectedMealType
                                )
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="mr-3">
                              {mealPlan[activeDay][selectedMealType].time}
                            </span>
                            <span>
                              {mealPlan[activeDay][selectedMealType].calories}{" "}
                              cal
                            </span>
                          </div>
                          <div className="mt-2">
                            <Link
                              href="#"
                              className="text-primary text-sm hover:underline"
                            >
                              View Recipe
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
                      <div className="text-gray-400 mb-2">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500">
                        No meal selected for this time slot
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Choose a recipe from suggestions below
                      </p>
                    </div>
                  )}

                  {/* Recipe suggestions */}
                  <h4 className="font-medium text-gray-900 mb-4">
                    Suggested Recipes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sampleRecipes[selectedMealType].map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => addRecipeToMealPlan(recipe)}
                      >
                        <div className="flex h-24">
                          <div className="relative w-1/3 h-full">
                            <Image
                              src={recipe.image}
                              alt={recipe.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-3">
                            <h5 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                              {recipe.title}
                            </h5>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="mr-2">{recipe.time}</span>
                              <span className="mr-2">•</span>
                              <span>{recipe.calories} cal</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly overview */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    Weekly Overview
                  </h3>
                </div>
                <div className="p-6">
                  {currentWeek.map((day) => {
                    const dayPlan = mealPlan[day.date];
                    const mealCount =
                      Object.values(dayPlan).filter(Boolean).length;
                    const totalCalories = Object.values(dayPlan)
                      .filter(Boolean)
                      .reduce((sum, meal) => sum + meal.calories, 0);

                    return (
                      <div
                        key={day.date}
                        className={`flex justify-between py-3 ${
                          day.date !== currentWeek[6].date
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {day.dayName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mealCount} meals planned
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            {totalCalories > 0 ? `${totalCalories} cal` : "-"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {mealCount > 0 ? "View details" : "Add meals"}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => setShowGroceryList(!showGroceryList)}
                    className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Generate Grocery List
                  </button>
                </div>
              </div>

              {/* Pre-made meal plans */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    Pre-made Meal Plans
                  </h3>
                </div>
                <div className="p-4">
                  {Object.entries(premadePlans).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => togglePremadePlan(key)}
                      className={`w-full text-left p-3 rounded-lg mb-2 last:mb-0 transition-colors ${
                        activePlan === key
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <h4 className="font-medium">{plan.name}</h4>
                      <p
                        className={`text-sm ${
                          activePlan === key ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </button>
                  ))}
                  <div className="mt-4 flex justify-center">
                    <Link
                      href="/premium"
                      className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
                    >
                      Get more meal plans with Premium
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grocery list modal */}
        {showGroceryList && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setShowGroceryList(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Grocery List
                    </h3>
                    <button
                      onClick={() => setShowGroceryList(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg
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

                  <div className="mt-2">
                    {generateGroceryList().map((category, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {category.category}
                        </h4>
                        <ul className="space-y-1">
                          {category.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-center text-gray-700"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mr-2"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Export List
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGroceryList(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Get started guide */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How to Use the{" "}
                <span className="text-primary">Meal Planner</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Planning your meals for the week has never been easier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Choose Your Days
                </h3>
                <p className="text-gray-600">
                  Select the days you want to plan meals for by clicking on the
                  dates in the weekly calendar.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Add Your Recipes
                </h3>
                <p className="text-gray-600">
                  Browse recipe suggestions or search for specific dishes and
                  add them to your meal plan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Generate Grocery List
                </h3>
                <p className="text-gray-600">
                  With one click, create a complete grocery list based on the
                  recipes in your meal plan.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/premium"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Upgrade to Premium for More Features
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
