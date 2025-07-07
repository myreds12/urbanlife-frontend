import React from "react";

const ImageSection = ({
  id,
  isActive,
  photos,
  handlePhotoUpload,
  removePhoto,
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
        <div className="grid grid-cols-5">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Tour photo ${index + 1}`}
                className="w-40 h-50 mt-2 object-cover rounded-md"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-0 right-10 bg-zinc-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-400"
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
