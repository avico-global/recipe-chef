import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const shortsData = [
  {
    id: 1,
    title: "Rainbow Cupcake Decorating",
    views: "7.1K",
    thumbnail: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7",
    videoId: "LbMxowwNRSw",
    link: "/shorts/1",
  },
  {
    id: 2,
    title: "Crispy Chicken Chips",
    views: "8.7M",
    thumbnail: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
    videoId: "U58w5FnvYsU",
    link: "/shorts/2",
  },
  {
    id: 3,
    title: "3-ingredient Coconut Balls",
    views: "1.3K",
    thumbnail:
      "https://media.istockphoto.com/id/1179638048/photo/handmade-chocolates-with-coconut-and-honey-gourmet-chocolate-on-a-white-background.jpg?s=612x612&w=0&k=20&c=5W8BjBYWHYcYA0dQMPDEIwoRYsktzhpfNcxi5MXkMy0=",
    videoId: "e_y_Uz83llc",
    link: "/shorts/3",
  },
  {
    id: 4,
    title: "Flamin' Hot Cheetos Chicken",
    views: "1.4M",
    thumbnail: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
    videoId: "YnR1wQ_bfoc",
    link: "/shorts/4",
  },
  {
    id: 5,
    title: "Loaded Cheesy Fries",
    views: "313K",
    thumbnail: "https://images.unsplash.com/photo-1585109649139-366815a0d713",
    videoId: "ECET3CKoeQ8",
    link: "/shorts/5",
  },
  {
    id: 6,
    title: "The BEST 15 minutes PASTA",
    views: "2.8M",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    videoId: "rJOT2017z6Q",
    link: "/shorts/6",
  },
  {
    id: 7,
    title: "3 ingredient 🍌 banana bread recipe",
    views: "954K",
    thumbnail: "https://images.unsplash.com/photo-1632931057819-4eefffa8e007",
    videoId: "p67AskPazLU",
    link: "/shorts/7",
  },
  {
    id: 8,
    title: "Homemade bubble tea that tastes like the real thing",
    views: "3.2M",
    thumbnail: "https://images.unsplash.com/photo-1558857563-b371033873b8",
    videoId: "JO8xh5MIneU",
    link: "/shorts/8",
  },
  {
    id: 9,
    title: "Air fryer avocado fries 🥑 Crispy outside, creamy inside",
    views: "752K",
    thumbnail: "https://images.unsplash.com/photo-1548247661-3d7905940716",
    videoId: "KdxD3zVU4XE",
    link: "/shorts/9",
  },
  {
    id: 10,
    title: "30-second frozen yogurt bark - healthy dessert!",
    views: "1.1M",
    thumbnail: "https://images.unsplash.com/photo-1488900128323-21503983a07e",
    videoId: "pBhVhefxkcw",
    link: "/shorts/10",
  },
];

export default function Shorts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredItemId, setHoveredItemId] = useState(null);

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
  const visibleItems = 5;
  const maxIndex = shortsData.length - visibleItems;

  return (
    <section className="py-8 overflow-hidden w-full mt-10">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <PlayCircle className="w-9 h-9 text-primary mr-2" />
            <h2 className="text-4xl font-bold text-gray-900">
              Quick <span className="text-primary">Recipes</span>
            </h2>
          </div>

          <Link
            href="/shorts"
            className="text-primary font-medium hover:bg-primary/10 px-6 py-2.5 rounded-full transition-all text-sm flex items-center gap-2 border border-primary/20"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div
            className="flex gap-5 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (198 + 16)}px)` }}
          >
            {shortsData.map((short) => (
              <div key={short.id}>
                <div
                  className="flex-shrink-0 w-[200px] rounded-xl cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-[1.02] bg-black"
                  onMouseEnter={() => setHoveredItemId(short.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  <Link href={short.link}>
                    <div className="relative aspect-[9/16] group bg-black">
                      <div className="absolute inset-0 w-full h-full cursor-pointer">
                        {hoveredItemId === short.id ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${short.videoId}`}
                            title={short.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full object-cover cursor-pointer"
                          ></iframe>
                        ) : (
                          <Image
                            src={short.thumbnail}
                            alt={short.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Only title and views below */}
                <div className="mt-2">
                  <h3 className="font-medium line-clamp-2 text-sm">
                    {short.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {short.views} views
                  </p>
                </div>
              </div>
            ))}
          </div>

          {activeIndex > 0 && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 shadow-md z-10 hover:bg-opacity-100 transition-all"
              aria-label="Previous shorts"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {activeIndex < maxIndex && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-2 shadow-md z-10 hover:bg-opacity-100 transition-all"
              aria-label="Next shorts"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.min(maxIndex + 1, 5) }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
