import React from "react";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const mealTypes = [
    {
      name: "Breakfast",
      image:
        "https://media.istockphoto.com/id/2150599355/photo/food-photos-various-entrees-appetizers-deserts-etc.webp?a=1&b=1&s=612x612&w=0&k=20&c=c3xxcc_i5L58Yac9rvZpQU-2N467RT-JvRX1ls4elCY=",
      url: "/recipes?mealType=breakfast",
    },
    {
      name: "Quick Meals",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=500&fit=crop",
      url: "/recipes?mealType=quick",
    },
    {
      name: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
      url: "/recipes?dietary=vegetarian",
    },
    {
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=500&fit=crop",
      url: "/recipes?mealType=dessert",
    },
    {
      name: "Healthy",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop",
      url: "/recipes?dietary=healthy",
    },
    {
      name: "Seasonal",
      image:
        "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=500&h=500&fit=crop",
      url: "/recipes?mealType=seasonal",
    },
  ];

  const cuisines = [
    {
      name: "Italian",
      image:
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=italian",
    },
    {
      name: "Mexican",
      image:
        "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=mexican",
    },
    {
      name: "Indian",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=indian",
    },
    {
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=chinese",
    },
    {
      name: "Thai",
      image:
        "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=thai",
    },
    {
      name: "Japanese",
      image:
        "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=japanese",
    },
    {
      name: "French",
      image:
        "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&h=500&fit=crop",
      url: "/recipes?cuisineType=french",
    },
  ];

  // Helper function to create consistent URLs
  const createFilterUrl = (type, value) => {
    return `/recipes?${type}=${value.toLowerCase()}`;
  };

  return (
    <div className="w-full py-8">
      {/* Meal Type Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 w-full">
          Explore by <span className="text-primary">Meal Type</span>
        </h2>

        <div className="flex flex-wrap gap-4 pb-4 -mx-4 px-4 w-full items-center justify-between">
          {mealTypes.map((category) => (
            <Link
              href={category.url}
              key={category.name}
              className="flex flex-col items-center min-w-[120px] group"
            >
              <div className="rounded-full bg-gray-100 w-[140px] h-[140px] mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                <div className="relative w-full h-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                </div>
              </div>
              <span className="text-center font-medium group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cuisine Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 w-full">
          Explore by <span className="text-primary">Cuisine</span>
        </h2>

        <div className="flex flex-wrap gap-4 pb-4 -mx-4 px-4 w-full items-center justify-between">
          {cuisines.map((cuisine) => (
            <Link
              href={cuisine.url}
              key={cuisine.name}
              className="flex flex-col items-center min-w-[120px] group"
            >
              <div className="rounded-full bg-gray-100 w-[140px] h-[140px] mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                <div className="relative w-full h-full">
                  <Image
                    src={cuisine.image}
                    alt={cuisine.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                </div>
              </div>
              <span className="text-center font-medium group-hover:text-primary transition-colors">
                {cuisine.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
