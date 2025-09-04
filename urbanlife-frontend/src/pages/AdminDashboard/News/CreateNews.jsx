import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/News/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

function CreateNews() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState([
    { id: null, bahasa: "ENGLISH", deskripsi: "", judul: "" },
    { id: null, bahasa: "INDONESIA", deskripsi: "", judul: "" },
  ]);

  const [formData, setFormData] = useState({
    category_id: 0,
    content: content,
  });

  const fetchCategories = async () => {
    try {
      const { data } = await apiClient.get("/news-category");
      console.log(data, "categories");
      setCategories(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch categories", error);
    }
  };

  const fetchNewsData = async () => {
    try {
      const { data } = await apiClient.get(`/news/${id}`);
      const news = data.data;
      setFormData({
        category_id: news.category_id || 0,
        content: news.news_content || content,
      });
      setContent(
        news.news_content || [
          { id: null, bahasa: "ENGLISH", deskripsi: "", judul: "" },
          { id: null, bahasa: "INDONESIA", deskripsi: "", judul: "" },
        ]
      );
      setExistingPhotos(
        (news.news_file || []).map((file) => ({
          id: file.id,
          url: `${apiClient.defaults.baseURL}/public/${file.url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`,
          nama_file: file.nama_file,
        }))
      );
    } catch (error) {
      toast.error("Failed to fetch news data.");
      console.error("❌ Failed to fetch news data", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchNewsData();
    }
  }, [isEditMode, id]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  }, [content]);

  const [activeSection, setActiveSection] = useState("description");

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

    const payload = new FormData();
    payload.append("category_id", formData.category_id);

    // Append photos
    photos.forEach((file) => {
      payload.append("files", file);
    });

    if (isEditMode) {
      existingPhotos.forEach((photo) => {
        payload.append("existing_file_ids[]", photo.id);
      });
    }

    // Append news content
    formData.content.forEach((item, index) => {
      if (item.id) payload.append(`content[${index}][id]`, item.id);
      payload.append(`content[${index}][bahasa]`, item.bahasa);
      payload.append(`content[${index}][deskripsi]`, item.deskripsi);
      payload.append(`content[${index}][judul]`, item.judul);
    });

    console.log("=== Payload yang akan dikirim ke API ===");
    for (let pair of payload.entries()) {
      if (pair[1] instanceof File) {
        console.log(pair[0], pair[1].name);
      } else {
        console.log(pair[0], pair[1]);
      }
    }
    console.log("========================================");

    try {
      const response = isEditMode
        ? await apiClient.patch(`/news/${id}`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await apiClient.post("/news", payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode
            ? "News updated successfully!"
            : "News created successfully!"
        );
        navigate("/admin/news");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Submission Error:", error);
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

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  };

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
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            />
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
              Save
            </button>
          </div>
        </main>
      </div>
    </form>
  );
}

export default CreateNews;