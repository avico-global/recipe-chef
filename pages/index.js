import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import Shorts from "@/components/Shorts";
import Categories from "@/components/Categories";
import Head from "next/head";
import React, { useState } from "react";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for trending recipes
  const trendingRecipes = [
    {
      id: "1",
      title: "Classic Margherita Pizza",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      authorName: "John Smith",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      duration: "45 min",
      difficulty: "Medium",
      tags: ["Italian", "Pizza", "Dinner"],
      videoPreview: "https://example.com/video1.mp4",
    },
    {
      id: "2",
      title: "Spicy Thai Basil Chicken",
      thumbnail: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
      authorName: "Emily Chen",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      duration: "30 min",
      difficulty: "Easy",
      tags: ["Asian", "Chicken", "Spicy"],
      videoPreview: "https://example.com/video2.mp4",
    },
    {
      id: "3",
      title: "Chocolate Lava Cake",
      thumbnail: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      authorName: "Michael Brown",
      authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      duration: "40 min",
      difficulty: "Medium",
      tags: ["Dessert", "Chocolate", "Cake"],
      videoPreview: "https://example.com/video3.mp4",
    },
    {
      id: "4",
      title: "Mediterranean Grilled Vegetable Salad",
      thumbnail: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      authorName: "Sarah Johnson",
      authorAvatar: "https://randomuser.me/api/portraits/women/66.jpg",
      duration: "25 min",
      difficulty: "Easy",
      tags: ["Vegetarian", "Salad", "Healthy"],
      videoPreview: "https://example.com/video4.mp4",
    },
    {
      id: "5",
      title: "Creamy Mushroom Risotto",
      thumbnail: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
      authorName: "David Wilson",
      authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
      duration: "50 min",
      difficulty: "Hard",
      tags: ["Italian", "Rice", "Vegetarian"],
      videoPreview: "https://example.com/video5.mp4",
    },
    {
      id: "6",
      title: "Homemade Beef Tacos",
      thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
      authorName: "Maria Rodriguez",
      authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      duration: "35 min",
      difficulty: "Medium",
      tags: ["Mexican", "Beef", "Dinner"],
      videoPreview: "https://example.com/video6.mp4",
    },
    {
      id: "7",
      title: "Fresh Berry Smoothie Bowl",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      authorName: "Jessica Lee",
      authorAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
      duration: "15 min",
      difficulty: "Easy",
      tags: ["Breakfast", "Smoothie", "Healthy"],
      videoPreview: "https://example.com/video7.mp4",
    },
    {
      id: "8",
      title: "Garlic Butter Shrimp Pasta",
      thumbnail: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
      authorName: "Robert Taylor",
      authorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
      duration: "30 min",
      difficulty: "Medium",
      tags: ["Pasta", "Seafood", "Quick"],
      videoPreview: "https://example.com/video8.mp4",
    },
  ];

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would navigate to the search results page
    window.location.href = `/recipes?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Recipe Chef - Discover and Share Delicious Recipes</title>
        <meta
          name="description"
          content="Discover, share, and compete with delicious recipes on Recipe Chef"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      <main className="max-w-screen-xl flex flex-col items-center w-full mx-auto">
        <Carousel />
        <Shorts />
        <Categories />
        <Footer />
      </main>
    </div>
  );
}
