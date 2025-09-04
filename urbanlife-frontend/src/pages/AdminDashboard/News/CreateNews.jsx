import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/News/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

function CreateNews() {
  const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari url
  const isEditMode = Boolean(id); // true kalau edit
  const [loading, setLoading] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  console.log(existingPhotos, "existingPhotos");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState([
    { bahasa: "ENGLISH", deskripsi: "", judul: "" },
    { bahasa: "INDONESIA", deskripsi: "", judul: "" },
  ]);

  const [formData, setFormData] = useState({
    category_id: 0,
    content: content,
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await apiClient.get("/news-category");
      setCategories(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch categories", error);
    }
  };

  // Fetch detail kalau edit
  const fetchNewsDetail = async () => {
    if (!isEditMode) return;
    setLoading(true);
    try {
      const { data } = await apiClient.get(`/news/${id}`);
      console.log(data.data);
      const news = data.data;

      setFormData({
        category_id: news.category_id,
        content: news.news_content.map((item) => ({
          bahasa: item.bahasa,
          deskripsi: item.deskripsi,
          judul: item.judul,
        })),
      });
      setExistingPhotos((news.news_file || []).map((file) => ({
        ...file,
        url: `${apiClient.defaults.baseURL}/public/news/${file.nama_file}`,
      })));

      setContent(news.news_content);
    } catch (error) {
      console.error("❌ Failed to fetch news detail", error);
      toast.error("Failed to load news detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewsDetail();
  }, [id]);

  // Sinkronisasi content ke formData
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      content: content,
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

    const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/news/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("category_id", formData.category_id);

    // Append photos
    const existingFileObjects = await Promise.all(
      existingPhotos.map((f) => fetchExistingFileAsFile(f.nama_file))
    );
    [...existingFileObjects, ...photos].forEach((file) => {
      payload.append("files", file);
    });

    // Append news content
    formData.content.forEach((item, index) => {
      if(item.id) payload.append(`content[${index}][id]`, item.id);
      payload.append(`content[${index}][bahasa]`, item.bahasa);
      payload.append(`content[${index}][deskripsi]`, item.deskripsi);
      payload.append(`content[${index}][judul]`, item.judul);
    });

    try {
      let response;
      if (isEditMode) {
        response = await apiClient.patch(`/news/${id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("News updated successfully!");
      } else {
        response = await apiClient.post("/news", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("News created successfully!");
      }

      navigate("/admin/news");
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Failed to save news");
    }
  };

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotos((prev) => [...prev, file]);
    }
  };

  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const [activeSection, setActiveSection] = useState("description");

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit News" : "Create News"}
            </h2>

            <div className="text-md text-gray-500 mb-6 flex space-x-5">
              {["description", "image"].map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${
                    activeSection === section
                      ? "text-cyan-600 active"
                      : "text-gray-500"
                  }`}
                  onClick={() => moveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
              ))}
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <DescriptionSection
                  id="description"
                  isActive={activeSection === "description"}
                  formData={formData}
                  content={formData.content}
                  onChangeContent={handleChangeContent}
                  handleChange={handleChange}
                  categories={categories}
                />

               <ImageSection
                id="image"
                isActive={activeSection === "image"}
                existingPhotos={existingPhotos}
                photos={photos}
                handlePhotoUpload={handlePhotoUpload}
                removeExistingPhoto={removeExistingPhoto}
                removePhoto={removePhoto}
              />
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/news">
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
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </main>
      </div>
    </form>
  );
}

export default CreateNews;
