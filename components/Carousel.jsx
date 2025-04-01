import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Carousel component - displays rotating featured content
 * Similar to eBay's featured carousel with pagination and autoplay
 */
const Carousel = ({ slides = [], autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Default slides if none provided
  const defaultSlides = [
    {
      id: 1,
      type: "recipe",
      title: "Summer BBQ Special",
      subtitle: "Master the grill with our top tips",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      link: "/recipes/bbq-special",
      ctaText: "View Recipes",
    },
    {
      id: 2,
      type: "sweepstakes",
      title: "Win a Professional Chef Set",
      subtitle: "Enter our monthly giveaway",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      link: "/sweepstakes",
      ctaText: "Enter Now",
    },
    {
      id: 3,
      type: "recipe",
      title: "Quick & Healthy Breakfasts",
      subtitle: "Start your day right",
      image: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55",
      link: "/recipes/quick-breakfasts",
      ctaText: "Explore Collection",
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
    <div className="relative w-full overflow-hidden shadow-lg xl:rounded-2xl mt-10">
      {/* Carousel slides */}
      <div
        className="relative h-[300px] md:h-[350px] w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            {/* Slide background image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === currentIndex}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

              {/* Slide content */}
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:px-16">
                <div className="max-w-md">
                  {slide.type === "sweepstakes" && (
                    <span className="inline-block bg-secondary text-white text-xs px-2 py-1 rounded-sm mb-4">
                      SWEEPSTAKES
                    </span>
                  )}
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 mb-6">{slide.subtitle}</p>
                  <Link
                    href={slide.link}
                    className="inline-block bg-white text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm text-white transition-colors z-10"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm text-white transition-colors z-10"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots pagination */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay control */}
      <button
        onClick={toggleAutoplay}
        className="absolute bottom-4 right-4 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm text-white transition-colors z-10"
        aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
      >
        {isPlaying ? (
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
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
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
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Carousel;
