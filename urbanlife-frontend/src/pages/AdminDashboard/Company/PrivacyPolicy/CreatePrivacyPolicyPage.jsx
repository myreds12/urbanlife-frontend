import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivacyPolicyHeroSection from "./PrivacyPolicyHeroSection";
import PrivacyPolicyContentSection from "./PrivacyPolicyContentSection";
import PrivacyPolicyContactSection from "./PrivacyPolicyContactSection";
import toast from "react-hot-toast";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CreatePrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [activeSection, setActiveSection] = useState("hero");
  const [sections] = useState([
    { id: "hero", type: "hero" },
    { id: "content", type: "content" },
    { id: "contact", type: "contact" },
  ]);

  const [formData, setFormData] = useState({
    hero: { title_en: "", title_id: "", subtitle_en: "", subtitle_id: "" },
    content: { title_en: "", title_id: "", content_en: "", content_id: "" },
    contact: { title_en: "", title_id: "", email: "", phone: "" },
  });

  // console.log(formData, "formData");

  // 🟢 Fetch initial data saat edit
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!isEditMode) return;
      try {
        const { data } = await apiClient.get(`/privacyandpolicy/${id}`);
        const section = data.data || {};

        setFormData({
          hero: section.hero || { title_en: section.title_en, title_id: section.title_id, subtitle_en: "", subtitle_id: "" },
          content: section.content || { title_en: section.title_en, title_id: section.title_id, content_en: section.content_en, content_id: section.content_id },
          contact: section.contact || { title_en: section.title_en, title_id: section.title_id, email: section.contact_email, phone: section.contact_phone },
        });
 
      } catch (error) {
        toast.error("Gagal memuat data.");
        console.error(error);
      }
    };
    fetchInitialData();
  }, [isEditMode, id]);

  const handleChange = (sectionId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (
      !formData.hero.title_en ||
      !formData.hero.title_id ||
      !formData.contact.email ||
      !formData.contact.phone
    ) {
      toast.error("Field wajib (title EN/ID, email, phone) tidak boleh kosong.");
      return;
    }
    if (!emailRegex.test(formData.contact.email)) {
      toast.error("Format email tidak valid.");
      return;
    }
    if (!phoneRegex.test(formData.contact.phone)) {
      toast.error("Format nomor telepon tidak valid (minimal 10 digit).");
      return;
    }

    // 🔑 Transform payload ke flat structure
    const payload = {
      title_id: formData.hero.title_id,
      title_en: formData.hero.title_en,
      content_id: formData.content.content_id,
      content_en: formData.content.content_en,
      contact_title_id: formData.contact.title_id,
      contact_title_en: formData.contact.title_en,
      contact_email: formData.contact.email,
      contact_phone: formData.contact.phone,
    };

    try {
      const response = isEditMode
        ? await apiClient.patch(`/privacyandpolicy/${id}`, payload)
        : await apiClient.post("/privacyandpolicy", payload);

      if ([200, 201].includes(response.status)) {
        toast.success(isEditMode ? "Updated successfully" : "Created successfully");
        navigate("/admin/privacy-policy");
      } else {
        toast.error(response.data.message || "Gagal menyimpan data.");
      }
    } catch (error) {
      toast.error("Gagal konek ke server.");
      console.error("Submission Error:", error);
    }
  };


  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Privacy Policy" : "Create Privacy Policy"}
            </h2>

            {/* 🔑 Dynamic navigation */}
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section.id}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${activeSection === section.id ? "text-cyan-600 active" : "text-gray-500"
                    } hover:text-cyan-700 group`}
                  onClick={() => moveSection(section.id)}
                >
                  {section.type === "hero"
                    ? "Hero"
                    : section.type === "content"
                      ? "Content"
                      : "Contact"}
                </span>
              ))}
            </div>

            <PrivacyPolicyHeroSection
              id="hero"
              isActive={activeSection === "hero"}
              formData={formData.hero}
              handleChange={(field, value) => handleChange("hero", field, value)}
            />

            <PrivacyPolicyContentSection
              id="content"
              isActive={activeSection === "content"}
              formData={formData.content}
              handleChange={(field, value) => handleChange("content", field, value)} 
              isEditMode={isEditMode}
            />

            <PrivacyPolicyContactSection
              id="contact"
              isActive={activeSection === "contact"}
              formData={formData.contact}
              handleChange={(field, value) => handleChange("contact", field, value)}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/privacy-policy">
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
};

export default CreatePrivacyPolicyPage;
