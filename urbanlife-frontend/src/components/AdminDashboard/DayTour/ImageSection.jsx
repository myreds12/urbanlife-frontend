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
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Photo +
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
                className="absolute top-0 right-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
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
