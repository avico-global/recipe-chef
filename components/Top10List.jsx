import { ChevronDown, Clock, Star, Users, Eye } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Top10List() {
  const [openSections, setOpenSections] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [viewCounts] = useState(() => {
    // Use fixed numbers instead of random ones
    return [512, 647, 389, 723, 456, 891, 234, 567, 789, 345];
  });

  const handleSectionToggle = (index) => {
    setOpenSections((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleCollapseAll = () => {
    setOpenSections([]);
  };

  const list = [
    {
      title: "American Cuisine",
      items: [
        {
          comparison_title: "Top 10 Classic American Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 American BBQ & Grilling Recipes",
              image:
                "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 American Comfort Foods",
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 American Breakfast Classics",
              image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Italian Cuisine",
      items: [
        {
          comparison_title: "Top 10 Traditional Italian Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Italian Pasta Dishes",
              image:
                "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Italian Pizza Recipes",
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Italian Desserts",
              image:
                "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Chinese Cuisine",
      items: [
        {
          comparison_title: "Top 10 Traditional Chinese Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Chinese Stir-Fry Dishes",
              image:
                "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Chinese Noodle Recipes",
              image:
                "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Dim Sum Recipes",
              image:
                "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Mexican Cuisine",
      items: [
        {
          comparison_title: "Top 10 Authentic Mexican Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Mexican Street Food Recipes",
              image:
                "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Mexican Salsas and Sauces",
              image:
                "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Mexican Fiesta Dishes",
              image:
                "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Japanese Cuisine",
      items: [
        {
          comparison_title: "Top 10 Japanese Home Cooking Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Sushi Recipes for Beginners",
              image:
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Ramen and Noodle Dishes",
              image:
                "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Japanese Curry Recipes",
              image:
                "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Indian Cuisine",
      items: [
        {
          comparison_title: "Top 10 Indian Curry Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Indian Vegetarian Dishes",
              image:
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Indian Bread Recipes",
              image:
                "https://images.unsplash.com/photo-1585478259715-b89f9b896ce6?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Indian Street Food Recipes",
              image:
                "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Thai Cuisine",
      items: [
        {
          comparison_title: "Top 10 Thai Street Food Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=500&fit=crop",
          subItems: [
            {
              title: "Top 10 Thai Curry Recipes",
              image:
                "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Thai Noodle Dishes",
              image:
                "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Thai Seafood Recipes",
              image:
                "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "French Cuisine",
      items: [
        {
          comparison_title: "Top 10 Classic French Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 French Pastry Recipes",
              image:
                "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 French Sauces",
              image:
                "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 French Bistro Dishes",
              image:
                "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Mediterranean Cuisine",
      items: [
        {
          comparison_title: "Top 10 Mediterranean Diet Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Greek Recipes",
              image:
                "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Spanish Tapas Recipes",
              image:
                "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Middle Eastern Dishes",
              image:
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Korean Cuisine",
      items: [
        {
          comparison_title: "Top 10 Korean BBQ Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1532347231146-80afc9e3df2b?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Top 10 Korean Street Food Recipes",
              image:
                "https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Korean Noodle Dishes",
              image:
                "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Top 10 Korean Vegetable Dishes",
              image:
                "https://images.unsplash.com/photo-1583187855495-d1f6a5733f81?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full mt-12 container mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Taste the <span className="text-primary">World's Best</span>
          <span className="block text-lg mt-1 text-gray-600 font-medium">Our Handpicked Collections of 10 Iconic Recipes from Each Cuisine</span>
        </h2>
        <button
          className="text-primary font-medium hover:bg-primary/10 px-6 py-2.5 rounded-full transition-all text-sm flex items-center gap-2 border border-primary/20"
          onClick={handleCollapseAll}
        >
          Collapse all
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full">
        {list.map((item, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-4"
          >
            <button
              className={`w-full flex items-center justify-between rounded-2xl transition-colors ${
                openSections.includes(index)
                  ? "bg-white p-8"
                  : "bg-gray-50 shadow-sm shadow-gray-200 p-4"
              }`}
              onClick={() => handleSectionToggle(index)}
            >
              <div className="flex items-center gap-5">
                <span className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl font-semibold text-lg shadow-sm group-hover:shadow-primary/20 transition-shadow">
                  {index + 1}
                </span>
                <span className="font-semibold text-xl text-gray-800 group-hover:text-primary transition-colors">
                  {item.title}
                </span>
              </div>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 transform transition-all duration-300 ease-out group-hover:text-primary
                  ${openSections.includes(index) ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out
              ${
                openSections.includes(index)
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
              } 
              overflow-hidden`}
            >
              {item.items.length > 0 && (
                <div className="px-8 pb-8">
                  {item.items.map((mainItem, idx) => (
                    <div key={idx} className="w-full">
                      <div className="flex gap-8 mb-8">
                        <div className="w-1/3">
                          <div className="relative overflow-hidden rounded-2xl shadow-sm group/image">
                            <Image
                              src={mainItem.image}
                              alt={mainItem.title}
                              width={400}
                              height={250}
                              className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover/image:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                        <div className="w-2/3 space-y-4">
                          <div className="flex gap-3">
                            <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                              Top Pick
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {mainItem.comparison_title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Comprehensive guide with all the information you
                            need for making the best choice.
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>35 min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>Medium</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>10 providers</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{viewCounts[index]}K views</span>
                            </div>
                          </div>

                          <p className="text-gray-500 text-sm">
                            Last updated: {mainItem.date}
                          </p>
                          <Link
                            href={`/comparisons/${mainItem.comparison_title
                              ?.replaceAll(" ", "-")
                              ?.toLowerCase()}`}
                            className="group/button w-fit font-medium bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                          >
                            View {item.title} Recipes
                            <span className="transform transition-transform duration-300 group-hover/button:translate-x-1">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-8 mt-10">
                        {mainItem.subItems.map((subItem, subIdx) => (
                          <div
                            key={subIdx}
                            className="group/card flex gap-4 p-3 rounded-xl hover:bg-gray-50/80 cursor-pointer transition-all duration-300 hover:shadow-sm"
                          >
                            <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl">
                              <Image
                                src={subItem.image}
                                alt={subItem.title}
                                width={112}
                                height={112}
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover/card:scale-110"
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="font-medium text-gray-900 group-hover/card:text-primary transition-colors line-clamp-2">
                                {subItem.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {subItem.date}
                              </p>
                              <div className="flex items-center gap-2 py-1">
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                                  15 min
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                                  Easy
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                                  {viewCounts[(index * 3 + subIdx) % 10]}K views
                                </span>
                              </div>
                              <Link
                                href={`/recipes/${subItem?.id}`}
                                className="text-primary font-medium underline transition-colors text-sm"
                              >
                                View Recipes
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
