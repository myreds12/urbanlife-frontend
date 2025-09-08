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

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Story Title (ID) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title_id"
            value={story.title_id}
            onChange={handleStoryChange}
            placeholder="Masukkan judul cerita dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Story Content (EN)
          </label>
          <textarea
            name="content_en"
            value={story.content_en}
            onChange={handleStoryChange}
            placeholder="Enter story content in English..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            rows="4"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Story Content (ID)
          </label>
          <textarea
            name="content_id"
            value={story.content_id}
            onChange={handleStoryChange}
            placeholder="Masukkan konten cerita dalam bahasa Indonesia..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 placeholder-gray-400"
            rows="4"
          />
        </div>

        <div className="mb-4 flex items-center">
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