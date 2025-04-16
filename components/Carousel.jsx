import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Carousel component - displays rotating featu¬ content
 * Similar to eBay's featured carousel with pagination and autoplay
 */
const Carousel = ({ slides = [], autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Default slides if none provided
  const defaultSlides = [
    {
      id: 1,
      title:
        "The Number One Destination for Food Lovers – 200,000+ Recipes & Counting.",
      subtitle:
        "Join millions of passionate cooks discovering new favorites every day. Dive into the ultimate recipe collection now.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      link: "/recipes/bbq-special",
      ctaText: "Browse Recipes",
    },
    {
      id: 2,
      title: "Explore the World's Favorite Recipes – All in One Place.",
      subtitle:
        "Enter our monthly giveaway for a chance to win exclusive cooking gear and foodie prizes!",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      link: "/sweepstakes",
      ctaText: "Enter to Win",
    },
    {
      id: 3,
      title: "From Quick Bites to Feast-Worthy Dishes – Find It All Here.",
      subtitle:
        "Whether it's a 10-minute snack or a weekend feast, we've got the perfect recipe for every craving.",
      image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55",
      link: "/recipes/quick-breakfasts",
      ctaText: "Find Your Flavor",
    },
  ];

  // Use provided slides or fallback to defaults
  const carouselSlides = slides.length > 0 ? slides : defaultSlides;

  // Navigate to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselSlides.length - 1 ? 0 : prevIndex + 1
    );
  }, [carouselSlides.length]);

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselSlides.length - 1 : prevIndex - 1
    );
  };

  // Navigate to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Autoplay effect
  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, nextSlide, autoPlayInterval]);

  return (
    <div className="relative w-full overflow-hidden shadow-2xl xl:rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Carousel wrapper */}
      <div
        className="relative flex transition-transform duration-700 ease-out"
        style={{
          width: `${carouselSlides.length * 100}%`,
          transform: `translateX(-${
            currentIndex * (100 / carouselSlides.length)
          }%)`,
        }}
      >
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full flex-shrink-0 aspect-[16/9] md:aspect-[21/9] overflow-hidden"
            style={{ width: `${100 / carouselSlides.length}%` }}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover transition-all duration-700"
              priority={index === currentIndex}
            />

            {/* Gradient overlay - adjusted opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />

            {/* Content with improved typography */}
            <div className="absolute inset-0 flex items-center z-20 px-8 md:px-20">
              <div className="max-w-2xl text-white transform transition-all duration-500">
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-6 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-base md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.link}
                  className="inline-block bg-white text-black px-10 py-4 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg"
                >
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - removed blur effect */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Previous Slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label="Next Slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots - adjusted position */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-10 bg-white"
                : "w-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay control - removed blur effect */}
      <button
        onClick={toggleAutoplay}
        className="absolute bottom-8 right-8 z-30 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      >
        {isPlaying ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Carousel;
