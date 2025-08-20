import React from "react";
import apiClient from "../Utils/ApiClient/apiClient";

const RoomAndPriceSection = ({
  id,
  isActive,
  roomPrices,
  onChange,
  onAdd,
  onRemove,
  handleRoomImageUpload,
}) => {
  const removeImage = (roomIndex, imageIndex, isExistingImage = false) => {
    if (isExistingImage) {
      // Untuk gambar yang sudah ada di server, set flag untuk dihapus
      const updatedImages =
        roomPrices[roomIndex].images?.map((img, i) =>
          i === imageIndex ? { ...img, toBeDeleted: true } : img
        ) || [];
      onChange(roomIndex, "images", updatedImages);
    } else {
      // Untuk gambar baru yang belum diupload
      const updatedImages =
        roomPrices[roomIndex].images?.filter((_, i) => i !== imageIndex) || [];
      onChange(roomIndex, "images", updatedImages);
    }
  };

  const getImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (image.url) {
      return `${apiClient.defaults.baseURL}/public/${image.url
        .replace(/\\/g, "/")
        .replace(/^uploads\//, "")}`;
    }
    return "";
  };

  const isExistingImage = (image) => {
    return (
      image && typeof image === "object" && image.id && !(image instanceof File)
    );
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
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Room Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleRoomImageUpload(index)}
                  className="hidden"
                  id={`imageUpload-${index}`}
                />
                <label
                  htmlFor={`imageUpload-${index}`}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded-md inline-block cursor-pointer mb-4"
                >
                  Add Image +
                </label>

                <div className="grid grid-cols-5 gap-4 mt-4">
                  {item.images?.map((image, imgIndex) => {
                    if (image.toBeDeleted) return null;

                    const imageUrl = getImageUrl(image);
                    const isExisting = isExistingImage(image);

                    return (
                      <div key={imgIndex} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Room ${item.nama} Image ${imgIndex + 1}`}
                          className="w-40 h-40 object-cover rounded-md"
                          onLoad={() => {
                            if (image instanceof File) {
                              URL.revokeObjectURL(imageUrl);
                            }
                          }}
                        />
                        {isExisting && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                            <span className="text-white text-xs">
                              Existing Image
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index, imgIndex, isExisting)
                          }
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transform translate-x-1/2 -translate-y-1/2"
                          title={
                            isExisting ? "Mark for deletion" : "Remove image"
                          }
                        >
                          ×
                        </button>
                        {isExisting && (
                          <span className="absolute top-0 left-0 bg-gray-600 text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
                            Existing
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {item.images?.some((img) => img.toBeDeleted) && (
                  <div className="mt-2 text-sm text-orange-600">
                    Some images are marked for deletion. They will be removed
                    when you save.
                  </div>
                )}
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
                  type="number"
                  placeholder="1000000"
                  required
                  value={item.harga}
                  onChange={(e) =>
                    onChange(index, "harga", parseInt(e.target.value) || 0)
                  }
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

              {item.images?.some((img) => img.toBeDeleted) && (
                <input
                  type="hidden"
                  name={`room-${index}-images-to-delete`}
                  value={item.images
                    .filter((img) => img.toBeDeleted && img.id)
                    .map((img) => img.id)
                    .join(",")}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAndPriceSection;
