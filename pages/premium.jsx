import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PremiumContent() {
  const [plan, setPlan] = useState("monthly");

  // Sample premium recipes data
  const premiumRecipes = [
    {
      id: 1,
      title: "Sous Vide Wagyu Steak",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
      chef: "Gordon Smith",
      time: "1.5 hrs",
      difficulty: "Expert",
      rating: 4.9,
      reviews: 124,
      locked: false,
    },
    {
      id: 2,
      title: "Lobster Thermidor",
      image: "https://images.unsplash.com/photo-1556611832-c5f358b0057e",
      chef: "Julia Martinez",
      time: "2 hrs",
      difficulty: "Hard",
      rating: 4.8,
      reviews: 78,
      locked: true,
    },
    {
      id: 3,
      title: "Truffle Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
      chef: "Marco Rossi",
      time: "45 min",
      difficulty: "Medium",
      rating: 4.7,
      reviews: 92,
      locked: true,
    },
    {
      id: 4,
      title: "Beef Wellington",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947",
      chef: "Elizabeth Chen",
      time: "3 hrs",
      difficulty: "Expert",
      rating: 4.9,
      reviews: 156,
      locked: true,
    },
  ];

  // Benefits of premium membership
  const benefits = [
    {
      icon: "🔒",
      title: "Exclusive Recipes",
      description: "Access our library of 500+ premium recipes from world-renowned chefs."
    },
    {
      icon: "📹",
      title: "HD Video Tutorials",
      description: "Step-by-step video guides with professional techniques and tips."
    },
    {
      icon: "📱",
      title: "Meal Planning Tools",
      description: "Create and save custom meal plans with automatic grocery lists."
    },
    {
      icon: "👨‍🍳",
      title: "Chef Q&A Sessions",
      description: "Monthly live sessions with professional chefs to answer your questions."
    },
    {
      icon: "🛒",
      title: "Ingredient Discounts",
      description: "Exclusive discounts on specialty ingredients from our partners."
    },
    {
      icon: "🔄",
      title: "Ad-Free Experience",
      description: "Enjoy Recipe Picks without any advertisements or distractions."
    }
  ];

  return (
    <>
      <Head>
        <title>Premium Membership - Recipe Picks</title>
        <meta
          name="description"
          content="Unlock exclusive recipes, HD video tutorials, and more with Recipe Picks Premium Membership"
        />
      </Head>

      <Navbar />

      <main className="bg-gray-50">
        {/* Hero section */}
        <div className="relative bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136"
              alt="Premium cooking background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Elevate Your Cooking with Recipe Picks Premium
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Unlock exclusive recipes, professional techniques, and culinary secrets from world-renowned chefs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#pricing"
                  className="btn-primary py-3 px-8 text-lg rounded-full"
                >
                  Join Premium
                </Link>
                <Link
                  href="#preview"
                  className="bg-white/20 hover:bg-white/30 text-white py-3 px-8 text-lg rounded-full transition"
                >
                  Explore Benefits
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Preview section */}
        <section id="preview" className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Recipe <span className="text-primary">Previews</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a taste of what awaits in our premium collection. These gourmet recipes combine exceptional ingredients with expert techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white text-sm mb-2">
                      <span className="bg-primary/80 px-2 py-1 rounded-full">
                        {recipe.time}
                      </span>
                      <span className="bg-gray-900/80 px-2 py-1 rounded-full">
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>

                  {recipe.locked && (
                    <div className="absolute top-0 right-0 bg-black/80 text-white p-2 rounded-bl-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      by {recipe.chef}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {recipe.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({recipe.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="#pricing" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              Unlock all premium recipes
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Premium <span className="text-primary">Benefits</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our premium membership gives you access to exclusive content and features that will transform your cooking experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-primary">Simple</span> Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that's right for you and start exploring our premium recipe collection.
            </p>
            
            <div className="flex justify-center mt-8 mb-12">
              <div className="bg-gray-100 p-1 rounded-full inline-flex">
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium ${
                    plan === "monthly" 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-full text-sm font-medium ${
                    plan === "annual" 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setPlan("annual")}
                >
                  Annual <span className="text-green-600 font-bold">Save 20%</span>
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-primary p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Recipe Picks Premium</h3>
                <p className="opacity-90 mb-6">All the tools you need to become a better chef</p>
                <div className="text-4xl font-bold">
                  {plan === "monthly" ? "$9.99" : "$95.88"}
                  <span className="text-lg font-normal opacity-80">
                    /{plan === "monthly" ? "month" : "year"}
                  </span>
                </div>
                {plan === "annual" && (
                  <div className="mt-2 inline-block bg-green-500 text-white rounded-full px-3 py-1 text-sm">
                    Save $24 yearly
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Access to 500+ premium recipes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">HD video tutorials for all premium recipes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Advanced meal planning tools</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Monthly live Q&A sessions with chefs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Exclusive discounts on specialty ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Ad-free browsing experience</span>
                  </li>
                </ul>
                
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Get Started Now
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Cancel anytime. No long-term commitment required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our <span className="text-primary">Members</span> Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied home chefs who have transformed their cooking with Recipe Picks Premium.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The premium recipes have transformed my family dinners. The video tutorials make even complex techniques easy to follow. Worth every penny!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">James Davis</h4>
                    <p className="text-sm text-gray-500">Premium member for 8 months</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I love the meal planning feature! I'm saving money on groceries and cooking restaurant-quality meals at home. The chef Q&A sessions are incredibly insightful."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                    ML
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Maria Lopez</h4>
                    <p className="text-sm text-gray-500">Premium member for 1 year</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "As a culinary student, the advanced techniques in the premium recipes have helped me develop my skills. The ingredient discounts are a great bonus!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold">
                    TW
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Thomas Wong</h4>
                    <p className="text-sm text-gray-500">Premium member for 6 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Got questions about Recipe Picks Premium? We've got answers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    How does the premium membership work?
                  </h3>
                  <p className="text-gray-600">
                    Premium membership gives you instant access to our complete library of premium recipes, HD video tutorials, meal planning tools, and other exclusive features. Once you subscribe, you can access all premium content on any device.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Can I cancel my subscription anytime?
                  </h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. Your premium access will continue until the end of your current billing period. We don't offer refunds for partial subscription periods.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    How often is new premium content added?
                  </h3>
                  <p className="text-gray-600">
                    We add new premium recipes and video tutorials weekly. Our chefs are constantly developing new content to keep your cooking experience fresh and exciting.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    What makes premium recipes different from free recipes?
                  </h3>
                  <p className="text-gray-600">
                    Premium recipes are more detailed and feature advanced techniques, specialty ingredients, and comprehensive video tutorials. They're developed by professional chefs and thoroughly tested to ensure perfect results every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join Recipe Picks Premium today and unlock a world of culinary possibilities.
            </p>
            <button className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-colors">
              Get Started Now
            </button>
            <p className="mt-4 text-white/80">
              No risk — cancel anytime during your subscription
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
} 