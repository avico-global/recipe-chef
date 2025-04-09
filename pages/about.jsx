import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* Head */}
      <Head>
        <title>About Us - Recipe Picks</title>
        <meta
          name="description"
          content="Learn about Recipe Picks's mission to connect food lovers and share delicious recipes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-6">About Recipe Picks</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-600">
            We're on a mission to connect food lovers, inspire creativity in the kitchen, 
            and make cooking accessible to everyone.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Recipe Picks was founded in 2023 by a group of food enthusiasts who wanted to create 
                a platform where people could discover, share, and celebrate their love for cooking.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a simple recipe sharing website has grown into a vibrant community 
                of home chefs, professional cooks, and food lovers from around the world.
              </p>
              <p className="text-gray-600">
                Today, Recipe Picks is more than just a recipe platform—it's a place where culinary 
                creativity flourishes, cooking skills are developed, and food brings people together.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Our Story" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inspire</h3>
              <p className="text-gray-600">
                Inspire people to explore new recipes and cooking techniques.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Connect food enthusiasts and create a community of passionate cooks.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Empower</h3>
              <p className="text-gray-600">
                Empower everyone to create delicious meals and share their culinary journey.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Team Member" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Team Member" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Michael Chen</h3>
              <p className="text-gray-600">Head of Product</p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                <Image 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Team Member" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Emma Rodriguez</h3>
              <p className="text-gray-600">Community Manager</p>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a seasoned chef or just starting your culinary journey, 
            Recipe Picks is the perfect place to share your passion for food.
          </p>
          <a href="/register" className="btn-primary inline-block">
            Sign Up Now
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
} 