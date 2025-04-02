import Image from "next/image";
import Link from "next/link";

const trendingRecipes = [
  {
    id: 1,
    title: "Spicy Thai Basil Noodles",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7",
    chef: "Sarah Johnson",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    reviews: 234,
    cuisine: "Thai",
  },
  {
    id: 2,
    title: "Classic Beef Wellington",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    chef: "Gordon Smith",
    time: "2 hrs",
    difficulty: "Hard",
    rating: 4.9,
    reviews: 456,
    cuisine: "British",
  },
  {
    id: 3,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    chef: "Maria Garcia",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.7,
    reviews: 189,
    cuisine: "Mediterranean",
  },
  {
    id: 4,
    title: "Japanese Ramen Bowl",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
    chef: "Kenji Tanaka",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.9,
    reviews: 567,
    cuisine: "Japanese",
  },
  {
    id: 5,
    title: "Authentic Italian Margherita Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    chef: "Marco Rossi",
    time: "1 hr",
    difficulty: "Medium",
    rating: 4.8,
    reviews: 789,
    cuisine: "Italian",
  },
  {
    id: 6,
    title: "Korean BBQ Bulgogi",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733",
    chef: "Min-ji Kim",
    time: "40 min",
    difficulty: "Medium",
    rating: 4.9,
    reviews: 345,
    cuisine: "Korean",
  },
  {
    id: 7,
    title: "French Coq au Vin",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    chef: "Pierre Dubois",
    time: "2.5 hrs",
    difficulty: "Hard",
    rating: 4.7,
    reviews: 234,
    cuisine: "French",
  },
  {
    id: 8,
    title: "Mexican Street Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
    chef: "Carlos Rodriguez",
    time: "35 min",
    difficulty: "Easy",
    rating: 4.9,
    reviews: 678,
    cuisine: "Mexican",
  },
  {
    id: 9,
    title: "Indian Butter Chicken",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
    chef: "Priya Patel",
    time: "50 min",
    difficulty: "Medium",
    rating: 4.8,
    reviews: 445,
    cuisine: "Indian",
  },
  {
    id: 10,
    title: "Greek Moussaka",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    chef: "Elena Papadopoulos",
    time: "1.5 hrs",
    difficulty: "Hard",
    rating: 4.6,
    reviews: 289,
    cuisine: "Greek",
  },
  {
    id: 11,
    title: "Vietnamese Pho",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43",
    chef: "Nguyen Van",
    time: "3 hrs",
    difficulty: "Medium",
    rating: 4.9,
    reviews: 567,
    cuisine: "Vietnamese",
  },
  {
    id: 12,
    title: "Spanish Paella",
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a",
    chef: "Isabella Martinez",
    time: "1 hr",
    difficulty: "Medium",
    rating: 4.7,
    reviews: 398,
    cuisine: "Spanish",
  },
];

export default function TrendingRecipes() {
  return (
    <section className="py-12 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-primary">Trending</span> Recipes
          </h2>
          <Link
            href="/recipes"
            className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 transition-colors"
          >
            View All
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingRecipes.map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-sm mb-2">
                    <span className="bg-primary/80 px-2 py-1 rounded-full">
                      {recipe.time}
                    </span>
                    <span className="bg-gray-900/80 px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    by {recipe.chef}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      {recipe.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({recipe.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
