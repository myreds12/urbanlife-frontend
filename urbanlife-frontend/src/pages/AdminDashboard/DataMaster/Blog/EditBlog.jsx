import React, { useState, useEffect, useContext } from "react";
import DescriptionSection from "../../../../components/AdminDashboard/News/DescriptionSection";
import ImageSection from "../../../../components/AdminDashboard/DayTour/ImageSection";
import { BlogContext } from "./BlogProvider";

const EditBlog = ({ id, isOpen, onClose, onSave, blogData }) => {
  const { categories } = useContext(BlogContext);
  const [photos, setPhotos] = useState(blogData?.files || []);
  const [activeSection, setActiveSection] = useState("description");
  const [content, setContent] = useState(
    blogData?.content || [
      { bahasa: "ENGLISH", judul: "", deskripsi: "" },
      { bahasa: "INDONESIA", judul: "", deskripsi: "" },
    ]
  );
  const [formData, setFormData] = useState({
    category: blogData?.category || "",
    content: content,
    date: blogData?.date || new Date().toISOString().split("T")[0],
    slug: blogData?.slug || "",
    location: blogData?.location || "",
  });

  useEffect(() => {
    if (id && isOpen && blogData) {
      setContent(blogData.content || [
        { bahasa: "ENGLISH", judul: "", deskripsi: "" },
        { bahasa: "INDONESIA", judul: "", deskripsi: "" },
      ]);
      setPhotos(blogData.files || []);
      setFormData({
        category: blogData.category || "",
        content: blogData.content || [
          { bahasa: "ENGLISH", judul: "", deskripsi: "" },
          { bahasa: "INDONESIA", judul: "", deskripsi: "" },
        ],
        date: blogData.date || new Date().toISOString().split("T")[0],
        slug: blogData.slug || "",
        location: blogData.location || "",
      });
    }
  }, [id, isOpen, blogData]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content }));
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeContent = (index, field, value) => {
    setContent((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      if (index === 0 && field === "judul") {
        setFormData((prev) => ({
          ...prev,
          slug: slugify(value, { lower: true, strict: true }),
        }));
      }
      return updated;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotos((prev) => [...prev, { nama_file: file.name, fullUrl: URL.createObjectURL(file) }]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      id: id || Date.now(),
      files: photos,
    };
    onSave(updatedData);
  };

  const handleClose = () => {
    setPhotos([]);
    setActiveSection("description");
    setContent([
      { bahasa: "ENGLISH", judul: "", deskripsi: "" },
      { bahasa: "INDONESIA", judul: "", deskripsi: "" },
    ]);
    setFormData({
      category: "",
      content: content,
      date: new Date().toISOString().split("T")[0],
      slug: "",
      location: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 mt-5">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Blog</h2>
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
                      activeSection === section ? "text-cyan-600 active" : "text-gray-500"
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
                formData={formData}
                content={content}
                onChangeContent={handleChangeContent}
                handleChange={handleChange}
                categories={categories}
              />
              <ImageSection
                id="image"
                isActive={activeSection === "image"}
                photos={photos}
                handlePhotoUpload={handlePhotoUpload}
                removePhoto={removePhoto}
              />
              <div className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    placeholder="Masukkan slug blog"
                    required
                    pattern="[a-z0-9-]+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lokasi (Opsional)</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    placeholder="Masukkan lokasi"
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6 bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;