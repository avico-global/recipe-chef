import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ThumbsUp, MessageCircle, Share2, Search, Filter, Grid, List, Trash2 } from "lucide-react";

export default function Favorites() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Mock data for saved recipes
  const savedRecipes = [
    {
      id: 1,
      title: "Classic Margherita Pizza",
      chef: "Chef Marco Rossi",
      cookTime: "30 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.8,
      reviews: 124,
      thumbnail: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Italian",
      dateSaved: "2023-06-10",
    },
    {
      id: 2,
      title: "Spicy Thai Green Curry",
      chef: "Chef Sarah Chen",
      cookTime: "45 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.6,
      reviews: 98,
      thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Asian",
      dateSaved: "2023-06-08",
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      chef: "Pastry Chef Marie Laurent",
      cookTime: "25 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.9,
      reviews: 156,
      thumbnail: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Dessert",
      dateSaved: "2023-06-05",
    },
    {
      id: 4,
      title: "Grilled Salmon with Asparagus",
      chef: "Chef James Wilson",
      cookTime: "35 mins",
      servings: 2,
      difficulty: "Medium",
      rating: 4.7,
      reviews: 112,
      thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Seafood",
      dateSaved: "2023-06-03",
    },
    {
      id: 5,
      title: "Vegetarian Buddha Bowl",
      chef: "Chef Michael Green",
      cookTime: "20 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.5,
      reviews: 87,
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Vegetarian",
      dateSaved: "2023-06-01",
    },
    {
      id: 6,
      title: "Homemade Sushi Rolls",
      chef: "Chef Sarah Chen",
      cookTime: "60 mins",
      servings: 4,
      difficulty: "Hard",
      rating: 4.8,
      reviews: 143,
      thumbnail: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "Asian",
      dateSaved: "2023-05-28",
    },
  ];

  // Get unique categories for filter
  const categories = ["all", ...new Set(savedRecipes.map(recipe => recipe.category.toLowerCase()))];

  // Filter and sort recipes
  const filteredRecipes = savedRecipes
    .filter(recipe => {
      // Filter by search query
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = selectedCategory === "all" || recipe.category.toLowerCase() === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "newest") {
        return new Date(b.dateSaved) - new Date(a.dateSaved);
      } else if (sortBy === "oldest") {
        return new Date(a.dateSaved) - new Date(b.dateSaved);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "cookTime") {
        // Extract minutes from cookTime string
        const getMinutes = (time) => parseInt(time.split(" ")[0]);
        return getMinutes(a.cookTime) - getMinutes(b.cookTime);
      }
      return 0;
    });

  // Function to handle recipe removal
  const handleRemoveRecipe = (id) => {
    // In a real app, this would call an API to remove the recipe
    console.log(`Removing recipe with ID: ${id}`);
    // For demo purposes, we'll just show an alert
    alert(`Recipe removed from favorites!`);
  };

  return (
    <div>
      {/* Head */}
      <Head>
        <title>My Favorites - Recipe Chef</title>
        <meta
          name="description"
          content="View and manage your saved recipes on Recipe Chef"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
          <p className="text-gray-600">
            All your saved recipes in one place
          </p>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search your saved recipes..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-gray-500" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating">Highest Rated</option>
                <option value="cookTime">Cooking Time</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Results Count */}
        <section className="mb-6">
          <p className="text-gray-600">
            Showing {filteredRecipes.length} of {savedRecipes.length} saved recipes
          </p>
        </section>

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <section className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">No recipes found</h2>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't saved any recipes yet"}
            </p>
            <Link href="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
          </section>
        )}

        {/* Recipe Grid */}
        {viewMode === "grid" && filteredRecipes.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={recipe.thumbnail}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 p-1.5 rounded-full transition-colors"
                      onClick={() => handleRemoveRecipe(recipe.id)}
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {recipe.category}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(recipe.dateSaved).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{recipe.title}</h3>
                    <p className="text-gray-600 mb-3">by {recipe.chef}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.cookTime}
                      <span className="mx-2">•</span>
                      <Users className="h-4 w-4 mr-1" />
                      {recipe.servings} servings
                      <span className="mx-2">•</span>
                      <span className="capitalize">{recipe.difficulty}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(recipe.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">
                          {recipe.rating} ({recipe.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        View Recipe
                      </Link>
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-primary">
                          <ThumbsUp className="h-5 w-5" />
                        </button>
                        <button className="text-gray-500 hover:text-primary">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                        <button className="text-gray-500 hover:text-primary">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recipe List */}
        {viewMode === "list" && filteredRecipes.length > 0 && (
          <section>
            <div className="space-y-4">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                >
                  <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                    <Image
                      src={recipe.thumbnail}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        {recipe.category}
                      </span>
                      <span className="ml-auto text-sm text-gray-500">
                        {new Date(recipe.dateSaved).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{recipe.title}</h3>
                    <p className="text-gray-600 mb-3">by {recipe.chef}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                      <div className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center mr-4">
                        <Users className="h-4 w-4 mr-1" />
                        {recipe.servings} servings
                      </div>
                      <div className="flex items-center">
                        <span className="capitalize">{recipe.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(recipe.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">
                          {recipe.rating} ({recipe.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        View Recipe
                      </Link>
                      <div className="flex space-x-2">
                        <button className="text-gray-500 hover:text-primary">
                          <ThumbsUp className="h-5 w-5" />
                        </button>
                        <button className="text-gray-500 hover:text-primary">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                        <button className="text-gray-500 hover:text-primary">
                          <Share2 className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveRecipe(recipe.id)}
                          title="Remove from favorites"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State for No Saved Recipes */}
        {savedRecipes.length === 0 && (
          <section className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">No saved recipes yet</h2>
            <p className="text-gray-600 mb-6">
              Start saving your favorite recipes to access them quickly from here.
            </p>
            <Link href="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
} 