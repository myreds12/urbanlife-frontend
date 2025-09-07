import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TermsAndConditionsHeroSection from "./TermsAndConditionsHeroSection";
import TermsAndConditionsCustomSection from "./TermsAndConditionsCustomSection";
import toast from "react-hot-toast";

const CreateTermsAndConditionsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeSection, setActiveSection] = useState("hero");
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    hero: { title: "", subtitle: "", image: null, existingImage: null },
    custom: [],
  });
  const formRef = useRef(null);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('termsAndConditionsData')) || [];
    
    if (isEditMode) {
      const dataToEdit = localData.find(item => item.id === id);
      if (dataToEdit) {
        setFormData({
          hero: { title: "", subtitle: "", image: null, existingImage: null },
          custom: [dataToEdit],
        });
        setSections([
          { id: "custom1", type: "custom", section: dataToEdit.section }
        ]);
        setActiveSection("custom1");
      } else if (id === "hero") {
        const heroData = JSON.parse(localStorage.getItem('heroData')) || { title: "Terms & Conditions", subtitle: "Clear guidelines..." };
        setFormData({
          hero: { ...heroData, image: null, existingImage: heroData.image_url },
          custom: [],
        });
        setSections([{ id: "hero", type: "hero" }]);
        setActiveSection("hero");
      }
    } else {
      setSections([{ id: "hero", type: "hero" }]);
      setFormData({
        hero: { title: "", subtitle: "", image: null, existingImage: null },
        custom: [],
      });
    }
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
    
    setSections((prev) => {
      const newSections = [...prev];
      if (field === "section" && newSections[index + 1]) {
        newSections[index + 1].section = value;
      }
      return newSections;
    });
  };

  const addCustomSection = () => {
    const newSection = {
      id: `custom${Date.now()}`,
      section: "",
      title: "",
      content: "",
      notes: [],
      warning: [],
    };
    const newSectionId = newSection.id;
    setSections([...sections, { id: newSectionId, type: "custom", section: "" }]);
    setFormData((prev) => ({ ...prev, custom: [...prev.custom, newSection] }));
    setTimeout(() => {
      moveSection(newSectionId);
    }, 100);
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

    if (
      (isEditMode && id !== "hero" && formData.custom.some(section => !section.section || !section.title || !section.content)) ||
      (!isEditMode && formData.custom.some(section => !section.section || !section.title || !section.content))
    ) {
      toast.error("Required fields (section, title, content) cannot be empty.");
      return;
    }

    // Local save logic
    let localData = JSON.parse(localStorage.getItem('termsAndConditionsData')) || [];
    
    if (isEditMode) {
      if (id === "hero") {
        localStorage.setItem('heroData', JSON.stringify(formData.hero));
        toast.success("Hero data updated locally successfully!");
      } else {
        const updatedData = localData.map(item => item.id === id ? formData.custom[0] : item);
        localStorage.setItem('termsAndConditionsData', JSON.stringify(updatedData));
        toast.success("Data updated locally successfully!");
      }
    } else {
      const newData = formData.custom.map(item => ({ ...item, id: `custom${Date.now()}` }));
      const combinedData = [...localData, ...newData];
      localStorage.setItem('termsAndConditionsData', JSON.stringify(combinedData));
      toast.success("Data created locally successfully!");
    }

    navigate("/admin/terms-conditions");
  };

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="flex h-screen">
        <main className="p-1 flex-1 overflow-y-auto">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Terms and Conditions" : "Create Terms and Conditions"}
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex flex-wrap space-x-5">
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

            {isEditMode && id === "hero" ? (
              <TermsAndConditionsHeroSection
                id="hero"
                isActive={activeSection === "hero"}
                formData={formData.hero}
                handleChange={(field, value) => handleChange("hero", field, value)}
              />
            ) : isEditMode ? (
              formData.custom.map((section, index) => (
                <TermsAndConditionsCustomSection
                  key={section.id}
                  id={`custom${index + 1}`}
                  isActive={activeSection === `custom${index + 1}`}
                  sectionData={section}
                  sectionIndex={index}
                  handleChange={handleCustomChange}
                  onRemove={() => removeCustomSection(index)}
                />
              ))
            ) : (
              <>
                <TermsAndConditionsHeroSection
                  id="hero"
                  isActive={activeSection === "hero"}
                  formData={formData.hero}
                  handleChange={(field, value) => handleChange("hero", field, value)}
                />
                {formData.custom.map((section, index) => (
                  <TermsAndConditionsCustomSection
                    key={section.id}
                    id={sections[index + 1]?.id}
                    isActive={activeSection === sections[index + 1]?.id}
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
              </>
            )}
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