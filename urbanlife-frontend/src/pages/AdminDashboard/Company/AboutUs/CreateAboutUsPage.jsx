// src/pages/AdminDashboard/AboutUs/CreateAboutUsPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AboutUsHeaderSection from "./AboutUsHeaderSection";
import AboutUsOurStoriesSection from "./AboutUsOurStoriesSection";
import AboutUsServicesSection from "./AboutUsServicesSection";
import AboutUsCTASection from "./AboutUsCTASection";
import AboutUsOperationalSection from "./AboutUsOperationalSection";
import toast from "react-hot-toast";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CreateAboutUsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeSection, setActiveSection] = useState("header");
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [services, setServices] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [stats, setStats] = useState([]);
  const [cta, setCta] = useState({
    title_en: "",
    title_id: "",
    description_en: "",
    description_id: "",
    button_text: "",
    button_link: "",
  });
  const [story, setStory] = useState({
    title_en: "",
    title_id: "",
    content_en: "",
    content_id: "",
  });
  const [formData, setFormData] = useState({
    title_en: "",
    title_id: "",
    content_en: "",
    content_id: "",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (isEditMode) {
          const { data } = await apiClient.get(`/aboutus/${id}`);
          const about = data.data;

          // Map data ke state untuk mode edit
          setFormData({
            title_en: about.title_en || "",
            title_id: about.title_id || "",
            content_en: about.content_en || "",
            content_id: about.content_id || "",
          });
          setStory({
            title_en: about.AboutUsStory?.title_en || "",
            title_id: about.AboutUsStory?.title_id || "",
            content_en: about.AboutUsStory?.content_en || "",
            content_id: about.AboutUsStory?.content_id || "",
          });
          setServices(
            about.AboutUsServices?.map((service) => ({
              id: service.id,
              title_en: service.title_en || "",
              title_id: service.title_id || "",
              description_en: service.content_en || "",
              description_id: service.content_id || "",
              icon: service.icon || "",
              location: service.location || "",
              order: service.order || 0,
            })) || []
          );
          setSchedule(
            about.AboutUsOperational?.map((item) => ({
              day: item.day || "",
              time: item.time || "",
              highlight: item.is_highlight || false,
            })) || []
          );
          setStats(
            about.AboutUsAchievements?.map((achievement) => ({
              number: achievement.number || "",
              label_en: achievement.content_en || "",
              label_id: achievement.content_id || "",
              icon: achievement.icon || "",
            })) || []
          );
          setCta({
            title_en: about.AboutUsCta?.title_en || "",
            title_id: about.AboutUsCta?.title_id || "",
            description_en: about.AboutUsCta?.description_en || "",
            description_id: about.AboutUsCta?.description_id || "",
            button_text: about.AboutUsCta?.button_text || "",
            button_link: about.AboutUsCta?.button_url || "",
          });
          setExistingPhotos(
            about.AboutUsFile?.map((img) => ({
              url: `${apiClient.defaults.baseURL}/public/${img.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              id: img.id,
            })) || []
          );
        }
        // Mode create: Tidak mengisi data dummy, biarkan state kosong
      } catch (error) {
        toast.error("Failed to get initial data.");
        console.error(error);
      }
    };
    fetchInitialData();
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  const handleCtaChange = (e) => {
    const { name, value } = e.target;
    setCta((prev) => ({ ...prev, [name]: value }));
  };

  const removePhoto = (index) => setPhotos((prev) => prev.filter((_, i) => i !== index));
  const removeExistingPhoto = (index) => setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const addService = () => {
    setServices((prev) => [
      ...prev,
      {
        title_en: "",
        title_id: "",
        description_en: "",
        description_id: "",
        icon: "",
        location: "",
        order: prev.length + 1,
      },
    ]);
  };

  const removeService = (index) => {
    setServices((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, order: i + 1 }))
    );
  };

  const handleScheduleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addSchedule = () => {
    setSchedule((prev) => [...prev, { day: "", time: "", highlight: false }]);
  };

  const removeSchedule = (index) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStatsChange = (index, field, value) => {
    const updated = [...stats];
    updated[index][field] = value;
    setStats(updated);
  };

  const addStat = () => {
    setStats((prev) => [
      ...prev,
      { number: "", label_en: "", label_id: "", icon: "" },
    ]);
  };

  const removeStat = (index) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("title_en", formData.title_en);
    payload.append("title_id", formData.title_id);
    payload.append("content_en", formData.content_en);
    payload.append("content_id", formData.content_id);
    payload.append("aboutus_story[title_id]", story.title_id);
    payload.append("aboutus_story[title_en]", story.title_en);
    payload.append("aboutus_story[content_id]", story.content_id);
    payload.append("aboutus_story[content_en]", story.content_en);
    photos.forEach((file) => payload.append("files", file));
    services.forEach((service, index) => {
      payload.append(`aboutus_service[${index}][title_en]`, service.title_en);
      payload.append(`aboutus_service[${index}][title_id]`, service.title_id);
      payload.append(`aboutus_service[${index}][content_en]`, service.description_en);
      payload.append(`aboutus_service[${index}][content_id]`, service.description_id);
      payload.append(`aboutus_service[${index}][icon]`, service.icon);
      payload.append(`aboutus_service[${index}][location]`, service.location);
      payload.append(`aboutus_service[${index}][order]`, service.order);
      if (service.id) payload.append(`aboutus_service[${index}][id]`, service.id);
    });
    schedule.forEach((item, index) => {
      payload.append(`aboutus_operational[${index}][day]`, item.day);
      payload.append(`aboutus_operational[${index}][time]`, item.time);
      payload.append(`aboutus_operational[${index}][is_highlight]`, item.highlight);
    });
    payload.append("aboutus_cta[title_en]", cta.title_en);
    payload.append("aboutus_cta[title_id]", cta.title_id);
    payload.append("aboutus_cta[description_en]", cta.description_en);
    payload.append("aboutus_cta[description_id]", cta.description_id);
    payload.append("aboutus_cta[button_text]", cta.button_text);
    payload.append("aboutus_cta[button_url]", cta.button_link);
    stats.forEach((stat, index) => {
      payload.append(`aboutus_achievment[${index}][number]`, stat.number);
      payload.append(`aboutus_achievment[${index}][content_en]`, stat.label_en);
      payload.append(`aboutus_achievment[${index}][content_id]`, stat.label_id);
      payload.append(`aboutus_achievment[${index}][icon]`, stat.icon);
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
        ? await apiClient.patch(`/aboutus/${id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await apiClient.post("/aboutus", payload, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      if ([200, 201].includes(response.status)) {
        toast.success(isEditMode ? "Updated successfully" : "Created successfully");
        navigate("/admin/aboutus");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
              {isEditMode ? "Edit About Us" : "Create About Us"}
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {["header", "our_story", "services", "cta", "operational"].map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-4 py-2 font-medium rounded-md transition-colors ${
                    activeSection === section
                      ? "bg-cyan-100 text-cyan-700"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => moveSection(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace("_", " ")}
                </span>
              ))}
            </div>

            <AboutUsHeaderSection
              id="header"
              isActive={activeSection === "header"}
              formData={formData}
              handleChange={handleChange}
            />
            <AboutUsOurStoriesSection
              id="our_story"
              isActive={activeSection === "our_story"}
              story={story}
              handleStoryChange={handleStoryChange}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            />
            <AboutUsServicesSection
              id="services"
              isActive={activeSection === "services"}
              services={services}
              handleServiceChange={handleServiceChange}
              addService={addService}
              removeService={removeService}
            />
            <AboutUsCTASection
              id="cta"
              isActive={activeSection === "cta"}
              cta={cta}
              handleCtaChange={handleCtaChange}
            />
            <AboutUsOperationalSection
              id="operational"
              isActive={activeSection === "operational"}
              schedule={schedule}
              stats={stats}
              handleScheduleChange={handleScheduleChange}
              addSchedule={addSchedule}
              removeSchedule={removeSchedule}
              handleStatsChange={handleStatsChange}
              addStat={addStat}
              removeStat={removeStat}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/aboutus">
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

export default CreateAboutUsPage;