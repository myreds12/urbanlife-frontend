// CreateBlog.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { BlogContext } from "./BlogProvider";
import BlogDescriptionSection from "./BlogDescriptionSection";
import BlogImageSection from "./BlogImageSection";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { blogData, setBlogData, categories } = useContext(BlogContext);
  const [photos, setPhotos] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [content, setContent] = useState([
    { bahasa: "ENGLISH", judul: "", deskripsi: "" },
    { bahasa: "INDONESIA", judul: "", deskripsi: "" },
  ]);
  const [formData, setFormData] = useState({
    category: "",
    content: content,
    date: new Date().toISOString().split("T")[0],
    slug: "",
    location: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content }));
  }, [content]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "content[0].judul" ? { slug: slugify(value, { lower: true, strict: true }) } : {}),
    }));
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
      setPhotos((prev) => [...prev, file]);
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
    const newBlog = {
      id: Date.now(),
      category: formData.category,
      content: content,
      files: photos.map((file) => ({
        nama_file: file.name,
        fullUrl: URL.createObjectURL(file),
      })),
      date: formData.date,
      slug: formData.slug || slugify(content[0]?.judul || "blog", { lower: true, strict: true }),
      location: formData.location,
    };
    setBlogData((prev) => [...prev, newBlog]);
    alert("Blog berhasil dibuat!");
    navigate("/admin/blog");
  };

  return (
    <div className="flex h-screen">
      <main className="p-1 flex-1">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Buat Blog</h2>
          <div className="text-md text-gray-500 mb-6 flex space-x-5">
            {["description", "image"].map((section) => (
              <span
                key={section}
                className={`cursor-pointer px-1 font-medium underline-item relative ${
                  activeSection === section ? "text-cyan-600 active" : "text-gray-500"
                }`}
                onClick={() => moveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <BlogDescriptionSection
              id="description"
              isActive={activeSection === "description"}
              formData={formData}
              content={content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              categories={categories}
            />
            <BlogImageSection
              id="image"
              isActive={activeSection === "image"}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
            />
            {activeSection === "description" && (
              <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mt-6 space-y-4">
                <div className="flex items-center gap-5">
                  <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500"
                    required
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500"
                    placeholder="Enter blog slug"
                    required
                    pattern="[a-z0-9-]+"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-cyan-500"
                    placeholder="Enter location"
                    maxLength={100}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-3 px-6 pb-6 mt-5">
              <Link to="/admin/blog">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateBlog;