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
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
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

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
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

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
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

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
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

        <div className="flex items-center justify-end mb-4">
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
            <label className="block text-sm font-medium text-gray-600 mb-2 bg-gray-100 px-4 py-2 rounded-md">
              Existing Photos
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
