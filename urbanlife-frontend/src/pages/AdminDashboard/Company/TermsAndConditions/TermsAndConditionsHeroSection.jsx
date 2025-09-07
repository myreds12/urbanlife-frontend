import React from "react";
import toast from "react-hot-toast";

const TermsAndConditionsHeroSection = ({ id, isActive, formData, handleChange }) => {
  const { title, subtitle, image, existingImage } = formData || {};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size must be less than 5MB.");
        return;
      }
      handleChange("image", file);
      handleChange("existingImage", null);
    }
  };

  const removeImage = () => {
    handleChange("image", null);
  };

  const removeExistingImage = () => {
    handleChange("existingImage", null);
    handleChange("image", null);
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        {/* Title */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
            required
          />
        </div>

        {/* Subtitle */}
        <div className="mb-4 flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Subtitle <span className="text-red-500">*</span>
          </label>
          <textarea
            name="subtitle"
            value={subtitle ?? ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="heroImageUpload"
            />
            <label
              htmlFor="heroImageUpload"
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md cursor-pointer"
            >
              Upload Image
            </label>
          </div>
        </div>

        {/* Preview Uploaded Image */}
        {image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Uploaded Image</label>
            <div className="relative group w-48">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Hero Image"
                className="w-full h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Preview Existing Image */}
        {existingImage && !image && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Existing Image</label>
            <div className="relative group w-48">
              <img
                src={existingImage}
                alt="Existing Hero Image"
                className="w-full h-32 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={removeExistingImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-80 hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditionsHeroSection;