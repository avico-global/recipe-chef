import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { toast } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import recipesData from "../../data/recipeDetails.json";

/**
 * RecipeDetail component - displays detailed information about a specific recipe
 * Includes video, instructions, and user interaction features
 */
export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [servingsCount, setServingsCount] = useState(4);
  const [saved, setSaved] = useState(false);

  // Fetch recipe details when id is available
  useEffect(() => {
    if (!id) return;

    // Find the recipe with the matching id
    const foundRecipe = recipesData.find((recipe) => recipe.id === id);

    if (foundRecipe) {
      // In a real app, you would fetch additional recipe details here
      // For now, we'll simulate a delay to mimic an API call
      setTimeout(() => {
        setRecipe(foundRecipe);
        setLoading(false);
      }, 500);
    } else {
      // Handle case when recipe is not found
      router.push("/recipes");
    }
  }, [id, router]);

  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle star rating
  const handleRatingClick = (rating) => {
    setRating(rating);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    toast.success("Review submitted successfully!");
    setComment("");
    setRating(0);
  };

  // Handle recipe printing
  const handlePrint = () => {
    window.print();
  };

  // Handle servings adjustment
  const adjustServings = (amount) => {
    const newCount = servingsCount + amount;
    if (newCount >= 1) {
      setServingsCount(newCount);
    }
  };

  // Handle saving recipe
  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast.success("Recipe saved to your cookbook!");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-t-4 border-primary/30 rounded-full absolute top-0 left-0 animate-ping"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!recipe) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Recipe not found
            </h1>
            <p className="mt-4 text-gray-600">
              Sorry, the recipe you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/recipes")}
              className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{recipe.title} - Recipe Picks</title>
        <meta name="description" content={recipe.description} />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner Section - Redesigned */}
        <div className="relative bg-white pb-8 border-b border-gray-100">
          <div className="container mx-auto px-4 py-8 min-h-[50vh] max-h-[50vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              {/* Left Column - Video */}
              <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${recipe.videoId}`}
                  title={recipe.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Column - Content */}
              <div className="flex flex-col justify-between h-full">
                {/* Header Content */}
                <div>
                  {/* Author and Date */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">
                          {recipe?.authorName?.slice(0, 1)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500">Recipe by</p>
                        <p className="font-medium text-gray-900">
                          {recipe.authorName}
                        </p>
                      </div>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-medium text-gray-900">
                        {recipe.publishDate || "Recently"}
                      </p>
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {recipe.title}
                  </h1>
                  <p className="text-gray-600 line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-4 my-6">
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {recipe.views || "1.5M"}
                    </div>
                    <div className="text-sm text-gray-500">Views</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {recipe.likes || "100K"}
                    </div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {recipe.ratings?.average || 0}
                    </div>
                    <div className="text-sm text-gray-500">Rating</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-50">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {recipe.cookTime}
                    </div>
                    <div className="text-sm text-gray-500">Minutes</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Difficulty</p>
                      <p className="font-medium text-gray-900">
                        {recipe.difficulty || "Intermediate"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4.318l-1.318 3.8A1 1 0 0 1 9.74 9H5.82a1 1 0 0 0-.64 1.77l3.133 2.28a1 1 0 0 1 .364 1.118L7.36 17.473a1 1 0 0 0 1.538 1.118l3.133-2.28a1 1 0 0 1 1.176 0l3.133 2.28a1 1 0 0 0 1.538-1.118l-1.318-3.8a1 1 0 0 1 .364-1.118l3.133-2.28A1 1 0 0 0 19.18 9h-3.92a1 1 0 0 1-.951-.682L13.318 4.318a1 1 0 0 0-1.896 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Servings</p>
                      <p className="font-medium text-gray-900">
                        {servingsCount} people
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                      saved
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 mr-2 ${saved ? "animate-pulse" : ""}`}
                      fill={saved ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {saved ? "Saved!" : "Save Recipe"}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-base font-semibold bg-primary text-white hover:bg-primary-hover transition-all duration-300"
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
                        strokeWidth="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"
                      />
                    </svg>
                    Print Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Updated with modern card designs */}
        <div className="container mx-auto px-4 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Recipe Content - Improved tabs and card design */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10 transition-all duration-300 hover:shadow-xl">
                <div className="border-b border-gray-100">
                  <nav className="flex">
                    {["ingredients", "instructions", "nutrition"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`
                          flex-1 py-6 px-1 text-center text-lg font-medium transition-all duration-300
                          ${
                            activeTab === tab
                              ? "border-b-4 border-primary text-primary"
                              : "border-b-4 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                          }
                        `}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Ingredients Tab */}
                  {activeTab === "ingredients" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Ingredients</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Servings:
                          </span>
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              onClick={() => adjustServings(-1)}
                              className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                              disabled={servingsCount <= 1}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="px-3 py-1 font-medium">
                              {servingsCount}
                            </span>
                            <button
                              onClick={() => adjustServings(1)}
                              className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {recipe.ingredients &&
                      Array.isArray(recipe.ingredients) ? (
                        recipe.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="ml-3 text-gray-700">
                              {ingredient}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>No ingredients information available.</p>
                      )}
                    </div>
                  )}

                  {/* Instructions Tab */}
                  {activeTab === "instructions" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-6">
                        Step-by-Step Instructions
                      </h2>
                      <ol className="space-y-6">
                        {recipe.instructions &&
                        Array.isArray(recipe.instructions) ? (
                          recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex">
                              <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-medium mr-4">
                                {index + 1}
                              </span>
                              <p className="text-gray-700">{instruction}</p>
                            </li>
                          ))
                        ) : (
                          <p>No instructions available</p>
                        )}
                      </ol>
                    </div>
                  )}

                  {/* Nutrition Tab */}
                  {activeTab === "nutrition" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">
                          Nutrition Facts
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          per serving
                        </span>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="grid grid-cols-2 gap-y-6">
                          <div className="flex items-center">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-primary text-xl font-bold">
                                {recipe.nutritionFacts &&
                                recipe.nutritionFacts.calories
                                  ? recipe.nutritionFacts.calories
                                  : "N/A"}
                              </span>
                            </div>
                            <span className="text-gray-500">Calories</span>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Protein</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts &&
                                recipe.nutritionFacts.protein
                                  ? recipe.nutritionFacts.protein
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{
                                  width:
                                    recipe.nutritionFacts &&
                                    recipe.nutritionFacts.proteinPercent
                                      ? `${recipe.nutritionFacts.proteinPercent}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Carbs</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts &&
                                recipe.nutritionFacts.carbs
                                  ? recipe.nutritionFacts.carbs
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width:
                                    recipe.nutritionFacts &&
                                    recipe.nutritionFacts.carbsPercent
                                      ? `${recipe.nutritionFacts.carbsPercent}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Fat</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts &&
                                recipe.nutritionFacts.fat
                                  ? recipe.nutritionFacts.fat
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{
                                  width:
                                    recipe.nutritionFacts &&
                                    recipe.nutritionFacts.fatPercent
                                      ? `${recipe.nutritionFacts.fatPercent}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Fiber</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts &&
                                recipe.nutritionFacts.fiber
                                  ? recipe.nutritionFacts.fiber
                                  : "N/A"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{
                                  width:
                                    recipe.nutritionFacts &&
                                    recipe.nutritionFacts.fiberPercent
                                      ? `${recipe.nutritionFacts.fiberPercent}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div>
              {/* Recipe Details */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Recipe Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Prep Time</p>
                      <p className="font-medium">{recipe.prepTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cook Time</p>
                      <p className="font-medium">{recipe.cookTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cuisine</p>
                      <p className="font-medium">{recipe.cuisineType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Meal Type</p>
                      <p className="font-medium">{recipe.mealType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment Needed */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Equipment Needed
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Mixing bowl
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pizza stone or baking sheet
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pizza peel or spatula
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Oven
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pizza cutter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Recipes - New Full Width Section */}
          <div className="my-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Similar Recipes You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipesData &&
                recipesData
                  .filter(
                    (r) =>
                      r.id !== recipe.id &&
                      (r.cuisineType === recipe.cuisineType ||
                        r.mealType === recipe.mealType)
                  )
                  .slice(0, 8)
                  .map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/recipes/${rec.id}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={rec.thumbnail}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                          {rec.title}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {rec.duration}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{rec.difficulty}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
            <div className="mt-14 text-center">
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover transition-colors duration-300"
              >
                Explore More Recipes
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
