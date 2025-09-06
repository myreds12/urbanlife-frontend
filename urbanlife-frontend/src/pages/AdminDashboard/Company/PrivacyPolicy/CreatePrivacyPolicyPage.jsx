import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivacyPolicyHeroSection from "./PrivacyPolicyHeroSection";
import PrivacyPolicyCustomSection from "./PrivacyPolicyCustomSection";
import PrivacyPolicyContactSection from "./PrivacyPolicyContactSection";
import toast from "react-hot-toast";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CreatePrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeSection, setActiveSection] = useState("hero");
  const [sections, setSections] = useState([{ id: "hero", type: "hero" }, { id: "contact", type: "contact" }]);

  const [formData, setFormData] = useState({
    hero: { title_en: "", title_id: "", subtitle_en: "", subtitle_id: "" },
    custom: [],
    contact: { title_en: "", title_id: "", email: "", phone: "" },
  });

useEffect(() => {
  const fetchInitialData = async () => {
    if (isEditMode) {
      try {
        const { data } = await apiClient.get(`/privacypolicy/${id}`);
        const section = data.data || {};
        setFormData({
          hero: section.hero || { title_en: "", title_id: "", subtitle_en: "", subtitle_id: "" },
          custom: section.custom.map((s) => ({
            section: s.section,
            title_en: s.title_en,
            title_id: s.title_id,
            content_en: s.content_en,
            content_id: s.content_id,
            notes: s.notes && s.notes.length > 0 ? s.notes : [{ en: "", id: "" }],
            warning: s.warning && s.warning.length > 0 ? s.warning : [{ en: "", id: "" }],
          })) || [],
          contact: section.contact || { title_en: "", title_id: "", email: "", phone: "" },
        });
        setSections([
          { id: "hero", type: "hero" },
          ...section.custom.map((s, i) => ({ id: `section${i + 1}`, type: "custom" })),
          { id: "contact", type: "contact" },
        ]);
      } catch (error) {
        toast.error("Gagal muat data, pakai default form.");
        console.error(error);
      }
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

  const handleCustomChange = (index, field, value) => {
    setFormData((prev) => {
      const newCustom = [...prev.custom];
      newCustom[index] = { ...newCustom[index], [field]: value };
      return { ...prev, custom: newCustom };
    });
  };

  const addCustomSection = () => {
    const newSection = {
      section: "",
      title_en: "",
      title_id: "",
      content_en: "",
      content_id: "",
      notes: [{ en: "", id: "" }],
      warning: [{ en: "", id: "" }],
    };
    setSections([...sections.slice(0, -1), { id: `section${sections.length - 1}`, type: "custom" }, sections[sections.length - 1]]);
    setFormData((prev) => ({ ...prev, custom: [...prev.custom, newSection] }));
  };

  const removeCustomSection = (index) => {
    setSections([...sections.slice(0, 2), ...sections.slice(3).filter((_, i) => i !== index), sections[sections.length - 1]]);
    setFormData((prev) => ({ ...prev, custom: prev.custom.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.hero.title_en || !formData.hero.title_id || !formData.contact.email || !formData.contact.phone) {
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
    try {
      const response = isEditMode
        ? await apiClient.patch(`/privacypolicy/${id}`, formData)
        : await apiClient.post("/privacypolicy", formData);
      if ([200, 201].includes(response.status)) {
        toast.success(isEditMode ? "Updated successfully" : "Created successfully");
        navigate("/admin/privacy-policy");
      } else {
        toast.error(response.data.message || "Gagal simpan data.");
      }
    } catch (error) {
      toast.error("Gagal konek ke server, cek endpoint.");
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
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section.id}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${activeSection === section.id ? "text-cyan-600 active" : "text-gray-500"} hover:text-cyan-700 group`}
                  onClick={() => moveSection(section.id)}
                >
                  {section.type === "hero" ? "Hero" : section.type === "contact" ? "Contact" : `Section ${sections.indexOf(section) - 1}`}
                </span>
              ))}
            </div>
            <PrivacyPolicyHeroSection id="hero" isActive={activeSection === "hero"} formData={formData.hero} handleChange={(field, value) => handleChange("hero", field, value)} />
            {formData.custom.map((section, index) => (
              <PrivacyPolicyCustomSection
                key={index}
                id={`section${index + 1}`}
                isActive={activeSection === `section${index + 1}`}
                sectionData={section}
                sectionIndex={index}
                handleChange={handleCustomChange}
                onRemove={() => removeCustomSection(index)}
              />
            ))}
            <PrivacyPolicyContactSection id="contact" isActive={activeSection === "contact"} formData={formData.contact} handleChange={(field, value) => handleChange("contact", field, value)} />
            <div className="mt-6">
              <button type="button" onClick={addCustomSection} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                Add New Section +
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/privacy-policy">
              <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                Cancel
              </button>
            </Link>
            <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
              Save
            </button>
          </div>
        </main>
      </div>
    </form>
  );
};

export default CreatePrivacyPolicyPage;