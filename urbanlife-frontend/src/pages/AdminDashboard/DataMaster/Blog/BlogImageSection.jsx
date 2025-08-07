// BlogImageSection.jsx
import React from "react";

const BlogImageSection = ({
  id,
  isActive,
  photos,
  handlePhotoUpload,
  removePhoto,
  existingPhotos,
  removeExistingPhoto,
}) => {
  if (!isActive) return null;

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="flex items-center justify-end mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photoUpload"
          />
          <label
            htmlFor="photoUpload"
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md cursor-pointer"
          >
            Add Photo +
          </label>
        </div>
        <div className="grid grid-cols-5">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={
                  photo instanceof File
                    ? URL.createObjectURL(photo)
                    : photo.fullUrl || "/placeholder-image.jpg"
                }
                alt={photo.name || `Photo ${index + 1}`}
                className="w-40 h-50 mt-2 object-cover rounded-md"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-0 right-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {existingPhotos?.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-2">Existing Photos</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {existingPhotos.map((photo, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={photo.url}
                      alt={`Existing Photo ${i + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                    {removeExistingPhoto && (
                      <button
                        type="button"
                        onClick={() => removeExistingPhoto(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogImageSection;
