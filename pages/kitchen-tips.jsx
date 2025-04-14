import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Play, Clock, BookOpen, Award, Search, Tag } from "lucide-react";

export default function KitchenTips() {
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log(`Searching for: ${searchQuery}`);
  };

  // Sample featured tips data
  const featuredTips = [
    {
      id: 1,
      title: "10 Ways to Keep Your Knives Sharp",
      image: "/assets/kitchen-tips/knife-sharpening.jpg",
      category: "Equipment Care",
      readTime: "5 min read",
      excerpt: "Learn how to maintain your knives' edge and extend their lifespan with these expert sharpening tips.",
    },
    {
      id: 2,
      title: "Perfect Caramelization: The Secret to Flavor",
      image: "/assets/kitchen-tips/caramelization.jpg",
      category: "Cooking Techniques",
      readTime: "8 min read",
      excerpt: "Master the art of caramelization to add depth and richness to your dishes, from onions to proteins.",
    },
    {
      id: 3,
      title: "Mise en Place: Cook Like a Pro Chef",
      image: "/assets/kitchen-tips/mise-en-place.jpg",
      category: "Kitchen Organization",
      readTime: "6 min read",
      excerpt: "Discover how professional chefs stay organized and efficient with the 'everything in its place' approach.",
    },
  ];

  // Sample quick tips data
  const quickTips = [
    {
      id: 1,
      tip: "Add a pinch of salt to coffee grounds before brewing to reduce bitterness.",
      category: "Coffee",
    },
    {
      id: 2,
      tip: "Use a wooden spoon across a pot to prevent water from boiling over.",
      category: "Cooking",
    },
    {
      id: 3,
      tip: "Freeze fresh herbs in olive oil using ice cube trays for ready-to-use flavor bombs.",
      category: "Food Prep",
    },
    {
      id: 4,
      tip: "Put a damp paper towel under your cutting board to prevent it from slipping.",
      category: "Safety",
    },
    {
      id: 5,
      tip: "Microwave lemons for 15 seconds before juicing to get more juice out of them.",
      category: "Ingredients",
    },
  ];

  // Sample video tutorials data
  const videoTutorials = [
    {
      id: 1,
      title: "Master Basic Knife Skills",
      thumbnail: "/assets/kitchen-tips/knife-skills.jpg",
      duration: "12:45",
      views: "245K",
    },
    {
      id: 2,
      title: "5 Essential Cooking Methods Every Home Chef Should Know",
      thumbnail: "/assets/kitchen-tips/cooking-methods.jpg",
      duration: "18:32",
      views: "182K",
    },
    {
      id: 3,
      title: "Meal Prep Strategies to Save Time & Money",
      thumbnail: "/assets/kitchen-tips/meal-prep.jpg",
      duration: "15:20",
      views: "320K",
    },
    {
      id: 4,
      title: "How to Properly Season Cast Iron Cookware",
      thumbnail: "/assets/kitchen-tips/cast-iron.jpg",
      duration: "08:15",
      views: "146K",
    },
  ];

  // Sample tip categories
  const tipCategories = [
    {
      id: 1,
      name: "Knife Skills",
      icon: "🔪",
      count: 15,
    },
    {
      id: 2,
      name: "Food Storage",
      icon: "🥫",
      count: 22,
    },
    {
      id: 3,
      name: "Time-Saving Hacks",
      icon: "⏱️",
      count: 18,
    },
    {
      id: 4,
      name: "Flavor Boosters",
      icon: "🌶️",
      count: 12,
    },
    {
      id: 5,
      name: "Kitchen Organization",
      icon: "📋",
      count: 14,
    },
    {
      id: 6,
      name: "Cooking Techniques",
      icon: "🍳",
      count: 25,
    },
    {
      id: 7,
      name: "Baking Tips",
      icon: "🍞",
      count: 20,
    },
    {
      id: 8,
      name: "Equipment Care",
      icon: "🧹",
      count: 16,
    },
  ];

  // Sample trending topics
  const trendingTopics = [
    "Air Fryer Hacks",
    "Sous Vide Cooking",
    "Food Preservation",
    "Zero Waste Kitchen",
    "One-Pot Meals",
    "Instant Pot Tips",
  ];

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Kitchen Tips - Recipe Picks</title>
        <meta
          name="description"
          content="Expert kitchen tips, cooking techniques, and culinary hacks to improve your cooking skills"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Kitchen Tips & Techniques
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Elevate your cooking with expert advice, time-saving hacks, and professional techniques to make every meal exceptional.
            </p>
            <form onSubmit={handleSearch} className="flex w-full max-w-lg rounded-full overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for kitchen tips..."
                className="flex-grow py-3 px-6 text-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 flex items-center justify-center"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Tips */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Kitchen Tips</h2>
            <Link 
              href="/kitchen-tips/all" 
              className="text-primary hover:text-blue-700 flex items-center"
            >
              View all tips <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredTips.map((tip) => (
              <div 
                key={tip.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-48">
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {tip.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{tip.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" /> {tip.readTime}
                    </span>
                    <Link 
                      href={`/kitchen-tips/${tip.id}`}
                      className="text-primary hover:text-blue-700 font-medium"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-6">Quick Kitchen Hacks</h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
            {quickTips.map((tip) => (
              <div 
                key={tip.id}
                className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{tip.tip}</p>
                  <span className="text-xs text-primary mt-1 inline-block px-2 py-1 bg-blue-50 rounded-full">
                    {tip.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tip Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Browse Tips by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tipCategories.map((category) => (
              <Link 
                key={category.id}
                href={`/kitchen-tips/category/${category.id}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} tips</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Video Tutorials</h2>
            <Link 
              href="/kitchen-tips/videos" 
              className="text-primary hover:text-blue-700 flex items-center"
            >
              View all videos <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video) => (
              <div 
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="relative h-48">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="h-6 w-6 text-primary" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-2">{video.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{video.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter + Trending */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Trending Topics */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Trending Topics</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-wrap gap-3">
                {trendingTopics.map((topic, index) => (
                  <Link 
                    key={index}
                    href={`/kitchen-tips/search?query=${encodeURIComponent(topic)}`}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center"
                  >
                    <Tag className="h-4 w-4 mr-1 text-primary" />
                    {topic}
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-lg mb-4">Most Popular Articles</h3>
                <ol className="space-y-4">
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary">1</span>
                    <Link href="/kitchen-tips/article1" className="text-gray-700 hover:text-primary">How to Properly Store Fruits and Vegetables</Link>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary">2</span>
                    <Link href="/kitchen-tips/article2" className="text-gray-700 hover:text-primary">10 Essential Tools Every Home Chef Needs</Link>
                  </li>
                  <li className="flex gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-primary">3</span>
                    <Link href="/kitchen-tips/article3" className="text-gray-700 hover:text-primary">The Ultimate Guide to Cooking Perfect Rice</Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-blue-50 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-primary mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Get Weekly Tips</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and receive expert kitchen tips and recipes every week.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
                >
                  Subscribe Now
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Have a Kitchen Tip to Share?</h2>
              <p className="text-gray-600 mb-6">
                Join our community and share your favorite kitchen hacks, time-saving tricks, or cooking techniques with fellow food enthusiasts.
              </p>
              <Link 
                href="/contribute" 
                className="bg-primary text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium inline-block transition duration-300"
              >
                Submit Your Tip
              </Link>
            </div>
            <div className="md:w-1/2 p-8">
              <Image
                src="/assets/kitchen-tips/cooking-together.jpg"
                alt="Cooking together"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Explore More Kitchen Wisdom</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              href="/kitchen-tips/beginners"
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src="/assets/kitchen-tips/beginners-guide.jpg"
                  alt="Beginner tips"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Beginner's Guide</h3>
                    <p className="text-white/80">Essential skills for new cooks</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/kitchen-tips/seasonal"
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src="/assets/kitchen-tips/seasonal-cooking.jpg"
                  alt="Seasonal cooking"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Seasonal Cooking</h3>
                    <p className="text-white/80">Make the most of seasonal ingredients</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link 
              href="/kitchen-tips/advanced"
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative h-40">
                <Image
                  src="/assets/kitchen-tips/advanced-techniques.jpg"
                  alt="Advanced techniques"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Advanced Techniques</h3>
                    <p className="text-white/80">Take your cooking to the next level</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 