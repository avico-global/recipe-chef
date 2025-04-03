import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Use the same data as in Shorts.jsx and shorts/[id].js with YouTube videos
const shortsData = [
  {
    id: 1,
    title: "Rainbow Cupcake Decorating",
    views: "7.1K",
    likes: "2.4K",
    thumbnail: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7",
    videoId: "LbMxowwNRSw",
    authorName: "SoYummy",
    authorAvatar: "/images/soyummy-avatar.png",
    description:
      "Viral string cupcake decorating meets 90's rainbow scratch art! 🌈✨",
  },
  {
    id: 2,
    title: "Crispy Chicken Chips",
    views: "8.7M",
    likes: "1.2M",
    thumbnail: "https://images.unsplash.com/photo-1562967916-eb82221dfb92",
    videoId: "9jRNoKcGKS8",
    authorName: "ChefMike",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "The CRISPIEST chicken chips you'll ever try! Secret ingredient: rice flour for extra crunch!",
  },
  {
    id: 3,
    title: "3-ingredient protein chips",
    views: "1.3K",
    likes: "245",
    thumbnail: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    videoId: "WRAflVF_zck",
    authorName: "FitFoodie",
    authorAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
    description:
      "High-protein, low-carb chicken chips for fitness enthusiasts! Just 3 simple ingredients.",
  },
  {
    id: 4,
    title: "Flamin' Hot Cheetos Chicken",
    views: "1.4M",
    likes: "321K",
    thumbnail: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58",
    videoId: "KbwMWe-tranc",
    authorName: "TrendyChef",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    description:
      "Flamin' Hot Cheetos chicken! The viral recipe that's breaking the internet. So easy to make!",
  },
  {
    id: 5,
    title: "Loaded Cheesy Fries",
    views: "313K",
    likes: "87.2K",
    thumbnail: "https://images.unsplash.com/photo-1585109649139-366815a0d713",
    videoId: "DIjw3Y8zPcE",
    authorName: "ComfortFoodKing",
    authorAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
    description:
      "The ultimate comfort food: loaded fries topped with crispy chicken and melted cheese blend!",
  },
  {
    id: 6,
    title: "15-minute pasta hack that went viral 🍝",
    views: "2.8M",
    likes: "452K",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    videoId: "BFKh3BpgHB8",
    authorName: "PastaQueen",
    authorAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
    description:
      "This pasta hack saves so much time! One pot, no draining, and it's ready in just 15 minutes.",
  },
  {
    id: 7,
    title: "5-ingredient banana bread 🍌 No mixer needed!",
    views: "954K",
    likes: "122K",
    thumbnail: "https://images.unsplash.com/photo-1632931057819-4eefffa8e007",
    videoId: "1dE6Gy4C77w",
    authorName: "BakingSimplified",
    authorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
    description:
      "Super easy banana bread that doesn't require a mixer! Perfect for overripe bananas.",
  },
  {
    id: 8,
    title: "Homemade bubble tea that tastes like the real thing",
    views: "3.2M",
    likes: "576K",
    thumbnail: "https://images.unsplash.com/photo-1558857563-b371033873b8",
    videoId: "5Hj51RwWgZw",
    authorName: "TeaExpert",
    authorAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
    description:
      "Make authentic bubble tea at home! Secret to perfect boba pearls revealed.",
  },
  {
    id: 9,
    title: "Air fryer avocado fries 🥑 Crispy outside, creamy inside",
    views: "752K",
    likes: "103K",
    thumbnail: "https://images.unsplash.com/photo-1548247661-3d7905940716",
    videoId: "R04iLwipXY8",
    authorName: "AirFryerMaster",
    authorAvatar: "https://randomuser.me/api/portraits/men/43.jpg",
    description:
      "These avocado fries are crispy on the outside, creamy on the inside! Perfect air fryer recipe.",
  },
  {
    id: 10,
    title: "30-second frozen yogurt bark - healthy dessert!",
    views: "1.1M",
    likes: "198K",
    thumbnail: "https://images.unsplash.com/photo-1488900128323-21503983a07e",
    videoId: "vz86I_Ak06M",
    authorName: "HealthyTreats",
    authorAvatar: "https://randomuser.me/api/portraits/women/58.jpg",
    description:
      "Quick, healthy dessert that kids love! Frozen yogurt bark with berries and honey.",
  },
];

export default function ShortsPage() {
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const shortsContainerRef = useRef(null);

  const handleNextShort = () => {
    if (currentShortIndex < shortsData.length - 1) {
      setCurrentShortIndex(currentShortIndex + 1);
    }
  };

  const handlePrevShort = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex(currentShortIndex - 1);
    }
  };

  return (
    <>
      <Head>
        <title>Shorts - Recipe Cooks</title>
        <meta
          name="description"
          content="Quick recipe videos and cooking tips"
        />
      </Head>

      <Navbar />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Trending Today</h1>
            <div className="flex space-x-2">
              <button className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-primary-dark transition">
                For You
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition">
                Following
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition">
                Food
              </button>
            </div>
          </div>

          {/* Shorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shortsData.map((short, index) => (
              <Link
                href={`/shorts/${short.id}`}
                key={short.id}
                className="relative rounded-xl overflow-hidden aspect-[9/16] group bg-white shadow-md hover:shadow-xl transition-shadow"
                onMouseEnter={() => setHoveredItemId(short.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                <div className="absolute inset-0">
                  {hoveredItemId === short.id ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${short.videoId}`}
                      title={short.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-cover"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 border border-white">
                      <Image
                        src={short.authorAvatar}
                        alt={short.authorName}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-white text-sm font-semibold truncate">
                      {short.authorName}
                    </p>
                  </div>
                  <h3 className="text-white text-sm font-medium line-clamp-2 mb-2">
                    {short.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-white">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {short.views}
                    </div>
                    <div className="flex items-center text-white">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {short.likes}
                    </div>
                  </div>
                </div>

                {/* Play button overlay - visible on hover */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    hoveredItemId === short.id ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                >
                  <div className="bg-black bg-opacity-40 rounded-full p-3">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile fullscreen view for current short */}
          <div className="fixed inset-0 bg-white lg:hidden hidden">
            <div className="h-full w-full relative" ref={shortsContainerRef}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${shortsData[currentShortIndex].videoId}?autoplay=1&controls=0&loop=1&playlist=${shortsData[currentShortIndex].videoId}`}
                title={shortsData[currentShortIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>

              {/* Controls */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={handlePrevShort}
                  disabled={currentShortIndex === 0}
                  className={`rounded-full bg-black bg-opacity-50 p-2 ${
                    currentShortIndex === 0 ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={handleNextShort}
                  disabled={currentShortIndex === shortsData.length - 1}
                  className={`rounded-full bg-black bg-opacity-50 p-2 ${
                    currentShortIndex === shortsData.length - 1
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
        </div>
      </div>

      <Footer />
    </>
  );
}
