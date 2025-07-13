import React, { useState, useEffect } from "react";
import DescriptionSection from "../../../components/AdminDashboard/News/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const EditNews = ({ isOpen, onClose, newsData, onSave }) => {
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState([
    { bahasa: "ENGLISH", deskripsi: "", subject: "", category: "" },
    { bahasa: "INDONESIA", deskripsi: "", subject: "", category: "" },
  ]);
  const [formData, setFormData] = useState({
    nama: "",
    news_content: content,
  });
  const [activeSection, setActiveSection] = useState("description");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when modal opens or newsData changes
  useEffect(() => {
    if (newsData && isOpen) {
      // Set initial data based on newsData
      const initialContent = [
        { 
          bahasa: "ENGLISH", 
          deskripsi: newsData.description_en || "", 
          subject: newsData.newssubject || "", 
          category: newsData.newscategory || "" 
        },
        { 
          bahasa: "INDONESIA", 
          deskripsi: newsData.description_id || "", 
          subject: newsData.newssubject || "", 
          category: newsData.newscategory || "" 
        },
      ];
      
      setContent(initialContent);
      setFormData({
        nama: newsData.newssubject || "",
        news_content: initialContent,
      });
      setPhotos([]);
      setActiveSection("description");
    }
  }, [newsData, isOpen]);

  // Update formData when content changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      news_content: content,
    }));
  }, [content]);

  const handleChangeContent = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = new FormData();
    payload.append("nama", formData.nama);

    // Append photos
    photos.forEach((file) => {
      payload.append("files", file);
    });

    // Append news content
    formData.news_content.forEach((item, index) => {
      payload.append(`news_content[${index}][bahasa]`, item.bahasa);
      payload.append(`news_content[${index}][deskripsi]`, item.deskripsi);
      payload.append(`news_content[${index}][subject]`, item.subject);
      payload.append(`news_content[${index}][category]`, item.category);
    });

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the onSave callback with updated data
      const updatedData = {
        ...newsData,
        newssubject: formData.news_content[0].subject,
        newscategory: formData.news_content[0].category,
        description_en: formData.news_content[0].deskripsi,
        description_id: formData.news_content[1].deskripsi,
      };
      
      onSave(updatedData);
      toast.success("News updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update news");
      console.error("Update Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const moveSection = (id) => {
    setActiveSection(id);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotos((prev) => [...prev, file]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    // Reset form when closing
    setPhotos([]);
    setActiveSection("description");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 "
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pl-6 pr-6 mt-5">
          <h2 className="text-2xl font-semibold text-gray-900">Edit News</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Section Navigation */}
              <div className="text-sm text-gray-500 mb-3 flex space-x-5">
                {["description", "image"].map((section) => (
                  <span
                    key={section}
                    className={`cursor-pointer px-1 font-medium underline-item relative ${
                      activeSection === section
                        ? "text-cyan-600 active"
                        : "text-gray-500"
                    } hover:text-cyan-700 group`}
                    onClick={() => moveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                ))}
              </div>

              {/* Description Section */}
              <DescriptionSection
                id="description"
                isActive={activeSection === "description"}
                formData={formData}
                content={formData.news_content}
                onChangeContent={handleChangeContent}
                handleChange={handleChange}
                locations={[]}
                type="news"
              />

              {/* Image Section */}
              <ImageSection
                id="image"
                isActive={activeSection === "image"}
                photos={photos}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 pb-6 bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNews;