import React from "react";
import apiClient from "../Utils/ApiClient/apiClient";

const ItinerarySection = ({ id, isActive, itinerary, onChange, onAdd, onRemove, handleItineraryImageUpload, removeItineraryFile }) => {
  const pairedItineraries = [];
  
  for (let i = 0; i < itinerary.length; i += 2) {
    const en = itinerary.find((item, idx) => item.bahasa === "ENGLISH" && Math.floor(idx / 2) === i / 2);
    const idn = itinerary.find((item, idx) => item.bahasa === "INDONESIA" && Math.floor(idx / 2) === i / 2);
    if (en && idn) {
      pairedItineraries.push({ en, idn, pairIndex: i / 2 });
    }
  }

  // const removeFile = (imageIndex, pairIndex) => {
  //   const updatedFiles = (itinerary[pairIndex * 2].itinerary_files || []).filter((_, i) => i !== imageIndex);
  //   onChange(pairIndex * 2, "itinerary_files", updatedFiles); 
  //   onChange(pairIndex * 2 + 1, "itinerary_files", updatedFiles);
  // };

  const onFieldChange = (pairIndex, bahasa, field, value) => {
    const targetIndex = itinerary.findIndex(
      (item, idx) => item.bahasa === bahasa && Math.floor(idx / 2) === pairIndex
    );

    if (targetIndex !== -1) {
      onChange(targetIndex, field, value);
    }
  };

  const getImageUrl = (image) => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      return url;
    } else if (image && image.url) {
      const imageUrl = image.url.startsWith("http") 
        ? image.url 
        : `${apiClient.defaults.baseURL}/public/${image.url.replace(/\\/g, "/").replace(/^uploads\//, "")}`;
      
      return imageUrl;
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Itinerary</h3>
          <button
            type="button"
            onClick={onAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Destination +
          </button>
        </div>
        <div className="space-y-8">
          {pairedItineraries.map(({ en, idn, pairIndex }, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-2 gap-6 relative">
                {[{ label: "INDONESIA", data: idn }, { label: "ENGLISH", data: en }].map(({ label, data }, langIndex) => (
                  <div key={langIndex}>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">{label}</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2"><span className="text-red-500">*</span> Destination</label>
                        <input
                          type="text"
                          placeholder="e.g. Pantai Kelingking"
                          value={data.nama}
                          onChange={(e) => onFieldChange(pairIndex, label.toUpperCase(), "nama", e.target.value)}
                          className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2"><span className="text-red-500">*</span> Description</label>
                        <textarea
                          placeholder="Description"
                          value={data.deskripsi}
                          onChange={(e) => onFieldChange(pairIndex, label.toUpperCase(), "deskripsi", e.target.value)}
                          className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md h-24"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {pairedItineraries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemove(pairIndex)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="py-6">
                <div className="flex items-center justify-end mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleItineraryImageUpload(pairIndex)}
                    className="hidden"
                    id={`fileUpload-${pairIndex}`}
                    multiple
                  />
                  <label
                    htmlFor={`fileUpload-${pairIndex}`}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md cursor-pointer"
                  >
                    Add Photo +
                  </label>
                </div>

                {(itinerary[pairIndex * 2].itinerary_files || []).length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {itinerary[pairIndex * 2].itinerary_files.map((file, i) => {
                      const isExisting = isExistingImage(file)
                      return (
                        <div key={i} className="relative group">
                          <img
                            src={getImageUrl(file)}
                            alt={`Uploaded ${i + 1}`}
                            className="w-full h-32 object-cover rounded-md border"
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
                            onClick={() => removeItineraryFile(i, pairIndex, file)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItinerarySection;
