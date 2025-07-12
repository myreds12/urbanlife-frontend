import React from "react";

const ImageSection = ({
  id,
    isActive,
  existingPhotos = [],
  newPhotos = [],
  handlePhotoUpload,
  removeExistingPhoto,
  removeNewPhoto,
}) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="flex items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photoUpload"
          />
          <label
            htmlFor="photoUpload"
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 cursor-pointer"
          >
            Add Photo
          </label>
        </div>
          <div className="grid grid-cols-5 gap-3">
        {existingPhotos.map((photo, index) => (
          <div key={`existing-${index}`} className="relative">
            <img
              src={photo.fullUrl}
              alt={`Existing photo ${index + 1}`}
              className="w-40 h-40 object-cover rounded-md"
            />
            <button
              onClick={() => removeExistingPhoto(index)}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-500"
            >
              ×
            </button>
          </div>
        ))}

        {newPhotos.map((photo, index) => (
          <div key={`new-${index}`} className="relative">
            <img
              src={URL.createObjectURL(photo)}
              alt={`New photo ${index + 1}`}
              className="w-40 h-40 object-cover rounded-md"
            />
            <button
              onClick={() => removeNewPhoto(index)}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ImageSection;
