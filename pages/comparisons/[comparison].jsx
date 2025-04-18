import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Users, Eye, Check, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Comparison({ params }) {
  const title = params?.comparison?.replaceAll("-", " ");
  const formattedTitle = title
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // CSS for shine animation
  const shineAnimation = `
    @keyframes shine {
      0% {
        transform: translateX(-150%) skewX(45deg);
      }
      50% {
        transform: translateX(450%) skewX(45deg);
      }
      100% {
        transform: translateX(450%) skewX(45deg);
      }
    }
    .animate-shine {
      animation: shine 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
    .animate-pulse-slow {
      animation: pulse 3s ease-in-out infinite;
    }
  `;

  // Sample data for high-protein snacks
  const comparisonData = {
    title: "Top 10 High-Protein Recipes for Muscle Gain 2025",
    description:
      "Looking to build muscle and maintain a healthy diet? These protein-rich recipes will help you reach your fitness goals while satisfying your cravings.",
    lastUpdated: "Oct 2024",
    recipes: [
      {
        id: 1,
        name: "Protein-Rich Post-Workout Energy Balls",
        logo: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
        description:
          "These no-bake energy balls pack 30g of protein per serving, perfect for post-workout recovery and muscle repair.",
        features: [
          "30g protein per serving",
          "No-bake recipe",
          "Natural ingredients",
          "Perfect for meal prep",
        ],
        macros: {
          protein: "30g",
          carbs: "22g",
          fats: "14g",
          calories: "320",
        },
        actionButton: "View Recipe",
        actionUrl: "/recipes/51",
      },
      {
        id: 2,
        name: "Muscle Building Protein Smoothie Bowl",
        logo: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
        description:
          "A thick, creamy smoothie bowl loaded with 25g of protein and topped with nutrient-rich ingredients for maximum muscle gains.",
        features: [
          "25g protein per bowl",
          "Customizable toppings",
          "Rich in antioxidants",
          "Ready in 5 minutes",
        ],
        macros: {
          protein: "25g",
          carbs: "35g",
          fats: "12g",
          calories: "350",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 3,
        name: "High-Protein Chicken Wraps",
        logo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
        description:
          "Portable and protein-packed wraps featuring lean chicken breast, Greek yogurt spread, and crunchy vegetables.",
        features: [
          "28g protein per wrap",
          "Lean protein source",
          "High in fiber",
          "Great for meal prep",
        ],
        macros: {
          protein: "28g",
          carbs: "25g",
          fats: "10g",
          calories: "300",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 4,
        name: "Greek Yogurt Protein Parfait",
        logo: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
        description:
          "Layers of protein-rich Greek yogurt, granola, and fresh berries create a perfect muscle-building snack.",
        features: [
          "20g protein per serving",
          "Probiotics for gut health",
          "Low in sugar",
          "Rich in calcium",
        ],
        macros: {
          protein: "20g",
          carbs: "30g",
          fats: "8g",
          calories: "275",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 5,
        name: "Protein-Packed Trail Mix",
        logo: "https://images.unsplash.com/photo-1551893665-f843f600794e",
        description:
          "A custom blend of nuts, seeds, and dried fruits with added protein-rich ingredients for sustained energy.",
        features: [
          "15g protein per serving",
          "Healthy fats",
          "No added sugar",
          "Perfect for on-the-go",
        ],
        macros: {
          protein: "15g",
          carbs: "20g",
          fats: "16g",
          calories: "280",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 6,
        name: "Protein Cookie Dough Bites",
        logo: "https://images.unsplash.com/photo-1584847801423-852691e41044",
        description:
          "Satisfy your sweet tooth while building muscle with these protein-rich cookie dough bites.",
        features: [
          "18g protein per serving",
          "Gluten-free",
          "No baking required",
          "Kid-friendly",
        ],
        macros: {
          protein: "18g",
          carbs: "25g",
          fats: "12g",
          calories: "290",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 7,
        name: "Tuna Protein Box",
        logo: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
        description:
          "A protein-rich snack box featuring tuna, hard-boiled eggs, and fresh vegetables.",
        features: [
          "32g protein per box",
          "Omega-3 fatty acids",
          "Low carb option",
          "Complete protein source",
        ],
        macros: {
          protein: "32g",
          carbs: "15g",
          fats: "14g",
          calories: "310",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 8,
        name: "Protein Chia Pudding",
        logo: "https://images.unsplash.com/photo-1545489379-a8579f380168",
        description:
          "Overnight chia pudding enhanced with protein powder and topped with fresh fruits.",
        features: [
          "22g protein per serving",
          "Rich in omega-3s",
          "High in fiber",
          "Make ahead friendly",
        ],
        macros: {
          protein: "22g",
          carbs: "28g",
          fats: "10g",
          calories: "290",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 9,
        name: "Cottage Cheese Power Bowl",
        logo: "https://images.unsplash.com/photo-1583608564770-9775ffa1d0f3",
        description:
          "A protein-rich bowl featuring cottage cheese, fruits, and nuts for optimal muscle recovery.",
        features: [
          "24g protein per serving",
          "Slow-digesting protein",
          "Good before bed",
          "Calcium-rich",
        ],
        macros: {
          protein: "24g",
          carbs: "20g",
          fats: "8g",
          calories: "250",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
      {
        id: 10,
        name: "Protein Rice Cakes",
        logo: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d",
        description:
          "Rice cakes topped with protein-rich spreads and toppings for a quick muscle-building snack.",
        features: [
          "15g protein per serving",
          "Low calorie option",
          "Customizable toppings",
          "Quick and easy",
        ],
        macros: {
          protein: "15g",
          carbs: "22g",
          fats: "6g",
          calories: "200",
        },
        actionButton: "View Recipe",
        actionUrl: "#",
      },
    ],
    relatedArticles: [
      {
        id: 1,
        title: "How Much Protein Do You Really Need for Muscle Gain?",
        image: "https://images.unsplash.com/photo-1584863265045-f9d10ca7fa61",
        url: "#",
      },
      {
        id: 2,
        title: "Best Times to Eat Protein for Maximum Muscle Growth",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
        url: "#",
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Energy Balls",
        logo: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=50&h=50",
        reviewUrl: "/recipes/51",
      },
      {
        id: 2,
        name: "Protein Bowl",
        logo: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=50&h=50",
        reviewUrl: "#",
      },
      {
        id: 3,
        name: "Chicken Wrap",
        logo: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=50&h=50",
        reviewUrl: "#",
      },
    ],
    rankings: [
      {
        position: 1,
        title: "Best Overall",
        name: "Protein-Rich Post-Workout Energy Balls",
      },
      {
        position: 2,
        title: "Best Quick Option",
        name: "Muscle Building Protein Smoothie Bowl",
      },
      {
        position: 3,
        title: "Best for Meal Prep",
        name: "High-Protein Chicken Wraps",
      },
      {
        position: 4,
        title: "Best for Breakfast",
        name: "Greek Yogurt Protein Parfait",
      },
      {
        position: 5,
        title: "Best for On-the-Go",
        name: "Protein-Packed Trail Mix",
      },
      {
        position: 6,
        title: "Best Sweet Option",
        name: "Protein Cookie Dough Bites",
      },
      { position: 7, title: "Best Low-Carb Option", name: "Tuna Protein Box" },
      { position: 8, title: "Best Make-Ahead", name: "Protein Chia Pudding" },
      {
        position: 9,
        title: "Best Before Bed",
        name: "Cottage Cheese Power Bowl",
      },
      { position: 10, title: "Best Low-Calorie", name: "Protein Rice Cakes" },
    ],
    relatedComparisons: [
      {
        id: 1,
        title: "Top 10 Best Pre-Workout Supplements 2025",
        description:
          "Find the perfect pre-workout supplement to maximize your training sessions and achieve better results.",
        image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba",
        url: "#",
      },
      {
        id: 2,
        title: "Top 10 Post-Workout Recovery Drinks",
        description:
          "Discover the best recovery drinks to help your muscles repair and grow after intense workouts.",
        image: "https://images.unsplash.com/photo-1550345332-09e3ac987658",
        url: "#",
      },
      {
        id: 3,
        title: "Top 10 Muscle Building Meal Plans",
        description:
          "Complete meal plans designed to help you build lean muscle mass effectively.",
        image: "https://images.unsplash.com/photo-1547496502-affa22d38842",
        url: "#",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{comparisonData.title} | RecipePicks</title>
        <meta name="description" content={comparisonData.description} />
        <style dangerouslySetInnerHTML={{ __html: shineAnimation }} />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section - Full Width */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white overflow-hidden mb-5 w-full container mx-auto rounded-xl">
          <div className="container mx-auto pt-8 pb-14 px-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3 relative z-10">
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>

                {/* Badge */}
                <div className="inline-flex items-center bg-primary/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
                  <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-primary-50">
                    RecipePicks Selection
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {comparisonData.title}
                  </span>
                </h1>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {comparisonData.description}
                </p>

                <div className="flex flex-wrap gap-5 mb-8">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Updated: {comparisonData.lastUpdated}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span>10+ Expert Reviews</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Eye className="w-4 h-4 mr-2" />
                    <span>5k+ Monthly Readers</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/4 relative">
                {/* Main image with decorative elements */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f"
                    alt="Protein-rich food assortment"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 bg-yellow-500 rounded-lg px-2 py-1.5 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300 hidden md:block">
                  <span className="font-bold text-xs">30g+ Protein</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 rounded-lg p-2 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300 hidden md:block">
                  <span className="font-bold text-xs text-white">
                    Muscle Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Container for the rest of the content */}
        <div className="container mx-auto px-12">
          {/* Main Content */}
          <div className="-mt-16 grid grid-cols-12 gap-8">
            {/* Recipes List */}
            <div className="col-span-12 md:col-span-8">
              {comparisonData.recipes.map((service, index) => (
                <div
                  key={service.id}
                  className={`bg-white rounded shadow-md hover:shadow-lg transition-all duration-300 mb-4 overflow-hidden group relative flex flex-col md:flex-row
                    ${
                      index === 0
                        ? "ring-2 ring-amber-500/50"
                        : index === 1
                        ? "ring-2 ring-slate-400/50"
                        : index === 2
                        ? "ring-2 ring-amber-700/50"
                        : ""
                    }
                    ${index < 3 ? "hover:translate-y-[-4px]" : ""}
                  `}
                >
                  {/* Left side - Image */}
                  <div className="relative w-full md:w-1/3 flex-shrink-0">
                    <div className="relative h-48 md:h-full w-full">
                      <Image
                        src={service.logo}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    </div>

                    {/* Rank Badge */}
                    <div className="absolute top-4 left-4 flex flex-col items-center z-10">
                      {/* Rank Badge */}
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg 
                          ${
                            index < 3
                              ? "bg-gradient-to-br " +
                                (index === 0
                                  ? "from-amber-400 to-amber-600 ring-2 ring-amber-300 animate-pulse-slow"
                                  : index === 1
                                  ? "from-slate-300 to-slate-500 ring-2 ring-slate-200"
                                  : "from-amber-600 to-amber-800 ring-2 ring-amber-500")
                              : "bg-white ring-2 ring-primary/20"
                          }`}
                      >
                        <span
                          className={`text-lg font-extrabold ${
                            index < 3 ? "text-white" : "text-primary"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>

                      {/* Special Tag for Top 3 */}
                      {index < 3 && (
                        <div
                          className={`mt-2 py-1.5 px-4 text-xs font-bold text-white rounded-md 
                            transform -translate-y-1 
                            drop-shadow-md
                            backdrop-blur-sm whitespace-nowrap relative overflow-hidden
                            ${
                              index === 0
                                ? "bg-gradient-to-r from-amber-500 to-amber-400 shadow-amber-500/30"
                                : index === 1
                                ? "bg-gradient-to-r from-slate-500 to-slate-400 shadow-slate-400/30"
                                : "bg-gradient-to-r from-amber-700 to-amber-600 shadow-amber-700/30"
                            }`}
                        >
                          {/* Shine effect */}
                          <div className="absolute top-0 left-0 w-full h-full bg-white/30 skew-x-[45deg] translate-x-[-150%] animate-shine"></div>

                          <div className="flex items-center space-x-1">
                            {index === 0 && (
                              <Star className="w-3 h-3 fill-white stroke-amber-200" />
                            )}
                            <span>
                              {comparisonData.rankings[
                                index
                              ].title.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 p-4">
                    {/* Recipe Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>

                    {/* Description - shortened */}
                    {/* <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {service.description}
                    </p> */}

                    {/* Macros - more compact */}
                    {/* <div className="grid grid-cols-4 gap-2 bg-gray-50 p-2 rounded-lg mb-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Protein</span>
                        <span className="font-bold text-primary text-sm">
                          {service.macros.protein}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Carbs</span>
                        <span className="font-bold text-gray-700 text-sm">
                          {service.macros.carbs}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Fats</span>
                        <span className="font-bold text-gray-700 text-sm">
                          {service.macros.fats}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Cal</span>
                        <span className="font-bold text-gray-700 text-sm">
                          {service.macros.calories}
                        </span>
                      </div>
                    </div> */}

                    {/* Features - more compact */}
                    {service.features.length > 0 && (
                      <div className="mb-3">
                        {/* <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          Key Benefits
                        </h4> */}
                        <div className="grid grid-cols-2 gap-1">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <Check className="w-3 h-3 mr-1 text-primary mt-1 flex-shrink-0" />
                              <span className="text-gray-600 text-xs">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-2">
                      <Link
                        href={service.actionUrl}
                        className="btn-primary whitespace-nowrap flex items-center gap-2 w-fit !py-1.5 !px-3 text-sm"
                      >
                        {service.actionButton}{" "}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* How to Choose Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  How to Choose the Best High-Protein Snacks
                </h2>

                <p className="text-gray-700 mb-4">
                  When selecting high-protein snacks for muscle gain, several
                  factors should be considered to ensure you're making the most
                  of your nutrition:
                </p>

                <div className="relative h-60 my-6 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
                    alt="Various protein-rich foods"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-gray-700 mb-4">
                  The key to choosing effective high-protein snacks lies in
                  understanding both their nutritional content and practical
                  aspects. A good high-protein snack should not only deliver
                  adequate protein but also fit into your lifestyle and dietary
                  preferences.
                </p>

                <p className="text-gray-700 mb-4">
                  Our rankings take into account factors such as protein
                  content, overall nutritional balance, convenience, taste, and
                  cost-effectiveness. We've also considered the quality of
                  protein sources and how well each snack supports muscle
                  recovery and growth.
                </p>
              </div>

              {/* How We Tested Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">How We Tested</h2>

                <p className="text-gray-700 mb-4">
                  Our team of nutrition experts and fitness enthusiasts tested
                  each snack based on multiple criteria, including protein
                  content, taste, convenience, and overall nutritional value.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
                      alt="Testing protein content"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                      alt="Preparing protein snacks"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-6 mb-3">Protein Content</h3>
                <p className="text-gray-700 mb-4">
                  We analyzed the protein content of each snack, ensuring they
                  provide at least 15g of protein per serving. The quality of
                  protein sources was also evaluated, with preference given to
                  complete proteins that contain all essential amino acids.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">
                  Nutritional Balance
                </h3>
                <p className="text-gray-700 mb-4">
                  While protein content was our primary focus, we also
                  considered the overall nutritional profile. The best snacks
                  offer a good balance of macronutrients and contain beneficial
                  micronutrients without excessive sugar or unhealthy fats.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Convenience</h3>
                <p className="text-gray-700 mb-4">
                  We evaluated how easy each snack is to prepare and consume,
                  particularly for busy individuals. Factors like portability,
                  storage requirements, and prep time were all considered in our
                  rankings.
                </p>
              </div>

              {/* Expert Tips Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Expert Tips from RecipePicks
                </h2>
                <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
                    alt="Protein snacks expert"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-gray-700 mb-4">
                  Our nutrition experts at RecipePicks have compiled essential
                  tips for maximizing the benefits of high-protein snacks:
                </p>

                <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                  <li>
                    <strong>Timing is key:</strong> Consume protein snacks
                    within 30 minutes after your workout for optimal muscle
                    recovery and growth.
                  </li>
                  <li>
                    <strong>Portion control matters:</strong> Even healthy,
                    high-protein snacks should be consumed in appropriate
                    portions to maintain your caloric goals.
                  </li>
                  <li>
                    <strong>Combine with complex carbs:</strong> For sustained
                    energy and better protein utilization, pair your protein
                    snacks with complex carbohydrates.
                  </li>
                  <li>
                    <strong>Meal prep for success:</strong> Prepare protein
                    snacks in advance to ensure you always have healthy options
                    available when hunger strikes.
                  </li>
                  <li>
                    <strong>Listen to your body:</strong> Pay attention to how
                    different protein sources affect your digestion and energy
                    levels.
                  </li>
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4">
              {/* Must Reads Section */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Must Reads</h2>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      title: "Top 10 Italian Pasta Recipes for Weight Loss",
                      image:
                        "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
                      url: "#",
                    },
                    {
                      id: 2,
                      title: "Top 10 Quick & Healthy Breakfast Recipes of 2025",
                      image:
                        "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a",
                      url: "#",
                    },
                    {
                      id: 3,
                      title: "Top 10 Plant-Based Protein Recipes for Athletes",
                      image:
                        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
                      url: "#",
                    },
                  ].map((article) => (
                    <Link
                      key={article.id}
                      href={article.url}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-gray-900 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <span className="text-sm text-primary">Read more</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Our Reviews Section */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Our Reviews</h2>
                <div className="space-y-4">
                  {comparisonData.reviews.map((review) => (
                    <Link
                      key={review.id}
                      href={review.reviewUrl}
                      className="flex items-center p-3 gap-4 group hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-12 h-12 relative flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                        <Image
                          src={review.logo}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-medium group-hover:text-primary transition-colors">
                          {review.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            5.0
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/reviews"
                  className="mt-5 text-primary font-medium flex items-center justify-center w-full py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <span>View all reviews</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Quick Facts Section */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Quick Facts</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">
                      The average adult needs 0.8-1.0g of protein per pound of
                      body weight for muscle gain
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">
                      Post-workout protein intake within 30 minutes can increase
                      muscle protein synthesis by up to 50%
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">
                      High-protein snacks can help reduce overall calorie intake
                      by increasing satiety
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 p-1 rounded text-primary mr-3 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700">
                      The global protein snack market is expected to reach $20
                      billion by 2025
                    </span>
                  </li>
                </ul>
              </div>

              {/* New to Protein Snacks Section */}
              <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">
                  New to Protein Snacks?
                </h2>
                <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61"
                    alt="Getting started with protein snacks"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  If you're just starting your muscle gain journey, here are
                  some tips for incorporating protein snacks:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span>Start with easily digestible protein sources</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span>Space your protein intake throughout the day</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span>Track your daily protein intake</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    <span>Combine protein with other nutrients</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}
