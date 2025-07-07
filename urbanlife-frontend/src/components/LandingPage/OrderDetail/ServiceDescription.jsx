import { useState } from "react";

const ServiceDescription = ({ contentData = [] }) => {
  const [language, setLanguage] = useState("ENGLISH");

  const currentContent = contentData.find(
    (item) => item.bahasa.toUpperCase() === language
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">
          {language === "ENGLISH" ? "Description" : "Deskripsi"}
        </h2>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded border text-sm font-medium ${
              language === "ENGLISH"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setLanguage("ENGLISH")}
          >
            English
          </button>
          <button
            className={`px-3 py-1 rounded border text-sm font-medium ${
              language === "INDONESIA"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setLanguage("INDONESIA")}
          >
            Indonesia
          </button>
        </div>
      </div>

      {currentContent ? (
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>{currentContent.deskripsi}</p>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {language === "ENGLISH" ? "Policy and Procedure" : "Kebijakan dan Prosedur"}:
            </h3>
            <p>{currentContent.kebijakan}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No content available in selected language.</p>
      )}
    </div>
  );
};

export default ServiceDescription;
