import React, { useState } from "react";

const CarGallery = ({ images, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img, index) => {
    setSelectedImage({ src: img, index });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-xl">
        <p className="text-gray-500 text-sm">No images uploaded yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(img, index)}
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-cyan-400 transition-colors">
              <img
                src={img}
                alt={`Car ${index + 1}`}
                className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSA0MEg3NVY2MEgyNVY0MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTM1IDUwSDY1VjU1SDM1VjUwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K';
                }}
              />
              
              {/* Overlay saat hover */}
              <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium shadow-lg transition-colors z-10"
              title="Delete image"
            >
              ✕
            </button>

            {/* Image number badge */}
            <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk view image full size */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage.src}
              alt={`Car ${selectedImage.index + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
              Image {selectedImage.index + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarGallery;