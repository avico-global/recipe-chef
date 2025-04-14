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
        {/* Hero Section - Enhanced with better visual hierarchy and animation */}
        <div className="relative bg-gradient-to-b from-white to-gray-50 w-full py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Image and Video with enhanced animation */}

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 transform hover:scale-[1.01] transition-transform duration-300 min-h-96">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${recipe.videoId}`}
                  title={recipe.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Right Column - Enhanced typography and spacing */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-4 bg-primary/10 flex items-center justify-center text-primary shadow-lg ring-4 ring-primary/20">
                    <span className="text-xl font-bold capitalize">
                      {recipe?.authorName?.slice(0, 1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Created by
                    </p>
                    <span
                      // href={`/profile/${recipe.authorId}`}
                      className="text-lg text-gray-900 font-semibold hover:text-primary transition-colors"
                    >
                      {recipe.authorName}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {recipe.title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {recipe.description}
                </p>

                {/* Enhanced Ratings Display */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-6 h-6 ${
                            star <= Math.floor(recipe.ratings?.average || 0)
                              ? "text-yellow-400"
                              : "text-gray-200"
                          } transition-colors duration-200`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                      ({recipe.ratings?.count || 0})
                    </span>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-primary"
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
                    <span className="text-lg font-medium text-gray-700">
                      {recipe.cookTime}
                    </span>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                      saved
                        ? "bg-primary text-white shadow-lg shadow-primary/30 transform -translate-y-1"
                        : "bg-white text-gray-800 border-2 border-gray-200 hover:border-primary hover:text-primary"
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
                    className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-base font-semibold bg-primary text-white hover:bg-primary-hover transition-all duration-300 shadow-lg hover:shadow-xl shadow-primary/30 transform hover:-translate-y-1"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

              {/* Reviews Section */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex">
                        {recipe.ratings && recipe.ratings.average ? (
                          [1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.floor(recipe.ratings.average)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))
                        ) : (
                          <p>No ratings available</p>
                        )}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        (
                        {recipe.ratings && recipe.ratings.count
                          ? recipe.ratings.count
                          : 0}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Review Form */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-4">
                        {recipe.ratings && recipe.ratings.average ? (
                          [1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                              onClick={() => handleRatingClick(star)}
                              onMouseEnter={() => setHover(star)}
                              onMouseLeave={() => setHover(0)}
                            >
                              <svg
                                className={`h-8 w-8 ${
                                  (hover || recipe.ratings.average) >= star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                } transition-colors duration-150`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))
                        ) : (
                          <p>No ratings available</p>
                        )}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          {recipe.ratings && recipe.ratings.average
                            ? recipe.ratings.average === 0
                              ? "Rate this recipe"
                              : recipe.ratings.average === 5
                              ? "Excellent!"
                              : recipe.ratings.average === 4
                              ? "Very Good"
                              : recipe.ratings.average === 3
                              ? "Good"
                              : recipe.ratings.average === 2
                              ? "Fair"
                              : "Poor"
                            : "No ratings available"}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        rows="3"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="Share your experience with this recipe..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {recipe.comments && Array.isArray(recipe.comments) ? (
                      recipe.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-b border-gray-100 pb-6 last:border-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 bg-primary flex items-center justify-center text-white">
                                {comment.user.avatar ? (
                                  <Image
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.parentNode.classList.add(
                                        "fallback-avatar"
                                      );
                                    }}
                                  />
                                ) : (
                                  <span className="text-sm font-semibold">
                                    {comment.user.name
                                      ? comment.user.name
                                          .charAt(0)
                                          .toUpperCase()
                                      : "?"}
                                  </span>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {comment.user.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {comment.date}
                                </p>
                              </div>
                            </div>

                            <div className="flex">
                              {comment.rating ? (
                                [1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= comment.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))
                              ) : (
                                <p>No rating available</p>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-700">{comment.text}</p>

                          <div className="mt-2 flex justify-end">
                            <button className="text-gray-500 hover:text-primary text-xs flex items-center">
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
                                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                />
                              </svg>
                              Helpful
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No comments available</p>
                    )}
                  </div>
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

              {/* Similar Recipes */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Similar Recipes
                  </h3>
                  <div className="space-y-4">
                    {recipesData &&
                      recipesData
                        .filter(
                          (r) =>
                            r.id !== recipe.id &&
                            r.cuisineType === recipe.cuisineType
                        )
                        .slice(0, 3)
                        .map((rec) => (
                          <Link
                            key={rec.id}
                            href={`/recipes/${rec.id}`}
                            className="block group"
                          >
                            <div className="flex items-center p-2 rounded-lg group-hover:bg-gray-50 transition-colors">
                              <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <Image
                                  src={rec.thumbnail}
                                  alt={rec.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                                  {rec.title}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {rec.difficulty} • {rec.duration}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <Link
                      href="/recipes"
                      className="text-primary hover:text-primary-hover text-sm font-medium"
                    >
                      View All Recipes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
