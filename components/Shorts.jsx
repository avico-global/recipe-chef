import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import shortsData from "../data/recipes.json";

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
    <section className="py-8 overflow-hidden w-full">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <PlayCircle className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Quick <span className="text-primary">Recipes</span>
            </h2>
          </div>

          <Link
            href="/recipes"
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
            {shortsData.slice(0, 20).map((short) => (
              <div key={short.id}>
                <div
                  className="flex-shrink-0 w-[200px] rounded-xl cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-[1.02] bg-black"
                  onMouseEnter={() => setHoveredItemId(short.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  <Link href={`/recipes/${short.id}`} className="w-full h-full">
                    <div className="relative aspect-[9/16] group bg-black">
                      <div className="absolute inset-0 w-full h-full cursor-pointer">
                        {hoveredItemId === short.id ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${short.shortId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${short.shortId}`}
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
                  <p className="text-gray-500 text-xs my-1.5">
                    {short.views} views
                  </p>
                  <Link
                    href={`/recipes/${short.id}`}
                    className="text-primary group font-medium hover:text-primary/80 transition-all text-sm flex items-center gap-2 w-fit"
                  >
                    View Recipe{" "}
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-all duration-700" />
                  </Link>
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
