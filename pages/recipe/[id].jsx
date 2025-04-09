import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Clock, Users, ChefHat, Star, MessageSquare, Share2, Bookmark } from 'lucide-react';

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveRecipe = () => {
    setIsSaved(!isSaved);
    // Here you would typically make an API call to save/unsave the recipe
    // For now, we'll just show an alert
    alert(isSaved ? 'Recipe removed from favorites' : 'Recipe saved to favorites');
  };

  return (
    <div>
      <Head>
        <title>Recipe Name - RecipeChef</title>
        <meta name="description" content="Detailed recipe instructions and ingredients" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/recipe-placeholder.jpg"
                alt="Recipe Name"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">Recipe Name</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>30 mins</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                <span>4 servings</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ChefHat className="w-5 h-5 mr-2" />
                <span>Medium</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-medium">4.8</span>
                <span className="text-gray-500 ml-1">(128 reviews)</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              A delicious recipe description goes here. This should be a brief overview of what makes this recipe special and what to expect when making it.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleSaveRecipe}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                  isSaved
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-5 h-5" />
                {isSaved ? 'Saved' : 'Save Recipe'}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 