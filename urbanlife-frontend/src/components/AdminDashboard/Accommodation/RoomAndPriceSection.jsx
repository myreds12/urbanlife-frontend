import React from "react";

const RoomAndPriceSection = ({ id, isActive, roomPrices, onChange, onAdd, onRemove }) => {
  const handleImageUpload = (index, files) => {
    const newImages = Array.from(files);
    onChange(index, "images", [...(roomPrices[index].images || []), ...newImages]);
  };

  const removeImage = (roomIndex, imageIndex) => {
    const updatedImages = roomPrices[roomIndex].images.filter((_, i) => i !== imageIndex);
    onChange(roomIndex, "images", updatedImages);
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pricing & Images</h3>
          <button
            type="button"
            onClick={onAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Room +
          </button>
        </div>

        <div className="space-y-6">
          {roomPrices.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-md shadow-sm"
            >
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Room Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(index, e.target.files)}
                  className="hidden"
                  id={`imageUpload-${index}`}
                />
                <label
                  htmlFor={`imageUpload-${index}`}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded-md inline-block"
                >
                  Add Image +
                </label>
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {item.images?.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Room ${item.nama} Image ${imgIndex + 1}`}
                        className="w-40 h-40 object-cover rounded-md"
                      />
                      <button
                        onClick={() => removeImage(index, imgIndex)}
                        className="absolute top-0 right-5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[110px] text-center">
                  Room <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Deluxe"
                  required
                  value={item.nama}
                  onChange={(e) => onChange(index, "nama", e.target.value)}
                  className="py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md w-full"
                />
                <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[74px] text-center">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="IDR 1,000,000"
                  required
                  value={item.harga}
                  onChange={(e) => onChange(index, "harga", e.target.value)}
                  className="py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAndPriceSection;