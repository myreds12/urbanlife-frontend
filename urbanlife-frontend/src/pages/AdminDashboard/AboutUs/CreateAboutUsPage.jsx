// src/pages/AdminDashboard/AboutUs/CreateAboutUsPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AboutUsHeaderSection from "./AboutUsHeaderSection";
import AboutUsOurStoriesSection from "./AboutUsOurStoriesSection";
import AboutUsServicesSection from "./AboutUsServicesSection";
import AboutUsCTASection from "./AboutUsCTASection";
import AboutUsOperationalSection from "./AboutUsOperationalSection";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CreateAboutUsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [activeSection, setActiveSection] = useState("header");
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [services, setServices] = useState([]);
  console.log(services, "SERVICES");
  const [schedule, setSchedule] = useState([]);
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
  const [stats, setStats] = useState([]);
  const [formData, setFormData] = useState({
    title_en: "",
    title_id: "",
    subtitle_en: "",
    subtitle_id: "",
    description_en: "",
    description_id: "",
    button_text: "",
    button_link: "",
  });

  console.log(formData, "FORM DATA");

  // Dummy data for testing
  const dummyData = {
    header: {
      section: "header",
      title_en: "About UrbanLife",
      title_id: "Tentang UrbanLife",
      subtitle_en:
        "Your trusted partner for seamless travel experiences in Bali and Jakarta",
      subtitle_id:
        "Mitra terpercaya Anda untuk pengalaman perjalanan yang mulus di Bali dan Jakarta",
      button_text: "",
      button_link: "",
      images: [
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      ],
    },
    story: {
      section: "our_story",
      title_en: "Our Story",
      title_id: "Kisah Kami",
      description_en:
        "UrbanLife was founded with a passion for making travel in Bali and Jakarta effortless and memorable. Since 2018, we've been helping travelers explore the vibrant culture, stunning landscapes, and hidden gems of these iconic destinations.",
      description_id:
        "UrbanLife didirikan dengan semangat untuk membuat perjalanan di Bali dan Jakarta mudah dan tak terlupakan. Sejak 2018, kami membantu wisatawan menjelajahi budaya yang hidup, pemandangan yang menakjubkan, dan permata tersembunyi dari destinasi ikonik ini.",
      images: [
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      ],
    },
    services: [
      {
        title_en: "Private Car with Driver",
        title_id: "Mobil Pribadi dengan Sopir",
        description_en:
          "Explore Bali and Jakarta with our English-speaking drivers.",
        description_id:
          "Jelajahi Bali dan Jakarta dengan sopir berbahasa Inggris kami.",
        icon: "car",
        location: "Bali & Jakarta",
        order: 1,
      },
      {
        title_en: "Airport Transfer",
        title_id: "Transfer Bandara",
        description_en: "Hassle-free pick-up and drop-off services.",
        description_id: "Layanan antar-jemput tanpa repot.",
        icon: "plane",
        location: "Bali & Jakarta",
        order: 2,
      },
    ],
    schedule: [
      { day: "Monday", time: "08:00 - 17:00", highlight: false },
      { day: "Sunday", time: "08:00 - 17:00", highlight: true },
    ],
    stats: [
      {
        number: "15,000+",
        label_en: "Happy Customers",
        label_id: "Pelanggan Puas",
        icon: "users",
      },
      {
        number: "4.9",
        label_en: "Average Rating",
        label_id: "Rata-rata Penilaian",
        icon: "star",
      },
    ],
    cta: {
      section: "cta",
      title_en: "Ready to Explore?",
      title_id: "Siap Menjelajah?",
      description_en: "Book your next adventure with UrbanLife!",
      description_id: "Pesan petualangan Anda berikutnya dengan UrbanLife!",
      button_text: "Contact Us",
      button_link: "/contact",
    },
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (isEditMode) {
          const { data } = await apiClient.get(`/aboutus/${id}`);
          const about = data.data;
          setFormData({
            section: about.section || "",
            title_en: about.title_en || "",
            title_id: about.title_id || "",
            subtitle_en: about.subtitle_en || "",
            subtitle_id: about.subtitle_id || "",
            description_en: about.description_en || "",
            description_id: about.description_id || "",
            button_text: about.button_text || "",
            button_link: about.button_link || "",
          });
          setExistingPhotos(
            about.images?.map((img) => ({ url: img, id: null })) || []
          );
          setServices(about.services || []);
          setSchedule(about.schedule || []);
          setStats(about.stats || []);
        } else {
          // Load dummy data for creation mode
          setFormData(dummyData[activeSection] || {});
          if (activeSection === "our_story") {
            setExistingPhotos(
              dummyData.story.images.map((url) => ({ url, id: null }))
            );
          }
          setServices(dummyData.services);
          setSchedule(dummyData.schedule);
          setStats(dummyData.stats);
        }
      } catch (error) {
        toast.error("Failed to get initial data.");
        console.error(error);
      }
    };
    fetchInitialData();
  }, [isEditMode, id, activeSection]);

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

  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

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
    payload.append("content_en", formData.subtitle_en);
    payload.append("content_id", formData.subtitle_id);
    payload.append("aboutus_story[title_id]", story.title_id);
    payload.append("aboutus_story[title_en]", story.title_en);
    payload.append("aboutus_story[content_id]", story.content_id);
    payload.append("aboutus_story[content_en]", story.content_en);
    photos.forEach((file) => payload.append("files", file));
    services.forEach((service, index) => {
      payload.append(`aboutus_service[${index}][title_en]`, service.title_en);
      payload.append(`aboutus_service[${index}][title_id]`, service.title_id);
      payload.append(
        `aboutus_service[${index}][content_en]`,
        service.description_en
      );
      payload.append(
        `aboutus_service[${index}][content_id]`,
        service.description_id
      );
      payload.append(`aboutus_service[${index}][icon]`, service.icon);
      payload.append(`aboutus_service[${index}][location]`, service.location);
      payload.append(`aboutus_service[${index}][order]`, service.order);
      if (service.id)
        payload.append(`aboutus_service[${index}][id]`, service.id);
    });
    schedule.forEach((item, index) => {
      payload.append(`aboutus_operational[${index}][day]`, item.day);
      payload.append(`aboutus_operational[${index}][time]`, item.time);
      payload.append(
        `aboutus_operational[${index}][is_highlight]`,
        item.highlight
      );
    });
    payload.append("aboutus_cta[title_en]", cta.title_en);
    payload.append("aboutus_cta[title_id]", cta.title_id);
    payload.append("aboutus_cta[description_en]", cta.description_en);
    payload.append("aboutus_cta[description_id]", cta.description_id);
    payload.append("aboutus_cta[button_text]", cta.button_text);
    payload.append("aboutus_cta[button_url]", cta.button_link);
    stats.forEach((stat, index) => {
      payload.append(`aboutus_achievment[${index}][number]`, stat.number);
      payload.append(
        `aboutus_achievment[${index}][content_en]`,
        stat.label_en
      );
      payload.append(
        `aboutus_achievment[${index}][content_id]`,
        stat.label_id
      );
      payload.append(`aboutus_achievment[${index}][icon]`, stat.icon);
    });

    // Buatkan console log untuk memeriksa payload sebelum dikirim
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
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
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
              {["header", "our_story", "services", "cta", "operational"].map(
                (section) => (
                  <span
                    key={section}
                    className={`cursor-pointer px-1 font-medium underline-item relative ${
                      activeSection === section
                        ? "text-cyan-600 active"
                        : "text-gray-500"
                    } hover:text-cyan-700 group`}
                    onClick={() => moveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() +
                      section.slice(1).replace("_", " ")}
                  </span>
                )
              )}
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
