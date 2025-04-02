import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import RecipeCard from "../../components/RecipeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

  // Mock recipe data - in a real app, this would be fetched based on the ID
  const recipe = {
    id: id || "1",
    title: "Classic Margherita Pizza",
    description:
      "A traditional Italian pizza with fresh mozzarella, tomatoes, and basil. Simple yet delicious, this recipe captures the essence of Neapolitan pizza making.",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video embed URL
    authorName: "John Smith",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    authorId: "johnsmith",
    datePosted: "2023-04-15",
    duration: "45 min",
    difficulty: "Medium",
    servings: 4,
    cuisineType: "Italian",
    mealType: "Dinner",
    tags: ["Italian", "Pizza", "Dinner"],
    dietary: [],
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
      {
        id: "c3",
        user: {
          name: "Emily Davis",
          avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        date: "2023-06-10",
        rating: 5,
        text: "This was my first time making pizza at home and it turned out amazing. The instructions were clear and easy to follow.",
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
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      duration: "40 min",
      difficulty: "Easy",
      tags: ["Italian", "Pizza", "Pepperoni"],
      videoPreview: "https://example.com/video2.mp4",
    },
    {
      id: "3",
      title: "Vegetarian Pizza",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      authorName: "Michael Brown",
      authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      duration: "45 min",
      difficulty: "Medium",
      tags: ["Vegetarian", "Pizza", "Healthy"],
      videoPreview: "https://example.com/video3.mp4",
    },
    {
      id: "4",
      title: "Italian Pasta Carbonara",
      thumbnail: "https://images.unsplash.com/photo-1612874742237-6526221588e3",
      authorName: "Sarah Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/women/66.jpg",
      duration: "30 min",
      difficulty: "Medium",
      tags: ["Italian", "Pasta", "Quick"],
      videoPreview: "https://example.com/video4.mp4",
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
    // In a real app, this would send the comment to the backend
    alert(`Comment submitted with rating: ${rating}/5`);
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

  // If the page is still loading the recipe
  if (router.isFallback) {
    return (
      <div className="container-custom py-12 flex justify-center items-center">
        <svg
          className="animate-spin h-10 w-10 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{recipe.title} - Recipe Chef</title>
        <meta name="description" content={recipe.description} />
      </Head>

      <Navbar />
      {/* Hero Section with Image Background */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={recipe.thumbnail}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10"></div>
        </div>
        <div className="container-custom relative z-10 h-full flex flex-col justify-end">
          <div className="text-white max-w-screen-xl mx-auto w-full mb-12">
            <div className="flex items-center space-x-2 mb-4">
              {recipe.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/recipes?tag=${encodeURIComponent(tag)}`}
                  className="inline-block bg-primary/80 backdrop-blur-sm hover:bg-primary text-white text-xs px-3 py-1 rounded-full transition-colors duration-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-sm">
              {recipe.title}
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-xl">
              {recipe.description}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white mr-2">
                  <Image
                    src={recipe.authorAvatar}
                    alt={recipe.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/profile/${recipe.authorId}`}
                  className="text-white hover:text-primary-100"
                >
                  {recipe.authorName}
                </Link>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="text-white">
                  {recipe.ratings.average} ({recipe.ratings.count})
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white/80 mr-1"
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
                <span className="text-white">{recipe.duration}</span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white/80 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
                <span className="text-white">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link href="/" className=" hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 mx-1">/</span>
            </li>
            <li>
              <Link
                href="/recipes"
                className="text-gray-500 hover:text-gray-700"
              >
                Recipes
              </Link>
            </li>
            <li>
              <span className="text-gray-500 mx-1">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {recipe.title}
            </li>
          </ol>
        </nav>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 mb-10 bg-white shadow-sm rounded-xl p-4">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center bg-primary text-black px-5 py-2 rounded-lg hover:bg-primary-hover transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
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
              Save Recipe
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 3.75H4c-.621 0-1.125.504-1.125 1.125V18c0 .621.504 1.125 1.125 1.125h4.5v1.5h-2.25a.75.75 0 0 0 0 1.5h11.25a.75.75 0 0 0 0-1.5h-2.25v-1.5h4.5c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125ZM18.85 9h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5Zm0 3h-4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5Zm-9.525-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm3 6.75a.75.75 0 0 0-1.5 0v1.5h1.5v-1.5Zm-1.5-5.25c0 1.243-1.007 2.25-2.25 2.25a2.252 2.252 0 0 1-2.25-2.25c0-1.243 1.007-2.25 2.25-2.25 1.243 0 2.25 1.007 2.25 2.25Z" />
              </svg>
              Share on Facebook
            </button>

            <button className="flex items-center justify-center bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-500 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.621-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102 4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732 11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9 0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z"></path>
              </svg>
              Share on Twitter
            </button>
          </div>
        </div>

        {/* Recipe Media and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Video Embed with card styling */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
                <iframe
                  src={recipe.videoUrl}
                  title={recipe.title}
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">
                  Watch the Recipe Video
                </h3>
                <p className="text-gray-600 text-sm">
                  Follow along with this step-by-step video to make the perfect{" "}
                  {recipe.title}.
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-100">
                <div className="flex">
                  <button
                    onClick={() => handleTabChange("ingredients")}
                    className={`${
                      activeTab === "ingredients"
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-gray-500"
                    } flex-1 text-center py-4 px-1 border-b-2 font-medium transition-colors duration-200`}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Ingredients
                    </span>
                  </button>
                  <button
                    onClick={() => handleTabChange("instructions")}
                    className={`${
                      activeTab === "instructions"
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-gray-500"
                    } flex-1 text-center py-4 px-1 border-b-2 font-medium transition-colors duration-200`}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      Instructions
                    </span>
                  </button>
                  <button
                    onClick={() => handleTabChange("nutrition")}
                    className={`${
                      activeTab === "nutrition"
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-gray-500"
                    } flex-1 text-center py-4 px-1 border-b-2 font-medium transition-colors duration-200`}
                  >
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Nutrition
                    </span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Ingredients Tab */}
                {activeTab === "ingredients" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Ingredients</h2>
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => adjustServings(-1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
                          disabled={servingsCount <= 1}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="text-sm font-medium">
                          {servingsCount} servings
                        </span>
                        <button
                          onClick={() => adjustServings(1)}
                          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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

                    <ul className="space-y-4">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex h-6 items-center">
                            <input
                              id={`ingredient-${index}`}
                              type="checkbox"
                              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                          <label
                            htmlFor={`ingredient-${index}`}
                            className="ml-3 cursor-pointer flex-1 text-gray-700 group-hover:text-gray-900"
                          >
                            {ingredient}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions Tab */}
                {activeTab === "instructions" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Instructions</h2>
                    <ol className="space-y-6">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex group">
                          <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-medium mr-4 shadow-sm group-hover:scale-110 transition-transform">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-700 py-2">{instruction}</p>
                            <div className="w-full h-[1px] bg-gray-100 mt-4"></div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Nutrition Tab */}
                {activeTab === "nutrition" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Nutrition Facts</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        per serving
                      </span>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-10">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-full bg-primary/10 rounded-full"></div>
                          </div>
                          <div className="relative flex flex-col items-center justify-center p-4">
                            <span className="text-primary text-3xl font-bold">
                              {recipe.nutritionFacts.calories}
                            </span>
                            <span className="text-gray-500 text-sm">
                              Calories
                            </span>
                          </div>
                        </div>

                        <div className="border-b pb-4">
                          <span className="text-sm text-gray-500 block mb-1">
                            Protein
                          </span>
                          <div className="flex items-end">
                            <p className="text-2xl font-medium">
                              {recipe.nutritionFacts.protein}
                            </p>
                            <div className="ml-2 h-1 bg-blue-400 w-16 rounded-full"></div>
                          </div>
                        </div>

                        <div className="border-b pb-4">
                          <span className="text-sm text-gray-500 block mb-1">
                            Carbs
                          </span>
                          <div className="flex items-end">
                            <p className="text-2xl font-medium">
                              {recipe.nutritionFacts.carbs}
                            </p>
                            <div className="ml-2 h-1 bg-green-400 w-24 rounded-full"></div>
                          </div>
                        </div>

                        <div className="border-b pb-4">
                          <span className="text-sm text-gray-500 block mb-1">
                            Fat
                          </span>
                          <div className="flex items-end">
                            <p className="text-2xl font-medium">
                              {recipe.nutritionFacts.fat}
                            </p>
                            <div className="ml-2 h-1 bg-yellow-400 w-12 rounded-full"></div>
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-500 block mb-1">
                            Fiber
                          </span>
                          <div className="flex items-end">
                            <p className="text-2xl font-medium">
                              {recipe.nutritionFacts.fiber}
                            </p>
                            <div className="ml-2 h-1 bg-purple-400 w-8 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-8 text-center">
                        * Percent Daily Values are based on a 2,000 calorie
                        diet. Your daily values may be higher or lower depending
                        on your calorie needs.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recipe Details
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Prep Time:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.prepTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Cook Time:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.cookTime}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Total Time:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Servings:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.servings}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Cuisine:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.cuisineType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Meal Type:
                    </span>
                    <span className="font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {recipe.mealType}
                    </span>
                  </div>
                </div>

                {recipe.dietary.length > 0 && (
                  <div className="mt-6">
                    <span className="text-gray-700 font-medium block mb-3">
                      Dietary:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {recipe.dietary.map((diet) => (
                        <span
                          key={diet}
                          className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary/10 px-6 py-4 border-b border-primary/20">
                <h3 className="text-lg font-semibold text-gray-800">
                  Equipment Needed
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Mixing bowl</span>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Pizza stone or baking sheet</span>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Pizza peel or spatula</span>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Oven</span>
                  </li>
                  <li className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary mr-3">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Pizza cutter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Reviews & Comments ({recipe.comments.length})
          </h2>

          {/* Comment Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h3 className="text-lg font-medium mb-4">Share Your Experience</h3>

            {/* Star Rating */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-3">Your Rating:</span>
              <div className="flex">
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
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 ${
                        (hover || rating) >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } transition-colors duration-150`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="none"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-gray-600 self-center">
                    {rating === 5
                      ? "Excellent!"
                      : rating === 4
                      ? "Very Good"
                      : rating === 3
                      ? "Good"
                      : rating === 2
                      ? "Fair"
                      : "Poor"}
                  </span>
                )}
              </div>
            </div>

            {/* Comment Text */}
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition-colors"
                  placeholder="What did you think? Did you make any modifications? Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Submit Review
              </button>
            </form>
          </div>

          {/* Existing Comments */}
          <div className="space-y-6">
            {recipe.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-6 rounded-xl shadow-sm transform transition duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/20 mr-4">
                      <Image
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">
                        {comment.user.name}
                      </h4>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                  </div>

                  <div className="flex bg-gray-50 px-3 py-1 rounded-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          star <= comment.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 border-l-4 border-primary/20 pl-4 py-1 italic">
                  {comment.text}
                </p>

                <div className="mt-4 flex justify-end">
                  <button className="text-gray-500 hover:text-primary text-sm flex items-center">
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
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .905.714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    Helpful
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Recipes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              You Might Also Like
            </h2>
            <Link
              href="/recipes"
              className="text-primary hover:text-primary-hover font-medium flex items-center group"
            >
              View All
              <svg
                className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
