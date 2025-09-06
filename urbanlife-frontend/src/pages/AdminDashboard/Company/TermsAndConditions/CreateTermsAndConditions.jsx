import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TermsAndConditionsHeroSection from "./TermsAndConditionsHeroSection";
import TermsAndConditionsCustomSection from "./TermsAndConditionsCustomSection";
import toast from "react-hot-toast";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CreateTermsAndConditionsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeSection, setActiveSection] = useState("hero");
  const [sections, setSections] = useState([
    { id: "hero", type: "hero" },
    { id: "custom1", type: "custom", section: "" },
  ]);

  const [formData, setFormData] = useState({
    hero: { title_en: "", title_id: "", subtitle_en: "", subtitle_id: "", image: null, existingImage: null },
    custom: [
      {
        section: "",
        title_en: "",
        title_id: "",
        content_en: "",
        content_id: "",
        notes: [],
        warning: [],
      },
    ],
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isEditMode) {
        try {
          const { data } = await apiClient.get(`/termsandconditions/${id}`);
          const section = data.data || {};
          setFormData({
            hero: {
              title_en: section.hero?.title_en || "",
              title_id: section.hero?.title_id || "",
              subtitle_en: section.hero?.subtitle_en || "",
              subtitle_id: section.hero?.subtitle_id || "",
              image: null,
              existingImage: section.hero?.image_url || null,
            },
            custom: section.custom?.map((s, i) => ({
              section: s.section || "",
              title_en: s.title_en || "",
              title_id: s.title_id || "",
              content_en: s.content_en || "",
              content_id: s.content_id || "",
              notes: s.notes || [],
              warning: s.warning || [],
            })) || [],
          });
          setSections([
            { id: "hero", type: "hero" },
            ...section.custom?.map((s, i) => ({ id: `custom${i + 1}`, type: "custom", section: s.section })) || [],
          ]);
        } catch (error) {
          toast.error("Gagal memuat data, menggunakan default form.");
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
      notes: [],
      warning: [],
    };
    const newSectionId = `custom${formData.custom.length + 1}`;
    setSections([...sections, { id: newSectionId, type: "custom", section: "" }]);
    setFormData((prev) => ({ ...prev, custom: [...prev.custom, newSection] }));
  };

  const removeCustomSection = (index) => {
    setSections(sections.filter((_, i) => i !== index + 1));
    setFormData((prev) => ({
      ...prev,
      custom: prev.custom.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("hero[title_en]", formData.hero.title_en);
    payload.append("hero[title_id]", formData.hero.title_id);
    payload.append("hero[subtitle_en]", formData.hero.subtitle_en);
    payload.append("hero[subtitle_id]", formData.hero.subtitle_id);
    if (formData.hero.image) {
      payload.append("hero[image]", formData.hero.image);
    }
    if (formData.hero.existingImage === null) {
      payload.append("hero[remove_image]", true);
    }
    formData.custom.forEach((section, index) => {
      payload.append(`custom[${index}][section]`, section.section);
      payload.append(`custom[${index}][title_en]`, section.title_en);
      payload.append(`custom[${index}][title_id]`, section.title_id);
      payload.append(`custom[${index}][content_en]`, section.content_en);
      payload.append(`custom[${index}][content_id]`, section.content_id);
      section.notes.forEach((note, noteIndex) => {
        payload.append(`custom[${index}][notes][${noteIndex}][en]`, note.en);
        payload.append(`custom[${index}][notes][${noteIndex}][id]`, note.id);
      });
      section.warning.forEach((warn, warnIndex) => {
        payload.append(`custom[${index}][warning][${warnIndex}][en]`, warn.en);
        payload.append(`custom[${index}][warning][${warnIndex}][id]`, warn.id);
      });
    });

    if (
      !formData.hero.title_en ||
      !formData.hero.title_id ||
      !formData.hero.subtitle_en ||
      !formData.hero.subtitle_id ||
      formData.custom.some(
        (section) =>
          !section.section ||
          !section.title_en ||
          !section.title_id ||
          !section.content_en ||
          !section.content_id
      )
    ) {
      toast.error("Field wajib (section, title EN/ID, content EN/ID, subtitle EN/ID) tidak boleh kosong.");
      return;
    }

    try {
      const response = isEditMode
        ? await apiClient.patch(`/termsandconditions/${id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await apiClient.post("/termsandconditions", payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      if ([200, 201].includes(response.status)) {
        toast.success(isEditMode ? "Berhasil diperbarui" : "Berhasil dibuat");
        navigate("/admin/terms-conditions");
      } else {
        toast.error(response.data.message || "Gagal menyimpan data.");
      }
    } catch (error) {
      toast.error("Gagal terhubung ke server, periksa endpoint.");
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
              {isEditMode ? "Edit Terms and Conditions" : "Create Terms and Conditions"}
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section.id}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${
                    activeSection === section.id ? "text-cyan-600 active" : "text-gray-500"
                  } hover:text-cyan-700 group`}
                  onClick={() => moveSection(section.id)}
                >
                  {section.type === "hero" ? "Hero" : section.section || `Section ${sections.indexOf(section)}`}
                </span>
              ))}
            </div>

            <TermsAndConditionsHeroSection
              id="hero"
              isActive={activeSection === "hero"}
              formData={formData.hero}
              handleChange={(field, value) => handleChange("hero", field, value)}
            />
            {formData.custom.map((section, index) => (
              <TermsAndConditionsCustomSection
                key={index}
                id={`custom${index + 1}`}
                isActive={activeSection === `custom${index + 1}`}
                sectionData={section}
                sectionIndex={index}
                handleChange={handleCustomChange}
                onRemove={() => removeCustomSection(index)}
              />
            ))}
            <div className="mt-6">
              <button
                type="button"
                onClick={addCustomSection}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
              >
                Add New Section +
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/terms-conditions">
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

export default CreateTermsAndConditionsPage;