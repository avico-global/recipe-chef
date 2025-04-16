import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Top10List() {
  const [openSections, setOpenSections] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);

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
      title: "Breakfast",
      items: [
        {
          title: "Top 10 Best Breakfast Recipes for Busy Mornings 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "How to Make Perfect Avocado Toast...",
              image:
                "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Quick & Healthy Breakfast Smoothie Bowls...",
              image:
                "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Overnight Oats Recipe Guide",
              image:
                "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Italian",
      items: [
        {
          title: "Top 10 Best Italian Pasta Recipes of 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Classic Spaghetti Carbonara Recipe",
              image:
                "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Homemade Lasagna: Step by Step Guide",
              image:
                "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Perfect Risotto Techniques",
              image:
                "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          title: "Top 10 Mouthwatering Dessert Recipes of 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Chocolate Lava Cake: Restaurant Quality at Home",
              image:
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Easy Tiramisu Recipe Without Alcohol",
              image:
                "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Homemade Ice Cream: No Machine Required",
              image:
                "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Mexican",
      items: [
        {
          title: "Top 10 Authentic Mexican Recipes for 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Homemade Beef Tacos with Fresh Salsa",
              image:
                "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Restaurant-Style Guacamole Recipe",
              image:
                "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Chicken Enchiladas with Homemade Sauce",
              image:
                "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Vegetarian",
      items: [
        {
          title: "Top 10 Satisfying Vegetarian Dinner Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Protein-Packed Vegetarian Buddha Bowl",
              image:
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Eggplant Parmesan: Better Than Restaurant",
              image:
                "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Hearty Lentil Soup Recipe",
              image:
                "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Baking",
      items: [
        {
          title: "Top 10 Foolproof Baking Recipes for Beginners 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Perfect Chocolate Chip Cookies Every Time",
              image:
                "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Easy Banana Bread Recipe",
              image:
                "https://images.unsplash.com/photo-1585478259715-b89f9b896ce6?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Sourdough Bread for Beginners",
              image:
                "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Asian",
      items: [
        {
          title: "Top 10 Asian Recipes You Can Make at Home 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=500&fit=crop",
          subItems: [
            {
              title: "Better-Than-Takeout Chicken Fried Rice",
              image:
                "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Easy Pad Thai with Authentic Flavors",
              image:
                "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Homemade Ramen Bowls from Scratch",
              image:
                "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Healthy Snacks",
      items: [
        {
          title: "Top 10 Healthy Snack Ideas for Weight Loss 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=500&fit=crop",
          subItems: [
            {
              title: "Protein-Packed Energy Balls Recipe",
              image:
                "https://images.unsplash.com/photo-1604497181015-76590d828449?w=500&h=500&fit=crop",
              date: "Dec 2024",
            },
            {
              title: "Greek Yogurt Parfait: 5 Delicious Ways",
              image:
                "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Kale Chips: Crispy & Healthy Alternative",
              image:
                "https://images.unsplash.com/photo-1573123073646-c914ac456ab4?w=500&h=500&fit=crop",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Dinner",
      items: [
        {
          title: "Top 10 Family-Friendly Dinner Recipes 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "One-Pan Chicken and Vegetable Bake",
              image:
                "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "30-Minute Meal: Shrimp Scampi Pasta",
              image:
                "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Perfect Sunday Roast Chicken",
              image:
                "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025",
            },
          ],
        },
      ],
    },
    {
      title: "Grilling",
      items: [
        {
          title: "Top 10 Mouthwatering Grilling Recipes for Summer 2025",
          date: "Oct 2024",
          image:
            "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Juicy Grilled Burger Secrets",
              image:
                "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Perfect Grilled Steak: Temperature Guide",
              image:
                "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024",
            },
            {
              title: "Grilled Vegetable Skewers with Marinade",
              image:
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&h=500",
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
        <h2 className="text-4xl font-bold text-gray-900">
          Top 10 <span className="text-primary">Trending Recipes</span>
        </h2>
        <button
          className="text-primary font-medium hover:bg-primary/10 px-6 py-2.5 rounded-full transition-all text-sm flex items-center gap-2 border border-primary/20"
          onClick={handleCollapseAll}
        >
          Collapse all
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6 w-full">
        {list.map((item, index) => (
          <div
            key={index}
            className="group rounded-2xl bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <button
              className="w-full p-6 flex items-center justify-between bg-white rounded-2xl transition-colors group-hover:bg-gray-50/50"
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
                            {mainItem.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Comprehensive guide with all the information you
                            need for making the best choice.
                          </p>

                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
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
                              <span>35 min read</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              <span>Medium</span>
                            </div>
                            <div className="flex items-center gap-1">
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
                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                              </svg>
                              <span>10 providers</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">
                              Last updated: {mainItem.date}
                            </p>
                            <Link
                              href="/hosting"
                              className="group/button bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                            >
                              View Recipe
                              <span className="transform transition-transform duration-300 group-hover/button:translate-x-1">
                                →
                              </span>
                            </Link>
                          </div>
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
                            <div className="flex-1 space-y-2">
                              <p className="font-medium text-gray-900 group-hover/card:text-primary transition-colors line-clamp-2">
                                {subItem.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {subItem.date}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                                  15 min
                                </span>
                                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                                  Easy
                                </span>
                              </div>
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
