import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * RecipeCard component - displays a recipe card with thumbnail, title, and author
 * Similar to eBay product cards with hover effects
 */
const RecipeCard = ({ recipe }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // If no recipe is provided, provide fallback data
  const {
    id = '1',
    title = 'Delicious Pasta Recipe',
    thumbnail = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
    authorName = 'Jane Doe',
    authorAvatar = 'https://randomuser.me/api/portraits/women/65.jpg',
    duration = '30 min',
    difficulty = 'Medium',
    tags = ['Italian', 'Pasta', 'Quick'],
    videoPreview = 'https://example.com/video.mp4'
  } = recipe || {};

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/recipes/${id}`} className="block">
        <div className="relative h-48 w-full">
          {/* Recipe Thumbnail */}
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          
          {/* Video Preview on Hover (eBay-inspired) */}
          {isHovering && videoPreview && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/80 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Recipe Duration */}
          <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
            {duration}
          </div>
          
          {/* Recipe Difficulty */}
          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs font-medium">
            {difficulty}
          </div>
        </div>
        
        <div className="p-4">
          {/* Recipe Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          
          {/* Recipe Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, i) => (
              <span 
                key={i} 
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Recipe Author */}
          <div className="flex items-center">
            <div className="relative h-6 w-6 rounded-full overflow-hidden mr-2">
              <Image 
                src={authorAvatar} 
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-600">
              {authorName}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard; 