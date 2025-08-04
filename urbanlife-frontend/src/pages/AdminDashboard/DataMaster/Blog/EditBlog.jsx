import React, { useState, useEffect, useContext } from "react";
import ModalEdit from "../../../../components/AdminDashboard/Utils/Ui/modal/ModalEdit";
import { BlogContext } from "./BlogProvider";
import BlogImageSection from "./BlogImageSection";

const EditBlog = ({ id, isOpen, onClose, onSave, blogData }) => {
  const { categories } = useContext(BlogContext);
  const [photos, setPhotos] = useState(blogData?.files || []);
  const [formData, setFormData] = useState({
    category: blogData?.category || "",
    content: blogData?.content || [
      { bahasa: "ENGLISH", judul: "", deskripsi: "" },
      { bahasa: "INDONESIA", judul: "", deskripsi: "" },
    ],
    date: blogData?.date || new Date().toISOString().split("T")[0],
    slug: blogData?.slug || "",
    location: blogData?.location || "",
  });

  useEffect(() => {
    if (isOpen && blogData) {
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
      setPhotos(blogData.files || []);
    }
  }, [isOpen, blogData]);

  const handleChangeContent = (index, field, value) => {
    setFormData((prev) => {
      const updatedContent = [...prev.content];
      updatedContent[index][field] = value;
      if (index === 0 && field === "judul") {
        return {
          ...prev,
          content: updatedContent,
          slug: slugify(value, { lower: true, strict: true }),
        };
      }
      return { ...prev, content: updatedContent };
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

  const fields = [
    { name: "category", label: "Kategori", type: "select", options: categories, required: true },
    { name: "content[0].judul", label: "Judul (English)", required: true },
    { name: "content[0].deskripsi", label: "Deskripsi (English)", type: "textarea", required: true },
    { name: "content[1].judul", label: "Judul (Indonesia)", required: true },
    { name: "content[1].deskripsi", label: "Deskripsi (Indonesia)", type: "textarea", required: true },
    { name: "date", label: "Tanggal", type: "date", required: true },
    { name: "slug", label: "Slug", required: true, pattern: "[a-z0-9-]+" }, // Perbaiki pattern
    { name: "location", label: "Lokasi (Opsional)" },
  ];

  const handleSave = (data) => {
    const updatedData = {
      ...data,
      id: id || Date.now(),
      files: photos,
      content: [
        { bahasa: "ENGLISH", judul: data["content[0].judul"], deskripsi: data["content[0].deskripsi"] },
        { bahasa: "INDONESIA", judul: data["content[1].judul"], deskripsi: data["content[1].deskripsi"] },
      ],
    };
    onSave(updatedData);
  };

  return (
      <ModalEdit
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        title="Edit Blog"
        data={formData}
        fields={fields}
        isLoading={false}
      >
        <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mt-6 space-y-4">
          <BlogImageSection photos={photos} handlePhotoUpload={handlePhotoUpload} removePhoto={removePhoto} />
        </div>
      </ModalEdit>
  );
};

export default EditBlog;