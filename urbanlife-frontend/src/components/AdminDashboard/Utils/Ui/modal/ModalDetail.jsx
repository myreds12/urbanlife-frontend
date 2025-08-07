import React, { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import apiClient from "../../ApiClient/apiClient";

const ModalView = ({
  isOpen,
  onClose,
  title = "Detail Unit",
  data = {},
  config = {},
  images = [],
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const [previewImage, setPreviewImage] = useState(null);
  const scrollRef = useRef();

  if (!isOpen) return null;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const renderFieldValue = (field, value) => {
    if (field.type === "language-toggle" && value) {
      console.log(value, "value");
      // Handle itinerary as ordered list (array of objects)
      if (field.key === "itinerary" && typeof value === "object") {
        const list = value[currentLanguage] || [];
        return list.length > 0 ? (
          <ol className="text-gray-700 list-decimal list-inside space-y-2">
            {list.map((item, index) => (
              <li key={index} className="py-1">
                <strong>{item.destination}</strong>: {item.description}
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-gray-500">-</div>
        );
      }

      // 1b. Deskripsi (String by language)
      if (field.key === "deskripsi" && typeof value === "object") {
        const text = value[currentLanguage] || "-";
        return (
          <div className="min-h-[100px] text-gray-700 whitespace-pre-line">
            {text}
          </div>
        );
      }

      // Handle facility as list
      // if (
      //   field.key === "facility" &&
      //   typeof value === "object" &&
      //   value[currentLanguage]
      // ) {
      //   return Array.isArray(value[currentLanguage]) &&
      //     value[currentLanguage].length > 0 ? (
      //     <ul className="text-gray-700 list-disc list-inside space-y-2">
      //       {value[currentLanguage].map((item, index) => (
      //         <li key={index} className="py-1">
      //           {item}
      //         </li>
      //       ))}
      //     </ul>
      //   ) : (
      //     <div className="text-gray-500">-</div>
      //   );
      // }

      // // Handle price
      // if (field.key === "price" && typeof value === "object") {
      //   const items = [];
      //   if (value.harga_anak) {
      //     items.push(
      //       `Harga Anak: Rp${Number(value.harga_anak).toLocaleString("id-ID")}`
      //     );
      //   }
      //   if (value.harga_dewasa) {
      //     items.push(
      //       `Harga Dewasa: Rp${Number(value.harga_dewasa).toLocaleString(
      //         "id-ID"
      //       )}`
      //     );
      //   }

      //   const targetValue = field.languageKey
      //     ? data[field.languageKey] // <--- ambil langsung dari mappedData
      //     : value;

      //   const text =
      //     currentLanguage === "indonesia"
      //       ? targetValue?.indonesia?.trim()
      //       : targetValue?.english?.trim();

      //   console.log(text, "text");

      //   return (
      //     <div className="min-h-[100px] text-gray-700 whitespace-pre-line">
      //       {text ? text : <div className="text-gray-500">-</div>}
      //     </div>
      //   );
      // }

      const text =
        currentLanguage === "indonesia"
          ? value?.indonesia?.trim()
          : value?.english?.trim();

      return (
        <div className="min-h-[100px] text-gray-700 whitespace-pre-line">
          {text ? text : <div className="text-gray-500">-</div>}
        </div>
      );
    }

    if (field.key === "facility" && Array.isArray(value)) {
      return value.length > 0 ? (
        <ul className="text-gray-700 list-disc list-inside space-y-2">
          {value.map((item, index) => (
            <li key={index} className="py-1">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">-</div>
      );
    }

    if (field.key === "room_and_price" && Array.isArray(value)) {
      return value.length > 0 ? (
        <ol className="text-gray-700 list-decimal list-inside space-y-2">
          {value.map((item, index) => (
            <li key={index}>
              <strong>{item.destination}</strong>: {item.description}
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-gray-500">-</div>
      );
    }

    if (["harga_anak", "harga_dewasa"].includes(field.key)) {
      return (
        <span className="text-gray-700">
          Rp{Number(value).toLocaleString("id-ID")}
        </span>
      );
    }

    if (field.type === "boolean") {
      return (
        <span
          className={`inline-block px-2 py-1 text-sm rounded ${
            value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {value ? "Aktif" : "Tidak Aktif"}
        </span>
      );
    }

    if (field.key === "kendaraan_durasi" && Array.isArray(value)) {
      return (
        <ul className="text-gray-700 list-disc list-inside space-y-2">
          {value.map((item) => (
            <li key={item.id}>
              {item.durasi}: Rp{Number(item.harga).toLocaleString("id-ID")}
            </li>
          ))}
        </ul>
      );
    }

    if (field.key === "lokasi" && value && value.nama) {
      return <span className="text-gray-700">{value.nama}</span>;
    }

    if (typeof value === "string" || typeof value === "number") {
      return <span className="text-gray-700">{value}</span>;
    }

    return <span className="text-gray-500">-</span>;
  };

  const handleImageClick = (imageUrl) => {
    console.log("Image clicked:", imageUrl);

    setPreviewImage(
      `${apiClient.defaults.baseURL}/public/${imageUrl.url
        .replace(/\\/g, "/")
        .replace(/^uploads\//, "")}`
    );
  };

  const handlePreviewClose = () => {
    setPreviewImage(null);
  };

  return (
    <>
      ``
      {/* Main Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={onClose}
      >
        <div
          className="bg-gray-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pt-6 pl-6 pr-6">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Images Section */}
            {images && images.length > 0 && (
              <div className="">
                <div className="relative">
                  <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-2"
                  >
                    {images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 snap-start">
                        <div
                          className="w-64 aspect-video bg-white p-1 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        >
                          <img
                            src={`${
                              apiClient.defaults.baseURL
                            }/public/${image.url
                              .replace(/\\/g, "/")
                              .replace(/^uploads\//, "")}`}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  {images.length > 3 && (
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={scrollLeft}
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={scrollRight}
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Fields Section */}
            {config.sections &&
              config.sections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {section.fields.map((field, fieldIndex) => {
                    const isLangToggle = field.type === "language-toggle";
                    const fieldValue = data[field.key];

                    return (
                      <div key={fieldIndex}>
                        <div className="flex items-start gap-5 mb-4">
                          <div
                            className="block text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-md"
                            style={{ minWidth: "190px" }}
                          >
                            {field.label}
                            {isLangToggle && (
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() =>
                                    setCurrentLanguage("indonesia")
                                  }
                                  className={`px-3 py-1 rounded text-sm font-medium ${
                                    currentLanguage === "indonesia"
                                      ? "bg-cyan-500 text-white"
                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  }`}
                                >
                                  Indonesia
                                </button>
                                <button
                                  onClick={() => setCurrentLanguage("english")}
                                  className={`px-3 py-1 rounded text-sm font-medium ${
                                    currentLanguage === "english"
                                      ? "bg-cyan-500 text-white"
                                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                  }`}
                                >
                                  English
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="bg-white px-4 py-2 shadow-md rounded-md">
                            {renderFieldValue(field, fieldValue)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Fullscreen Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60]  flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          onClick={handlePreviewClose}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePreviewClose}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalView;
