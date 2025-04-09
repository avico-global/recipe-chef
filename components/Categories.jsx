import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      name: "Breakfast",
      image:
        "https://media.istockphoto.com/id/2150599355/photo/food-photos-various-entrees-appetizers-deserts-etc.webp?a=1&b=1&s=612x612&w=0&k=20&c=c3xxcc_i5L58Yac9rvZpQU-2N467RT-JvRX1ls4elCY=",
      url: "/category/breakfast",
    },
    {
      name: "Quick Meals",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&h=500&fit=crop",
      url: "/category/quick-meals",
    },
    {
      name: "Vegetarian",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
      url: "/category/vegetarian",
    },
    {
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=500&fit=crop",
      url: "/category/desserts",
    },
    {
      name: "Healthy",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop",
      url: "/category/healthy",
    },
    {
      name: "International",
      image:
        "https://images.unsplash.com/photo-1515669097368-22e68427d265?w=500&h=500&fit=crop",
      url: "/category/international",
    },
    {
      name: "Seasonal",
      image:
        "https://images.unsplash.com/photo-1601579112934-17ac2aa86292?w=500&h=500&fit=crop",
      url: "/category/seasonal",
    },
  ];

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Explore Popular <span className="text-primary">Categories</span>
        </h2>
        <Link
          href="/recipes"
          className="text-primary font-medium hover:underline text-sm flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 w-full items-center justify-between">
        {categories.map((category) => (
          <Link
            href={category.url}
            key={category.name}
            className="flex flex-col items-center min-w-[120px]"
          >
            <div className="rounded-full bg-gray-100 w-[130px] h-[130px] mb-3 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            </div>
            <span className="text-center font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
