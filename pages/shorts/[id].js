import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import Shorts from "@/components/Shorts";

// Using shorts data from Shorts component
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

export default function ShortDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [currentShort, setCurrentShort] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [showMusic, setShowMusic] = useState(true);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({
    cuisineType: [],
    dietary: [],
    mealType: [],
    difficulty: "",
    cookingTime: "",
  });

  // Find the short data based on ID when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      const shortData = shortsData.find((short) => short.id === parseInt(id));
      if (shortData) {
        setCurrentShort(shortData);
      } else {
        // Handle not found
        router.push("/shorts");
      }
    }
  }, [id, router]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, this would send the comment to the backend
      alert("Comment submitted: " + comment);
      setComment("");
    }
  };

  const handleNextVideo = () => {
    const currentIndex = shortsData.findIndex(
      (short) => short.id === parseInt(id)
    );
    if (currentIndex < shortsData.length - 1) {
      router.push(`/shorts/${shortsData[currentIndex + 1].id}`);
    }
  };

  const handlePrevVideo = () => {
    const currentIndex = shortsData.findIndex(
      (short) => short.id === parseInt(id)
    );
    if (currentIndex > 0) {
      router.push(`/shorts/${shortsData[currentIndex - 1].id}`);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  // For carousel navigation
  const scrollRight = () => {
    if (activeIndex < shortsData.length - 4) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  if (!currentShort) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentShort.title} - Recipe Chef Shorts</title>
        <meta name="description" content={currentShort.title} />
      </Head>
      <Navbar />

      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar with Filters - Only visible on desktop */}
            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
              <div className="sticky top-20 bg-white rounded-lg shadow p-4">
                <h2 className="font-bold text-xl mb-4">Recipe Filters</h2>
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4 xl:w-4/5">
              {/* Mobile Filter Toggle - Only visible on mobile */}
              <div className="mb-4 lg:hidden">
                <button
                  className="w-full bg-white shadow rounded-lg px-4 py-3 text-left flex items-center justify-between"
                  onClick={() => alert("This would open the filters on mobile")}
                >
                  <span className="font-medium">Filters</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* TikTok-style Video Container */}
              <div
                className="relative bg-black rounded-lg overflow-hidden shadow-xl"
                style={{ height: "calc(100vh - 200px)" }}
              >
                {/* Video Player */}
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentShort.videoId}?autoplay=1&loop=1&playlist=${currentShort.videoId}&controls=1`}
                  title={currentShort.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>

                {/* Top Navigation */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center">
                  <Link
                    href="/shorts"
                    className="flex items-center text-white bg-black/50 rounded-full px-3 py-1"
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="text-sm font-medium">Back</span>
                  </Link>
                </div>

                {/* Music Tag */}
                {showMusic && (
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-md text-white text-xs">
                    [Music]
                  </div>
                )}

                {/* Right side action buttons */}
                <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-10">
                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button
                      className={`bg-black/30 rounded-full w-12 h-12 flex items-center justify-center ${
                        isLiked ? "text-red-500" : "text-white"
                      }`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      {currentShort.views}
                    </span>
                  </div>

                  {/* Comment Button */}
                  <div className="flex flex-col items-center">
                    <button className="bg-black/30 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
                      </svg>
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      Comment
                    </span>
                  </div>

                  {/* Share Button */}
                  <div className="flex flex-col items-center">
                    <button className="bg-black/30 rounded-full w-12 h-12 flex items-center justify-center text-white">
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                      </svg>
                    </button>
                    <span className="text-white text-xs mt-1 font-medium">
                      Share
                    </span>
                  </div>
                </div>

                {/* Bottom creator info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Creator"
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          @chef_{currentShort.id}
                        </p>
                      </div>
                      <button className="ml-auto bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold">
                        Subscribe
                      </button>
                    </div>

                    <p className="text-white text-base mb-2">
                      {currentShort.title}
                    </p>

                    {/* Navigation buttons */}
                    <div className="mt-4 flex justify-between items-center text-white/70 text-xs">
                      <button
                        onClick={handlePrevVideo}
                        className="flex items-center bg-white/10 px-3 py-1.5 rounded-full"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Previous
                      </button>
                      <button
                        onClick={handleNextVideo}
                        className="flex items-center bg-white/10 px-3 py-1.5 rounded-full"
                      >
                        Next
                        <svg
                          className="w-4 h-4 ml-1"
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
                    </div>
                  </div>
                </div>

                {/* Navigation click areas */}
                <button
                  onClick={handlePrevVideo}
                  className="absolute left-0 top-0 bottom-0 w-1/4 h-full opacity-0"
                  aria-label="Previous video"
                />

                <button
                  onClick={handleNextVideo}
                  className="absolute right-0 top-0 bottom-0 w-1/4 h-full opacity-0"
                  aria-label="Next video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Shorts />
        <Footer />
      </div>
    </>
  );
}
