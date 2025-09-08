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
                  Story Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={story.title_en}
                  onChange={handleStoryChange}
                  placeholder="Enter story title in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
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
                  Story Title (ID) <span className="text-red-500">*</span>
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

        <div className="mb-4 mt-5 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Upload Photos
          </label>
          <input
            type="file"
            multiple
            onChange={handlePhotoUpload}
            className="py-1 px-3 w-full rounded-md border border-gray-300"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {existingPhotos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={photo.url}
                alt={`Existing ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeExistingPhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Uploaded ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsOurStoriesSection;