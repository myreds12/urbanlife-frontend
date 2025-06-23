import React from "react";

const CarGallery = ({ images, onDelete }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {images.map((img, index) => (
        <div key={index} className="relative">
          <img
            src={img}
            alt={`Car ${index}`}
            className="w-28 h-28 rounded-xl object-cover"
          />
          <button
            onClick={() => onDelete(index)}
            className="absolute top-0 right-0 bg-white text-red-500 text-xs rounded-full p-1 shadow-md hover:bg-red-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarGallery;
