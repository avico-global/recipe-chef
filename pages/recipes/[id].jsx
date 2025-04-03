import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "react-hot-toast";

/**
 * RecipeDetail component - displays detailed information about a specific recipe
 * Includes video, instructions, and user interaction features
 */
export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [activeTab, setActiveTab] = useState("ingredients");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [servingsCount, setServingsCount] = useState(4);
  const [saved, setSaved] = useState(false);

  // Mock recipe data - in a real app, this would be fetched based on the ID
  const recipe = {
    id: id || "1",
    title: "Classic Margherita Pizza",
    description:
      "A traditional Italian pizza with fresh mozzarella, tomatoes, and basil. Simple yet delicious, this recipe captures the essence of Neapolitan pizza making.",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    videoUrl: "https://www.youtube.com/embed/xdshDFwu9x4", // Example video embed URL
    authorName: "John Smith",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    authorId: "johnsmith",
    datePosted: "2023-04-15",
    duration: "45 min",
    difficulty: "Medium",
    servings: 4,
    cuisineType: "Italian",
    mealType: "Dinner",
    tags: ["Italian", "Pizza", "Dinner", "Vegetarian"],
    dietary: ["Vegetarian"],
    prepTime: "15 min",
    cookTime: "30 min",
    ingredients: [
      "500g pizza dough",
      "1 can (400g) San Marzano tomatoes, crushed",
      "200g fresh mozzarella cheese, torn into pieces",
      "Fresh basil leaves",
      "2 cloves garlic, minced",
      "2 tbsp extra virgin olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat your oven to the highest temperature (usually around 500°F/260°C) with a pizza stone or steel if you have one.",
      "In a small bowl, mix the crushed tomatoes with minced garlic, 1 tbsp olive oil, salt, and pepper to make the sauce.",
      "On a floured surface, stretch the pizza dough into a 12-inch circle.",
      "Transfer the dough to a pizza peel or baking sheet lined with parchment paper.",
      "Spread the tomato sauce evenly over the dough, leaving a small border for the crust.",
      "Distribute the torn mozzarella pieces evenly over the sauce.",
      "Bake for 8-10 minutes, or until the crust is golden and the cheese is bubbly.",
      "Remove from the oven, drizzle with the remaining olive oil, and scatter fresh basil leaves on top.",
      "Let cool slightly before slicing and serving.",
    ],
    nutritionFacts: {
      calories: 350,
      protein: "15g",
      carbs: "45g",
      fat: "12g",
      fiber: "3g",
    },
    ratings: {
      average: 4.7,
      count: 127,
    },
    comments: [
      {
        id: "c1",
        user: {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        },
        date: "2023-06-20",
        rating: 5,
        text: "Absolutely delicious! The dough came out perfectly crispy on the outside and chewy inside. Will definitely make again!",
      },
      {
        id: "c2",
        user: {
          name: "Michael Brown",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        date: "2023-06-15",
        rating: 4,
        text: "Great recipe! I added some red pepper flakes for extra heat and it was perfect.",
      },
    ],
  };

  // Mock similar recipes
  const similarRecipes = [
    {
      id: "2",
      title: "Pepperoni Pizza",
      thumbnail: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      authorName: "Emily Chen",
      duration: "40 min",
      difficulty: "Easy",
    },
    {
      id: "3",
      title: "Vegetarian Pizza",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      authorName: "Michael Brown",
      duration: "45 min",
      difficulty: "Medium",
    },
  ];

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

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{recipe.title} - Recipe Picks</title>
        <meta name="description" content={recipe.description} />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gray-50 container mx-auto">
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Image and Video */}
              <div className="space-y-8">
                {/* Main Image */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-white/90">
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1"
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
                        {recipe.duration}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-5 h-5 mr-1"
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
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={recipe.videoUrl}
                      title={recipe.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={recipe.authorAvatar}
                      alt={recipe.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">By</p>
                    <Link
                      href={`/profile/${recipe.authorId}`}
                      className="text-gray-900 font-medium hover:text-primary transition-colors"
                    >
                      {recipe.authorName}
                    </Link>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {recipe.title}
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
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
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({recipe.ratings.count} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleSave}
                    className={`flex items-center justify-center py-3 px-6 rounded-lg font-medium transition ${
                      saved
                        ? "bg-primary text-white"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    {saved ? "Saved" : "Save Recipe"}
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center justify-center py-3 px-6 rounded-lg font-medium bg-primary text-white hover:bg-primary-hover transition"
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

        {/* Main Content */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Recipe Content */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="border-b border-gray-100">
                  <nav className="flex">
                    <button
                      onClick={() => handleTabChange("ingredients")}
                      className={`${
                        activeTab === "ingredients"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium transition-colors duration-200`}
                    >
                      Ingredients
                    </button>
                    <button
                      onClick={() => handleTabChange("instructions")}
                      className={`${
                        activeTab === "instructions"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium transition-colors duration-200`}
                    >
                      Instructions
                    </button>
                    <button
                      onClick={() => handleTabChange("nutrition")}
                      className={`${
                        activeTab === "nutrition"
                          ? "border-primary text-primary"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      } flex-1 py-4 px-1 text-center border-b-2 font-medium transition-colors duration-200`}
                    >
                      Nutrition
                    </button>
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

                      <ul className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Instructions Tab */}
                  {activeTab === "instructions" && (
                    <div>
                      <h2 className="text-xl font-semibold mb-6">
                        Step-by-Step Instructions
                      </h2>
                      <ol className="space-y-6">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex">
                            <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-medium mr-4">
                              {index + 1}
                            </span>
                            <p className="text-gray-700">{instruction}</p>
                          </li>
                        ))}
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
                                {recipe.nutritionFacts.calories}
                              </span>
                            </div>
                            <span className="text-gray-500">Calories</span>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Protein</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts.protein}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Carbs</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts.carbs}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: "75%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Fat</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts.fat}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Fiber</span>
                              <span className="font-medium">
                                {recipe.nutritionFacts.fiber}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: "25%" }}
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
                        {[1, 2, 3, 4, 5].map((star) => (
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
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        ({recipe.ratings.count} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Review Form */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-4">
                        {[1, 2, 3, 4, 5].map((star) => (
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
                                (hover || rating) >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              } transition-colors duration-150`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">
                          {rating === 0
                            ? "Rate this recipe"
                            : rating === 5
                            ? "Excellent!"
                            : rating === 4
                            ? "Very Good"
                            : rating === 3
                            ? "Good"
                            : rating === 2
                            ? "Fair"
                            : "Poor"}
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
                    {recipe.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-b border-gray-100 pb-6 last:border-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                              <Image
                                src={comment.user.avatar}
                                alt={comment.user.name}
                                fill
                                className="object-cover"
                              />
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
                            {[1, 2, 3, 4, 5].map((star) => (
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
                            ))}
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
                    ))}
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
                    {similarRecipes.map((recipe) => (
                      <Link
                        key={recipe.id}
                        href={`/recipes/${recipe.id}`}
                        className="block group"
                      >
                        <div className="flex items-center p-2 rounded-lg group-hover:bg-gray-50 transition-colors">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={recipe.thumbnail}
                              alt={recipe.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                              {recipe.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {recipe.difficulty} • {recipe.duration}
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
