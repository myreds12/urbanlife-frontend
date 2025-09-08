// src/components/AdminDashboard/AboutUs/AboutUsOurStoriesSection.jsx
import React from "react";

const AboutUsOurStoriesSection = ({
  id,
  isActive,
  story,
  handleStoryChange,
  photos,
  handlePhotoUpload,
  removePhoto,
  existingPhotos,
  removeExistingPhoto,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* english section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              English Content
            </h3>

            <div className="space-y-4">
              {/* title - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={story.title_en}
                  onChange={handleStoryChange}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* content - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content_en"
                  value={story.content_en}
                  onChange={handleStoryChange}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>



          {/* Indonesian Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              Indonesian Content
            </h3>

            <div className="space-y-4">
              {/* title - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={story.title_id}
                  onChange={handleStoryChange}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
              
              {/* content - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (ID) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content_id"
                  value={story.content_id}
                  onChange={handleStoryChange}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mb-4 mt-5">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photoUpload"
            multiple
          />
          <label
            htmlFor="photoUpload"
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md cursor-pointer"
          >
            Add Photo +
          </label>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {photos.map((photo, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Uploaded ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {existingPhotos.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2 ">
              Existing Photos :
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {existingPhotos.map((photo, i) => (
                <div key={i} className="relative group">
                  <img
                    src={photo.url}
                    alt={`Existing Photo ${i + 1}`}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingPhoto(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsOurStoriesSection;
