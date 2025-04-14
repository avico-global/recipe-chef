import Image from "next/image";
import Link from "next/link";
import trendingRecipes from "../data/recipes.json";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingRecipes?.slice(0, 9).map((recipe) => (
            <Link
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={recipe.thumbnail}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap items-center gap-2 text-white text-sm mb-2">
                    <span className="bg-primary/80 px-2 py-1 rounded-full">
                      {recipe.duration}
                    </span>
                    <span className="bg-gray-900/80 px-2 py-1 rounded-full">
                      {recipe.difficulty}
                    </span>
                    <span className="bg-primary/80 px-2 py-1 rounded-full">
                      {recipe.cuisineType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                  {recipe.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-3 mb-3">
                  <div className="relative h-5 w-5 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary shadow-lg ring-2 ring-primary/20">
                    <span className="text-sm font-bold capitalize">
                      {recipe?.authorName?.slice(0, 1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    by {recipe.authorName}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.dietary.map((diet, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
