// CreateBlog.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import { BlogContext } from "./BlogProvider";
import BlogDescriptionSection from "./BlogDescriptionSection";
import BlogImageSection from "./BlogImageSection";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

const defaultContent = [
  { id: null, bahasa: "ENGLISH", judul: "", deskripsi: "" },
  { id: null, bahasa: "INDONESIA", judul: "", deskripsi: "" },
];

const CreateBlog = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [content, setContent] = useState(defaultContent);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    category_id: 0,
    content: defaultContent,
    slug: "",
    lokasi_id: 0,
  });

  

  console.log("== FormData saat ini:", formData);
  console.log("content", content);

  // --- Fetch ---
  const fetchCategories = async () => {
    try {
      const { data } = await apiClient.get("/category");
      setCategories(data.data || []);
    } catch (error) {
      console.error("❌ Gagal memuat kategori", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const { data } = await apiClient.get("/lokasi");
      setLocations(data.data || []);
    } catch (error) {
      console.error("❌ Gagal memuat lokasi", error);
    }
  };

  const fetchBlogById = async (blogId) => {
    try {
      const { data } = await apiClient.get(`/blog/${blogId}`);
      const blog = data.data;

      setFormData({
        category_id: blog.category_id || 0,
        slug: blog.slug || "",
        lokasi_id: blog.lokasi_id || 0,
      });

      setContent(blog.blog_content || defaultContent);
      setExistingPhotos(
            (blog.blog_file || []).map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
            }))
          );
    } catch (error) {
      console.error("❌ Gagal memuat blog untuk diedit:", error);
      toast.error("Gagal memuat data blog");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
    if (isEditMode) fetchBlogById(id);
  }, [id]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content }));
  }, [content]);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "content[0].judul"
        ? { slug: slugify(value, { lower: true, strict: true }) }
        : {}),
    }));
  };

  const handleChangeContent = (index, field, value) => {
    setContent((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      if (index === 0 && field === "judul") {
        setFormData((prevForm) => ({
          ...prevForm,
          slug: slugify(value, { lower: true, strict: true }),
        }));
      }
      return updated;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotos((prev) => [...prev, file]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

   const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("category_id", formData.category_id);
    form.append("lokasi_id", formData.lokasi_id);
    form.append("slug", formData.slug);

    content.forEach((item, i) => {
      form.append(`content[${i}][judul]`, item.judul);
      form.append(`content[${i}][bahasa]`, item.bahasa);
      form.append(`content[${i}][deskripsi]`, item.deskripsi);
    });

    photos.forEach((file) => form.append("files", file));

    try {
      if (isEditMode) {
        await apiClient.patch(`/blog/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog berhasil diperbarui!");
      } else {
        await apiClient.post("/blog", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog berhasil dibuat!");
      }
      navigate("/admin/blog");
    } catch (error) {
      console.error("❌ Gagal menyimpan blog:", error);
      toast.error("Terjadi kesalahan saat menyimpan blog.");
    }
  };

  // --- UI ---
  return (
    <div className="flex h-screen">
      <main className="p-1 flex-1">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">
            {isEditMode ? "Edit Blog" : "Buat Blog"}
          </h2>
          <div className="text-md text-gray-500 mb-6 flex space-x-5">
            {["description", "image"].map((section) => (
              <span
                key={section}
                onClick={() => moveSection(section)}
                className={`cursor-pointer px-1 font-medium underline-item relative ${
                  activeSection === section
                    ? "text-cyan-600 active"
                    : "text-gray-500"
                }`}
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
              existingPhotos={existingPhotos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              removeExistingPhoto={removeExistingPhoto}
            />

            {activeSection === "description" && (
              <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mt-6 space-y-4">
                <div className="flex items-center gap-5">
                  <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                    pattern="[a-z0-9-]+"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md" style={{ minWidth: "90px" }}>
                    Lokasi
                  </label>
                  <select
                    name="lokasi_id"
                    value={formData.lokasi_id}
                    onChange={handleChange}
                    className="input input-bordered w-full py-1 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <option value="">-- Pilih Lokasi --</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.nama}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 px-6 pb-6 mt-5">
              <Link to="/admin/blog">
                <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                  Batal
                </button>
              </Link>
              <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                {isEditMode ? "Perbarui" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateBlog;
