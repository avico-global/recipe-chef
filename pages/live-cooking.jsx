import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Calendar, Clock, Users, ThumbsUp, MessageCircle, Share2, Search } from "lucide-react";

export default function LiveCooking() {
  const [activeTab, setActiveTab] = useState("live");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for live streams
  const liveStreams = [
    {
      id: 1,
      title: "Italian Pasta Making with Chef Marco",
      chef: "Chef Marco Rossi",
      viewers: 1243,
      thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Italian", "Pasta", "Cooking Class"],
      isLive: true,
    },
    {
      id: 2,
      title: "Asian Fusion Cooking Techniques",
      chef: "Chef Sarah Chen",
      viewers: 876,
      thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Asian", "Fusion", "Techniques"],
      isLive: true,
    },
    {
      id: 3,
      title: "Mediterranean Diet Basics",
      chef: "Chef Elena Papadopoulos",
      viewers: 542,
      thumbnail: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      tags: ["Mediterranean", "Healthy", "Diet"],
      isLive: true,
    },
  ];

  // Mock data for upcoming streams
  const upcomingStreams = [
    {
      id: 4,
      title: "BBQ Masterclass with Pitmaster John",
      chef: "Pitmaster John Smith",
      date: "June 15, 2023",
      time: "7:00 PM EST",
      thumbnail: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["BBQ", "Grilling", "Summer"],
    },
    {
      id: 5,
      title: "Dessert Masterclass: French Pastries",
      chef: "Pastry Chef Marie Laurent",
      date: "June 18, 2023",
      time: "3:00 PM EST",
      thumbnail: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      tags: ["Dessert", "French", "Pastry"],
    },
    {
      id: 6,
      title: "Vegetarian Cooking for Beginners",
      chef: "Chef Michael Green",
      date: "June 20, 2023",
      time: "6:00 PM EST",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Vegetarian", "Beginner", "Healthy"],
    },
  ];

  // Mock data for past streams
  const pastStreams = [
    {
      id: 7,
      title: "Mexican Street Food Favorites",
      chef: "Chef Carlos Rodriguez",
      date: "June 5, 2023",
      duration: "1h 23m",
      thumbnail: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      tags: ["Mexican", "Street Food", "Quick Meals"],
    },
    {
      id: 8,
      title: "Seafood Cooking Techniques",
      chef: "Chef James Wilson",
      date: "June 3, 2023",
      duration: "1h 45m",
      thumbnail: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      tags: ["Seafood", "Techniques", "Advanced"],
    },
    {
      id: 9,
      title: "Quick Weeknight Dinners",
      chef: "Chef Lisa Thompson",
      date: "May 30, 2023",
      duration: "1h 15m",
      thumbnail: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["Quick Meals", "Weeknight", "Family"],
    },
  ];

  // Filter streams based on search query
  const filterStreams = (streams) => {
    if (!searchQuery) return streams;
    
    return streams.filter(stream => 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Live Cooking - Recipe Chef</title>
        <meta
          name="description"
          content="Watch live cooking streams from top chefs and learn new recipes and techniques"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Live Cooking</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Watch top chefs cook in real-time, ask questions, and learn new techniques
          </p>
        </section>

        {/* Search Bar */}
        <section className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for live streams, chefs, or cuisines..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "live"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("live")}
            >
              Live Now
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "past"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Streams
            </button>
          </div>
        </section>

        {/* Featured Live Stream */}
        {activeTab === "live" && filterStreams(liveStreams).length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Live Stream</h2>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-[400px]">
                <Image
                  src={filterStreams(liveStreams)[0].thumbnail}
                  alt={filterStreams(liveStreams)[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
                      LIVE
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {filterStreams(liveStreams)[0].viewers.toLocaleString()} watching
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{filterStreams(liveStreams)[0].title}</h3>
                  <p className="text-lg mb-4">with {filterStreams(liveStreams)[0].chef}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filterStreams(liveStreams)[0].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-colors">
                    Join Stream
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stream Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {activeTab === "live"
              ? "All Live Streams"
              : activeTab === "upcoming"
              ? "Upcoming Streams"
              : "Past Streams"}
          </h2>

          {filterStreams(
            activeTab === "live"
              ? liveStreams
              : activeTab === "upcoming"
              ? upcomingStreams
              : pastStreams
          ).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No streams found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterStreams(
                activeTab === "live"
                  ? liveStreams
                  : activeTab === "upcoming"
                  ? upcomingStreams
                  : pastStreams
              ).map((stream) => (
                <div
                  key={stream.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      fill
                      className="object-cover"
                    />
                    {activeTab === "live" && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        LIVE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{stream.title}</h3>
                    <p className="text-gray-600 mb-3">with {stream.chef}</p>
                    
                    {activeTab === "live" && (
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {stream.viewers.toLocaleString()} watching
                      </div>
                    )}
                    
                    {activeTab === "upcoming" && (
                      <div className="flex flex-col space-y-1 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {stream.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {stream.time}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "past" && (
                      <div className="flex flex-col space-y-1 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {stream.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {stream.duration}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {stream.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <button className="text-primary hover:text-primary-dark font-medium">
                        {activeTab === "live"
                          ? "Join Stream"
                          : activeTab === "upcoming"
                          ? "Set Reminder"
                          : "Watch Replay"}
                      </button>
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
          )}
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Live Stream</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about upcoming live cooking sessions with your favorite chefs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 