import React from "react";
import toast from "react-hot-toast";

const TermsAndConditionsHeroSection = ({
  id,
  isActive,
  formData,
  handleChange,
}) => {
  const { title_en, title_id, subtitle_en, subtitle_id, image, existingImage } =
    formData || {};

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* English Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              English Content
            </h3>

            <div className="space-y-4">
            {/* title - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={title_en ?? ""}
                  onChange={(e) => handleChange("title_en", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
            {/* subtitle - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="subtitle_en"
                  value={subtitle_en ?? ""}
                  onChange={(e) => handleChange("subtitle_en", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>



          {/* Indonesian Section */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-cyan-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              Indonesian Content
            </h3>

            <div className="space-y-4">
            {/* title - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={title_id ?? ""}
                  onChange={(e) => handleChange("title_id", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>
            {/* subtitle - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle (ID) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="subtitle_id"
                  value={subtitle_id ?? ""}
                  onChange={(e) => handleChange("subtitle_id", e.target.value)}
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
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
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Uploaded Image  :
              </label>
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
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Existing Image
              </label>
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
    </div>
  );
};

export default TermsAndConditionsHeroSection;
