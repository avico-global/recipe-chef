import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * RecipeCard component - displays a recipe card with thumbnail, title, and author
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
    cuisineType = 'Italian',
    tags = ['Italian', 'Pasta', 'Quick'],
    videoPreview = 'https://example.com/video.mp4'
  } = recipe || {};

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link href={`/recipes/${id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden">
          {/* Recipe Thumbnail */}
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
          
          {/* Video Preview on Hover */}
          {isHovering && videoPreview && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/90 p-3 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Recipe Duration */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center">
              <svg className="w-4 h-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration}
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-xs font-medium">
              {difficulty}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          {/* Recipe Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          
          {/* Recipe Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cuisineType && (
              <Link 
                href={`/recipes/cuisine/${cuisineType.toLowerCase()}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-block bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-lg hover:bg-primary/20 transition-colors"
              >
                {cuisineType}
              </Link>
            )}
            {tags.slice(0, 2).map((tag, i) => (
              <span 
                key={i} 
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-lg">
                +{tags.length - 2}
              </span>
            )}
          </div>
          
          {/* Recipe Author */}
          <div className="flex items-center pt-3 border-t border-gray-100">
            <div className="relative h-7 w-7 rounded-full overflow-hidden border border-gray-200 mr-2.5">
              <Image 
                src={authorAvatar} 
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {authorName}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard; 