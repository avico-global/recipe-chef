import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const shortsData = [
  {
    id: 1,
    title: "Chicken Chips 😋 🔥 🙌",
    views: "164K",
    thumbnail:
      "https://media.istockphoto.com/id/1356052749/photo/barbecue-chicken-drumsticks-with-chips-and-greens-on-wooden-table.jpg?s=612x612&w=0&k=20&c=8jJcQIHEdL6nbbsBQzW8D0fB92QkstBZcydUbZf0tUw=",
    link: "/recipes/chicken-chips",
  },
  {
    id: 2,
    title: "Crispy Chicken Chips",
    views: "8.7M",
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1683139916670-38113db90cb9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3Jpc3B5JTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "/recipes/crispy-chicken-chips",
  },
  {
    id: 3,
    title: "3-ingredient chicken chips! High-protein",
    views: "1.3K",
    thumbnail:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    link: "/recipes/3-ingredient-chicken-chips",
  },
  {
    id: 4,
    title: "Have you tried Flamin' Hot Cheetos? Air fryer",
    views: "1.4M",
    thumbnail:
      "https://images.unsplash.com/photo-1621754420535-683ae10e298a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hlZXRvc3xlbnwwfHwwfHx8MA%3D%3D",
    link: "/recipes/flamin-hot-cheetos",
  },
  {
    id: 5,
    title: "Cheesy loaded fries with hot fried chicken",
    views: "313K",
    thumbnail: "https://images.unsplash.com/photo-1585109649139-366815a0d713",
    link: "/recipes/cheesy-loaded-fries",
  },
  {
    id: 6,
    title: "15-minute pasta hack that went viral 🍝",
    views: "2.8M",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    link: "/recipes/viral-pasta-hack",
  },
  {
    id: 7,
    title: "5-ingredient banana bread 🍌 No mixer needed!",
    views: "954K",
    thumbnail:
      "https://images.unsplash.com/photo-1632931057819-4eefffa8e007?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D",
    link: "/recipes/easy-banana-bread",
  },
  {
    id: 8,
    title: "Homemade bubble tea that tastes like the real thing",
    views: "3.2M",
    thumbnail:
      "https://images.unsplash.com/photo-1558857563-b371033873b8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnViYmxlJTIwdGVhfGVufDB8fDB8fHww",
    link: "/recipes/homemade-bubble-tea",
  },
  {
    id: 9,
    title: "Air fryer avocado fries 🥑 Crispy outside, creamy inside",
    views: "752K",
    thumbnail: "https://images.unsplash.com/photo-1548247661-3d7905940716",
    link: "/recipes/avocado-fries",
  },
  {
    id: 10,
    title: "30-second frozen yogurt bark - healthy dessert!",
    views: "1.1M",
    thumbnail: "https://images.unsplash.com/photo-1488900128323-21503983a07e",
    link: "/recipes/frozen-yogurt-bark",
  },
];

export default function Shorts() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRight = () => {
    if (activeIndex < shortsData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Calculate visible items based on screen size
  const visibleItems = 4;
  const maxIndex = shortsData.length - visibleItems;

  return (
    <section className="py-8 overflow-hidden w-full">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M10 16l6-4-6-4z" />
            </svg>
            <h2 className="text-2xl font-bold ml-2">Shorts</h2>
          </div>
          <Link
            href="/shorts"
            className="text-red-600 font-medium hover:underline text-sm flex items-center"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="relative">
          <div
            className="flex gap-4 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (250 + 16)}px)` }}
          >
            {shortsData.map((short) => (
              <div
                key={short.id}
                className="flex-shrink-0 w-[250px] rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <Link href={short.link}>
                  <div className="relative aspect-[9/16] group">
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/30 group-hover:from-black/20 group-hover:to-black/70 transition-all"></div>
                    <div className="absolute bottom-4 left-3 right-3 z-10">
                      <h3 className="text-white font-medium line-clamp-2 text-sm">
                        {short.title}
                      </h3>
                      <p className="text-white text-opacity-80 text-xs mt-1">
                        {short.views} views
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {activeIndex > 0 && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 shadow-md z-10 hover:bg-opacity-100 transition-all"
              aria-label="Previous shorts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}

          {activeIndex < maxIndex && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 shadow-md z-10 hover:bg-opacity-100 transition-all"
              aria-label="Next shorts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.min(maxIndex + 1, 5) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex ? "w-6 bg-red-600" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
