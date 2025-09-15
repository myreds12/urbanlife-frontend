import React from "react";

const AboutUsCTASection = ({ id, isActive, cta, handleCtaChange }) => {
  // Helper to handle phone number input for WhatsApp links
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    handleCtaChange({
      target: {
        name: "button_link",
        value: `https://wa.me/+62${phoneNumber}`,
      },
    });
  };

  // Extract phone number from WhatsApp link for display
  const getPhoneNumber = (link) => {
    return link.replace("https://wa.me/+62", "");
  };

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-md shadow-md shadow-black/20">
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
                  CTA Title (EN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={cta.title_en}
                  onChange={handleCtaChange}
                  placeholder="Enter CTA title in English..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* desc - en */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description_en"
                  value={cta.description_en}
                  onChange={handleCtaChange}
                  placeholder="Enter CTA description in English..."
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
                  CTA Title (ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title_id"
                  value={cta.title_id}
                  onChange={handleCtaChange}
                  placeholder="Masukkan judul CTA dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
                  required
                />
              </div>

              {/* desc - id */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (ID) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description_id"
                  value={cta.description_id}
                  onChange={handleCtaChange}
                  placeholder="Masukkan deskripsi CTA dalam bahasa Indonesia..."
                  className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500 h-24"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact & CTA Buttons Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {/* KIRI: CTA Button Text + CTA Button Link */}
      <div className="space-y-4">
        {/* CTA Button Text */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            CTA Button Text
          </label>
          <input
            type="text"
            name="cta_button_text"
            value={cta.cta_button_text}
            onChange={handleCtaChange}
            placeholder="Enter CTA button text..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>

        {/* CTA Button Link */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            CTA Button Link
          </label>
          <input
            type="text"
            name="cta_button_link"
            value={cta.cta_button_link}
            onChange={handleCtaChange}
            placeholder="Enter CTA button URL (e.g., /booking)..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* KANAN: Contact Us Button Text + Contact Us Button Link */}
      <div className="space-y-4">
        {/* Contact Us Button Text */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Contact Us Button Text
          </label>
          <input
            type="text"
            name="button_text"
            value={cta.button_text}
            onChange={handleCtaChange}
            placeholder="Enter button text..."
            className="py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
          />
        </div>

        {/* Contact Us Button Link */}
        <div className="flex items-center">
          <label
            className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
            style={{ minWidth: "190px" }}
          >
            Contact Us Button Link (WhatsApp)
          </label>
          <div className="flex w-full rounded-md border border-gray-300 focus-within:ring-cyan-500 focus-within:border-cyan-500">
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 border-r border-gray-300 rounded-l-md">
              https://wa.me/+62
            </span>
            <input
              type="text"
              name="button_link"
              value={getPhoneNumber(cta.button_link || "https://wa.me/+62")}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number (e.g., 81234567890)"
              className="py-1 px-3 w-full rounded-r-md border-0 focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
  );
};

export default AboutUsCTASection;