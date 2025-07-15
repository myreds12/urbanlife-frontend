import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import ItinerarySection from "../../../components/AdminDashboard/DayTour/ItinerarySection";
import PriceSection from "../../../components/AdminDashboard/DayTour/PriceSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

function CreateDayTourPage() {
  const [photos, setPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  console.log(locations, "locations");

  console.log(photos, "photos");
  const [content, setContent] = useState([
    { bahasa: "ENGLISH", deskripsi: "" },
    { bahasa: "INDONESIA", deskripsi: "" },
  ]);

  const [itinerary, setItinerary] = useState([
    {
      bahasa: "ENGLISH",
      destination: "",
      description: "",
    },
    {
      bahasa: "INDONESIA",
      destination: "",
      description: "",
    },
  ]);
  const [formData, setFormData] = useState({
    nama: "Wettern and Eastern Nusa Penida Tour",
    lokasi_id: 1,
    harga_anak: 0,
    harga_dewasa: 0,
    travel_package_itinerary: itinerary,
    travel_package_content: content,
  });

  console.log(formData, "form data");

  console.log(content, "content");
  console.log(itinerary, "itinerary");

  const [activeSection, setActiveSection] = useState("description");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      travel_package_content: content,
    }));
  }, [content]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      travel_package_itinerary: itinerary,
    }));
  }, [itinerary]);

  const fetchLocations = async () => {
    try {
      const { data } = await apiClient.get("/lokasi");
      setLocations(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch locations", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

   const handleChangeContent = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };


  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
    setFormData((prev) => ({
      ...prev,
      travel_package_itinerary: updated,
    }));
  };

  const handleAddItineraryPair = () => {
    setItinerary((prev) => [
      ...prev,
      {
        bahasa: "ENGLISH",
        destination: "",
        description: "",
      },
      {
        bahasa: "INDONESIA",
        destination: "",
        description: "",
      },
    ]);
  };

  const handleRemoveItineraryPair = (pairIndex) => {
    const updated = itinerary.filter((_, index) => {
      const pairPosition = Math.floor(index / 2);
      return pairPosition !== pairIndex;
    });
    setItinerary(updated);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("nama", formData.nama);
    payload.append("lokasi_id", formData.lokasi_id);
    payload.append("harga_anak", formData.harga_anak);
    payload.append("harga_dewasa", formData.harga_dewasa);

    photos.forEach((file) => {
      payload.append("files", file);
    });

    formData.travel_package_content.forEach((item, index) => {
      payload.append(`travel_package_content[${index}][bahasa]`, item.bahasa);
      payload.append(
        `travel_package_content[${index}][deskripsi]`,
        item.deskripsi
      );
    });

    formData.travel_package_itinerary.forEach((item, index) => {
      payload.append(`travel_package_itinerary[${index}][bahasa]`, item.bahasa);
      payload.append(
        `travel_package_itinerary[${index}][deskripsi]`,
        item.description
      );
      payload.append(
        `travel_package_itinerary[${index}][nama]`,
        item.destination
      );
    });

    console.log("=== Payload yang akan dikirim ke API ===");
    for (let pair of payload.entries()) {
      // Jika berupa File, tampilkan nama file
      if (pair[1] instanceof File) {
        console.log(pair[0], pair[1].name);
      } else {
        console.log(pair[0], pair[1]);
      }
    }
    console.log("========================================");

    try {
      const response = await apiClient.post("/travel-package", payload);

      if (!response.ok && !response.status === 200) {
        throw new Error("Failed to submit form");
      }

      toast.success("Day tour created successfully!");
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen ">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Create Day Tour
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {["description", "image", "itinerary", "price"].map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${
                    activeSection === section
                      ? "text-cyan-600 active"
                      : "text-gray-500"
                  } hover:text-cyan-700 group`}
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
              content={formData.travel_package_content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
              type="daytour"
            />

            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
            />

            <ItinerarySection
              id="itinerary"
              isActive={activeSection === "itinerary"}
              itinerary={itinerary}
              onChange={handleItineraryChange}
              onAdd={handleAddItineraryPair}
              onRemove={handleRemoveItineraryPair}
            />

            <PriceSection
              id="price"
              isActive={activeSection === "price"}
              formData={formData}
              handleChange={handleChange}
              type={"daytour"}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/dashboard">
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

export default CreateDayTourPage;
