import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

/**
 * UploadWizard component - multi-step form for uploading recipes
 */
const UploadWizard = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    mealType: '',
    difficulty: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: [''],
    instructions: [''],
    dietaryRestrictions: [],
    thumbnail: null,
    thumbnailPreview: '',
    video: null,
    videoPreview: '',
    tags: [],
    newTag: '',
  });
  const [errors, setErrors] = useState({});

  // Dietary options
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 
    'Dairy-Free', 'Keto', 'Low-Carb'
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle dietary restriction toggles
  const handleDietaryToggle = (restriction) => {
    setFormData(prev => {
      const isSelected = prev.dietaryRestrictions.includes(restriction);
      
      const updated = isSelected
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction];
        
      return {
        ...prev,
        dietaryRestrictions: updated
      };
    });
  };

  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    setFormData(prev => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index] = value;
      
      return {
        ...prev,
        ingredients: updatedIngredients
      };
    });
  };

  // Add new ingredient field
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  // Remove ingredient field
  const removeIngredient = (index) => {
    if (formData.ingredients.length <= 1) return;
    
    setFormData(prev => {
      const updatedIngredients = prev.ingredients.filter((_, i) => i !== index);
      return {
        ...prev,
        ingredients: updatedIngredients
      };
    });
  };

  // Handle instruction changes
  const handleInstructionChange = (index, value) => {
    setFormData(prev => {
      const updatedInstructions = [...prev.instructions];
      updatedInstructions[index] = value;
      
      return {
        ...prev,
        instructions: updatedInstructions
      };
    });
  };

  // Add new instruction field
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  // Remove instruction field
  const removeInstruction = (index) => {
    if (formData.instructions.length <= 1) return;
    
    setFormData(prev => {
      const updatedInstructions = prev.instructions.filter((_, i) => i !== index);
      return {
        ...prev,
        instructions: updatedInstructions
      };
    });
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      thumbnail: file,
      thumbnailPreview: previewUrl
    }));
    
    // Clear error
    if (errors.thumbnail) {
      setErrors(prev => ({
        ...prev,
        thumbnail: ''
      }));
    }
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setFormData(prev => ({
      ...prev,
      video: file,
      videoPreview: previewUrl
    }));
    
    // Clear error
    if (errors.video) {
      setErrors(prev => ({
        ...prev,
        video: ''
      }));
    }
  };

  // Handle tag input
  const handleTagInput = (e) => {
    setFormData(prev => ({
      ...prev,
      newTag: e.target.value
    }));
  };

  // Add tag to list
  const addTag = () => {
    if (!formData.newTag.trim()) return;
    
    // Check if tag already exists
    if (formData.tags.includes(formData.newTag.trim())) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, prev.newTag.trim()],
      newTag: ''
    }));
  };

  // Add tag on enter key
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Remove tag from list
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.cuisine) newErrors.cuisine = 'Cuisine is required';
      if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required';
      if (!formData.prepTime) newErrors.prepTime = 'Prep time is required';
      if (!formData.cookTime) newErrors.cookTime = 'Cook time is required';
      if (!formData.servings) newErrors.servings = 'Number of servings is required';
    }
    
    if (step === 2) {
      if (formData.ingredients.some(ingredient => !ingredient.trim())) {
        newErrors.ingredients = 'All ingredients must be filled';
      }
      
      if (formData.instructions.some(instruction => !instruction.trim())) {
        newErrors.instructions = 'All instructions must be filled';
      }
    }
    
    if (step === 3) {
      if (!formData.thumbnail) newErrors.thumbnail = 'Please upload a thumbnail image';
      if (!formData.video) newErrors.video = 'Please upload a video';
      if (formData.tags.length === 0) newErrors.tags = 'Please add at least one tag';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Go to previous step
  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      // In a real application, you would send the data to your API here
      console.log('Form submitted:', formData);
      
      // Simulate successful submission
      alert('Recipe uploaded successfully!');
      router.push('/recipes');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 
                  ${step >= stepNumber 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-gray-400 border-gray-300'
                  }`}
              >
                {stepNumber < step ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className={`text-xs mt-1 ${step >= stepNumber ? 'text-primary' : 'text-gray-500'}`}>
                {stepNumber === 1 && 'Basic Info'}
                {stepNumber === 2 && 'Ingredients & Steps'}
                {stepNumber === 3 && 'Media'}
                {stepNumber === 4 && 'Review'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber} 
                className={`h-1 w-1/4 ${step > stepNumber ? 'bg-primary' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Recipe Information */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Basic Recipe Information</h2>
            
            <div className="space-y-6">
              {/* Recipe Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="E.g., Homemade Margherita Pizza"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Briefly describe your recipe"
                ></textarea>
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
              </div>
              
              {/* Cuisine Type */}
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                  Cuisine Type*
                </label>
                <select
                  id="cuisine"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.cuisine ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Asian">Asian</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </select>
                {errors.cuisine && (
                  <span className="text-red-500 text-sm">{errors.cuisine}</span>
                )}
              </div>
              
              {/* Meal Type */}
              <div>
                <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Type*
                </label>
                <select
                  id="mealType"
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.mealType ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Meal Type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Snack">Snack</option>
                  <option value="Appetizer">Appetizer</option>
                </select>
                {errors.mealType && (
                  <span className="text-red-500 text-sm">{errors.mealType}</span>
                )}
              </div>
              
              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level*
                </label>
                <div className="flex space-x-4">
                  {['Easy', 'Medium', 'Hard'].map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        id={`difficulty-${level}`}
                        name="difficulty"
                        type="radio"
                        value={level}
                        checked={formData.difficulty === level}
                        onChange={handleChange}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`difficulty-${level}`} className="ml-2 text-sm text-gray-600">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.difficulty && (
                  <span className="text-red-500 text-sm">{errors.difficulty}</span>
                )}
              </div>
              
              {/* Times and Servings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)*
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    min="1"
                    value={formData.prepTime}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.prepTime ? 'border-red-500' : ''}`}
                  />
                  {errors.prepTime && (
                    <span className="text-red-500 text-sm">{errors.prepTime}</span>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Cook Time (minutes)*
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    min="1"
                    value={formData.cookTime}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.cookTime ? 'border-red-500' : ''}`}
                  />
                  {errors.cookTime && (
                    <span className="text-red-500 text-sm">{errors.cookTime}</span>
                  )}
                </div>
                
                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
                    Servings*
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    min="1"
                    value={formData.servings}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${errors.servings ? 'border-red-500' : ''}`}
                  />
                  {errors.servings && (
                    <span className="text-red-500 text-sm">{errors.servings}</span>
                  )}
                </div>
              </div>
              
              {/* Dietary Restrictions */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Restrictions (Optional)
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`dietary-${option}`}
                        type="checkbox"
                        checked={formData.dietaryRestrictions.includes(option)}
                        onChange={() => handleDietaryToggle(option)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`dietary-${option}`} className="ml-2 text-sm text-gray-600">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next: Ingredients & Steps
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Ingredients and Instructions */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Ingredients & Instructions</h2>
            
            <div className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Ingredients</h3>
                
                {errors.ingredients && (
                  <p className="text-red-500 text-sm mb-2">{errors.ingredients}</p>
                )}
                
                <div className="space-y-2">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Ingredient ${index + 1}`}
                        className="block flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                        aria-label="Remove ingredient"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={addIngredient}
                  className="mt-3 inline-flex items-center text-sm text-primary hover:text-primary-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Ingredient
                </button>
              </div>
              
              {/* Instructions */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Instructions</h3>
                
                {errors.instructions && (
                  <p className="text-red-500 text-sm mb-2">{errors.instructions}</p>
                )}
                
                <div className="space-y-3">
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium mt-1">
                        {index + 1}
                      </span>
                      <div className="ml-3 flex-1">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          placeholder={`Step ${index + 1}`}
                          rows="2"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        ></textarea>
                        <button
                          type="button"
                          onClick={() => removeInstruction(index)}
                          className="mt-1 text-sm text-gray-500 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  type="button"
                  onClick={addInstruction}
                  className="mt-3 inline-flex items-center text-sm text-primary hover:text-primary-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Another Step
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-900"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next: Add Media
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Media Upload */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Add Media</h2>
            
            <div className="space-y-8">
              {/* Thumbnail Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Recipe Thumbnail*</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Upload a high-quality image of your finished recipe. This will be displayed as the main image.
                </p>
                
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {formData.thumbnailPreview ? (
                    <div className="space-y-2 text-center">
                      <div className="relative h-40 w-full">
                        <Image 
                          src={formData.thumbnailPreview} 
                          alt="Thumbnail preview" 
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, thumbnail: null, thumbnailPreview: '' }))}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="thumbnail-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none">
                          <span>Upload a file</span>
                          <input 
                            id="thumbnail-upload" 
                            name="thumbnail" 
                            type="file" 
                            className="sr-only"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm mt-2">{errors.thumbnail}</p>
                )}
              </div>
              
              {/* Video Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Recipe Video*</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Upload a video demonstration of your recipe. This helps others follow along.
                </p>
                
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {formData.videoPreview ? (
                    <div className="space-y-2 text-center w-full">
                      <video 
                        src={formData.videoPreview} 
                        controls 
                        className="max-h-60 mx-auto"
                      ></video>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, video: null, videoPreview: '' }))}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="video-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none">
                          <span>Upload a video</span>
                          <input 
                            id="video-upload" 
                            name="video" 
                            type="file" 
                            className="sr-only"
                            accept="video/*"
                            onChange={handleVideoUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        MP4, MOV, WEBM up to 100MB
                      </p>
                    </div>
                  )}
                </div>
                
                {errors.video && (
                  <p className="text-red-500 text-sm mt-2">{errors.video}</p>
                )}
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Recipe Tags*</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Add tags to help others discover your recipe.
                </p>
                
                <div className="flex items-center">
                  <input
                    type="text"
                    value={formData.newTag}
                    onChange={handleTagInput}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add a tag and press Enter"
                    className="block flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover"
                  >
                    Add
                  </button>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1.5 inline-flex text-primary-dark hover:text-primary"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-2">{errors.tags}</p>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-900"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next: Review & Submit
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Review & Submit</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                {/* Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    {formData.thumbnailPreview && (
                      <div className="relative h-48 w-full">
                        <Image 
                          src={formData.thumbnailPreview} 
                          alt={formData.title} 
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold">{formData.title}</h3>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="mt-2 text-gray-600">
                      {formData.description}
                    </p>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Prep:</span> {formData.prepTime} min
                      </div>
                      <div>
                        <span className="font-medium">Cook:</span> {formData.cookTime} min
                      </div>
                      <div>
                        <span className="font-medium">Servings:</span> {formData.servings}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm">
                      <span className="font-medium mr-2">Difficulty:</span>
                      <span className={`
                        ${formData.difficulty === 'Easy' ? 'text-green-500' : ''}
                        ${formData.difficulty === 'Medium' ? 'text-yellow-500' : ''}
                        ${formData.difficulty === 'Hard' ? 'text-red-500' : ''}
                      `}>
                        {formData.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-600">
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Dietary Restrictions */}
                  {formData.dietaryRestrictions.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mb-2">Dietary Information</h4>
                      <div className="flex flex-wrap gap-1">
                        {formData.dietaryRestrictions.map((diet) => (
                          <span
                            key={diet}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Submit Confirmation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  Your recipe is ready to be submitted! Please review the information above to ensure everything is correct.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-600 hover:text-gray-900"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit Recipe
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadWizard; 