import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

export default function Top10List() {
  const [openSections, setOpenSections] = useState([]);

  const handleSectionToggle = (index) => {
    setOpenSections(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
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
      title: "Top 10 Breakfast Recipes",
      items: [
        {
          title: "Top 10 Best Breakfast Recipes for Busy Mornings 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "How to Make Perfect Avocado Toast...",
              image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Quick & Healthy Breakfast Smoothie Bowls...",
              image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Overnight Oats Recipe Guide",
              image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Italian Dishes",
      items: [
        {
          title: "Top 10 Best Italian Pasta Recipes of 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Classic Spaghetti Carbonara Recipe",
              image: "https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Homemade Lasagna: Step by Step Guide",
              image: "https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Perfect Risotto Techniques",
              image: "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Dessert Recipes",
      items: [
        {
          title: "Top 10 Mouthwatering Dessert Recipes of 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Chocolate Lava Cake: Restaurant Quality at Home",
              image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&h=500&fit=crop",
              date: "Dec 2024"
            },
            {
              title: "Easy Tiramisu Recipe Without Alcohol",
              image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Homemade Ice Cream: No Machine Required",
              image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Mexican Dishes",
      items: [
        {
          title: "Top 10 Authentic Mexican Recipes for 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Homemade Beef Tacos with Fresh Salsa",
              image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Restaurant-Style Guacamole Recipe",
              image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Chicken Enchiladas with Homemade Sauce",
              image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Vegetarian Meals",
      items: [
        {
          title: "Top 10 Satisfying Vegetarian Dinner Recipes 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Protein-Packed Vegetarian Buddha Bowl",
              image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Eggplant Parmesan: Better Than Restaurant",
              image: "https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Hearty Lentil Soup Recipe",
              image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Baking Recipes",
      items: [
        {
          title: "Top 10 Foolproof Baking Recipes for Beginners 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Perfect Chocolate Chip Cookies Every Time",
              image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Easy Banana Bread Recipe",
              image: "https://images.unsplash.com/photo-1585478259715-b89f9b896ce6?w=500&h=500&fit=crop",
              date: "Dec 2024"
            },
            {
              title: "Sourdough Bread for Beginners",
              image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Asian Dishes",
      items: [
        {
          title: "Top 10 Asian Recipes You Can Make at Home 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&h=500&fit=crop",
          subItems: [
            {
              title: "Better-Than-Takeout Chicken Fried Rice",
              image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Easy Pad Thai with Authentic Flavors",
              image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=500&fit=crop",
              date: "Dec 2024"
            },
            {
              title: "Homemade Ramen Bowls from Scratch",
              image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Healthy Snacks",
      items: [
        {
          title: "Top 10 Healthy Snack Ideas for Weight Loss 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=500&fit=crop",
          subItems: [
            {
              title: "Protein-Packed Energy Balls Recipe",
              image: "https://images.unsplash.com/photo-1604497181015-76590d828449?w=500&h=500&fit=crop",
              date: "Dec 2024"
            },
            {
              title: "Greek Yogurt Parfait: 5 Delicious Ways",
              image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Kale Chips: Crispy & Healthy Alternative",
              image: "https://images.unsplash.com/photo-1573123073646-c914ac456ab4?w=500&h=500&fit=crop",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Dinner Recipes",
      items: [
        {
          title: "Top 10 Family-Friendly Dinner Recipes 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "One-Pan Chicken and Vegetable Bake",
              image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "30-Minute Meal: Shrimp Scampi Pasta",
              image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Perfect Sunday Roast Chicken",
              image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    },
    {
      title: "Top 10 Grilling Recipes",
      items: [
        {
          title: "Top 10 Mouthwatering Grilling Recipes for Summer 2025",
          date: "Oct 2024",
          image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=500&h=500",
          subItems: [
            {
              title: "Juicy Grilled Burger Secrets",
              image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Perfect Grilled Steak: Temperature Guide",
              image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=500&h=500",
              date: "Dec 2024"
            },
            {
              title: "Grilled Vegetable Skewers with Marinade",
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&h=500",
              date: "Jan 2025"
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-bold text-gray-900">
         Top 10 <span className="text-primary">Trending</span>
        </h2>
        <button 
          className="text-blue-500 hover:underline text-primary font-medium hover:underline text-sm flex items-center gap-1"
          onClick={handleCollapseAll}
        >
          Collapse all
        </button>
      </div>

      <div className="space-y-2 w-full">
        {list.map((item, index) => (
          <div key={index} className=" rounded-md overflow-hidden w-full">
            <button
              className="w-full p-4 flex items-center justify-between bg-gray-200"
              onClick={() => handleSectionToggle(index)}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full">
                  {index + 1}
                </span>
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronDown 
                className={`
                  transform transition-transform duration-300 ease-in-out
                  ${openSections.includes(index) ? 'rotate-180' : ''}
                `} 
              />
            </button>

            <div 
              className={`
                transition-all duration-300 ease-in-out
                ${openSections.includes(index) 
                  ? 'max-h-[2000px] opacity-100' 
                  : 'max-h-0 opacity-0'
                } 
                overflow-hidden
              `}
            >
              {item.items.length > 0 && (
                <div className="p-4 w-full border-2 border-gray-200 rounded-b-md">
                  {item.items.map((mainItem, idx) => (
                    <div key={idx} className="w-full">
                      <div className="flex gap-4 mb-4 w-full">
                        <div className="w-1/3">
                          <Image
                            src={mainItem.image}
                            alt={mainItem.title}
                            width={400}
                            height={250}
                            className="rounded-lg w-full h-[250px] object-cover"
                          />
                        </div>
                        <div className="w-2/3">
                          <div className="flex gap-2 mb-2">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">{item.title}</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">Top Pick</span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">{mainItem.title}</h3>
                          <p className="text-gray-600 mb-3">Comprehensive guide with all the information you need for making the best choice.</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>35 min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span>Medium</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                              <span>10 providers</span>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm mb-4">Last updated: {mainItem.date}</p>
                          <Link href="/hosting" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 w-fit transition-colors">
                            View Recipe <span className="text-lg">→</span>
                          </Link>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-8 mt-6 w-full">
                        {mainItem.subItems.map((subItem, subIdx) => (
                          <div key={subIdx} className="flex gap-3 w-full">
                            <div className="w-24 h-24 flex-shrink-0">
                              <Image
                                src={subItem.image}
                                alt={subItem.title}
                                width={96}
                                height={96}
                                className="rounded w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{subItem.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{subItem.date}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">15 min</span>
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Easy</span>
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

const Card = () => {
  return <div>Card</div>;
};
