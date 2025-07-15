import React, { useState, useEffect } from "react";
import DescriptionSection from "../../../components/AdminDashboard/News/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const defaultContent = [
  { bahasa: "ENGLISH", deskripsi: "", judul: "" },
  { bahasa: "INDONESIA", deskripsi: "", judul: "" },
];

const EditNews = ({ id, isOpen, onClose, onSave }) => {
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(defaultContent);
  const [formData, setFormData] = useState({ category_id: 0, content: defaultContent });
  const [activeSection, setActiveSection] = useState("description");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id || !isOpen) return;
    loadInitialData();
  }, [id, isOpen]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content }));
  }, [content]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [catRes, newsRes] = await Promise.all([
        apiClient.get("/news-category"),
        apiClient.get(`/news/${id}`)
      ]);

      const news = newsRes.data.data;
      const newsContent = news.news_content || defaultContent;

      setCategories(catRes.data.data || []);
      setContent(newsContent);
      setFormData({
        category_id: news.category_id || 0,
        content: newsContent,
      });

      setExistingPhotos((news.news_file || []).map((file) => ({
        ...file,
        fullUrl: `${apiClient.defaults.baseURL}/public/news/${file.nama_file}`,
      })));
    } catch (error) {
      console.error("❌ Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeContent = (index, field, value) => {
    setContent((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setNewPhotos((prev) => [...prev, file]);
  };

  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const removeNewPhoto = (index) =>
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));

  const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/news/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const buildFormData = async () => {
    const payload = new FormData();
    payload.append("category_id", formData.category_id);

    const existingFileObjects = await Promise.all(
      existingPhotos.map((f) => fetchExistingFileAsFile(f.nama_file))
    );
    [...existingFileObjects, ...newPhotos].forEach((file) => {
      payload.append("files", file);
    });

    formData.content.forEach((item, i) => {
      if (item.id) payload.append(`content[${i}][id]`, item.id);
      payload.append(`content[${i}][bahasa]`, item.bahasa);
      payload.append(`content[${i}][judul]`, item.judul);
      payload.append(`content[${i}][deskripsi]`, item.deskripsi);
    });

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = await buildFormData();
      await apiClient.patch(`/news/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("News updated successfully!");
      onSave();
      handleClose();
    } catch (error) {
      toast.error(error.message);
      console.error("Update Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewPhotos([]);
    setActiveSection("description");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 mt-5">
          <h2 className="text-2xl font-semibold text-gray-900">Edit News</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit}>
            <div className="p-6">
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

              <DescriptionSection
                id="description"
                isActive={activeSection === "description"}
                content={formData.content}
                onChangeContent={handleChangeContent}
                handleChange={handleChange}
                categories={categories}
                formData={formData}
              />

              <ImageSection
                id="image"
                isActive={activeSection === "image"}
                existingPhotos={existingPhotos}
                newPhotos={newPhotos}
                handlePhotoUpload={handlePhotoUpload}
                removeExistingPhoto={removeExistingPhoto}
                removeNewPhoto={removeNewPhoto}
              />
            </div>

            <div className="flex justify-end gap-3 px-6 pb-6 bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50"
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
