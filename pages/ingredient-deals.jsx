import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight, ShoppingBag, Clock, Percent } from "lucide-react";

export default function IngredientDeals() {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  // Sample featured deals data
  const featuredDeals = [
    {
      id: 1,
      title: "Organic Avocados",
      image: "/assets/ingredient-deals/avocados.jpg",
      discount: "30% OFF",
      originalPrice: "$4.99",
      currentPrice: "$3.49",
      store: "Fresh Market",
      expiresIn: "3 days",
    },
    {
      id: 2,
      title: "Extra Virgin Olive Oil",
      image: "/assets/ingredient-deals/olive-oil.jpg",
      discount: "25% OFF",
      originalPrice: "$19.99",
      currentPrice: "$14.99",
      store: "Grocery Plus",
      expiresIn: "5 days",
    },
    {
      id: 3,
      title: "Artisan Sourdough Bread",
      image: "/assets/ingredient-deals/sourdough.jpg",
      discount: "Buy 1 Get 1 Free",
      originalPrice: "$6.99",
      currentPrice: "$6.99",
      store: "Bakery Delight",
      expiresIn: "2 days",
    },
  ];

  // Sample seasonal ingredients data
  const seasonalIngredients = [
    {
      id: 1,
      name: "Fresh Strawberries",
      image: "/assets/ingredient-deals/strawberries.jpg",
      discount: "20% OFF",
      price: "$3.99",
    },
    {
      id: 2,
      name: "Asparagus Bundle",
      image: "/assets/ingredient-deals/asparagus.jpg",
      discount: "15% OFF",
      price: "$2.79",
    },
    {
      id: 3,
      name: "Cherry Tomatoes",
      image: "/assets/ingredient-deals/cherry-tomatoes.jpg",
      discount: "25% OFF",
      price: "$1.99",
    },
    {
      id: 4,
      name: "Fresh Basil",
      image: "/assets/ingredient-deals/basil.jpg",
      discount: "10% OFF",
      price: "$1.49",
    },
  ];

  // Sample partner stores
  const partnerStores = [
    {
      id: 1,
      name: "Fresh Market",
      logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Fresh+Market",
      deals: 24,
    },
    {
      id: 2,
      name: "Grocery Plus",
      logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Grocery+Plus",
      deals: 18,
    },
    {
      id: 3,
      name: "Organic Valley",
      logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Organic+Valley",
      deals: 15,
    },
    {
      id: 4,
      name: "Spice World",
      logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Spice+World",
      deals: 12,
    },
  ];

  // Sample deal categories
  const dealCategories = [
    { id: 1, name: "Produce", count: 45 },
    { id: 2, name: "Dairy & Eggs", count: 32 },
    { id: 3, name: "Meat & Seafood", count: 28 },
    { id: 4, name: "Bakery", count: 22 },
    { id: 5, name: "Pantry Staples", count: 37 },
    { id: 6, name: "Spices & Herbs", count: 18 },
    { id: 7, name: "Kitchen Tools", count: 15 },
    { id: 8, name: "Cooking Oils", count: 12 },
  ];

  return (
    <div>
      {/* Head */}
      <Head>
        <title>Ingredient Deals - Recipe Picks</title>
        <meta
          name="description"
          content="Find the best deals on cooking ingredients and kitchen essentials"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Save on Your Favorite Cooking Ingredients
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Discover exclusive deals on fresh produce, pantry staples, and kitchen essentials. 
              Cook amazing recipes without breaking the bank.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition duration-300">
                View All Deals
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition duration-300">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Featured Deals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Deals</h2>
            <Link 
              href="/ingredient-deals/all" 
              className="text-primary hover:text-blue-700 flex items-center"
            >
              View all deals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <div 
                key={deal.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] group"
              >
                <div className="relative h-48">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {deal.discount}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-gray-500 line-through mr-2">{deal.originalPrice}</span>
                    <span className="text-xl font-bold text-primary">{deal.currentPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      {deal.store}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      Expires in {deal.expiresIn}
                    </div>
                  </div>
                  <button className="w-full bg-primary hover:bg-blue-700 text-white py-2 rounded-md transition duration-200">
                    Get Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seasonal Ingredients */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Seasonal Ingredients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {seasonalIngredients.map((ingredient) => (
              <div 
                key={ingredient.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <Image
                    src={ingredient.image}
                    alt={ingredient.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-primary hover:bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      View Deal
                    </button>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {ingredient.discount}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium">{ingredient.name}</h3>
                  <p className="text-primary font-bold">{ingredient.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter + Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Deal Categories */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {dealCategories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/ingredient-deals/category/${category.id}`}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                    {category.count} deals
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-blue-50 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-primary mb-4">
              <Percent className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Get the Best Deals</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter and never miss exclusive ingredient deals and offers.
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
                  Subscribe for Deals
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Partner Stores */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Partner Stores</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {partnerStores.map((store) => (
              <div 
                key={store.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="h-12 flex items-center justify-center mb-4">
                  <Image
                    src={store.logo}
                    alt={store.name}
                    width={120}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="font-medium mb-1">{store.name}</h3>
                <p className="text-sm text-gray-500">{store.deals} active deals</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Deals</h3>
              <p className="text-gray-600">
                Explore our curated selection of ingredient deals from top grocery stores and markets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get the Coupon Code</h3>
              <p className="text-gray-600">
                Click on a deal to reveal the coupon code or special offer details.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Save on Ingredients</h3>
              <p className="text-gray-600">
                Use the coupon in-store or online to save money on your favorite cooking ingredients.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white rounded-2xl overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Find the Perfect Recipe</h2>
              <p className="mb-6">
                Discover delicious recipes that use your discounted ingredients. Save on groceries and cook amazing meals!
              </p>
              <div>
                <Link 
                  href="/recipes" 
                  className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium inline-block transition duration-300"
                >
                  Browse Recipes
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
              <Image
                src="/assets/ingredient-deals/cooking-ingredients.jpg"
                alt="Cooking with ingredients"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 