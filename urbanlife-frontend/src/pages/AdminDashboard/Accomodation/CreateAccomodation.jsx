import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { PopsicleIcon } from "lucide-react";
import RoomAndPriceSection from "../../../components/AdminDashboard/Accommodation/RoomAndPriceSection";
import FacilitySection from "../../../components/AdminDashboard/Accommodation/FacilitySection";

const CreateAccomodationPage = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");

  const [content, setContent] = useState([
    { bahasa: "INDONESIA", deskripsi: "" },
    { bahasa: "ENGLISH", deskripsi: "" },
  ]);

  const [roomPrices, setRoomPrices] = useState([{ nama: "", harga: 0 }]);

  const [facilities, setFacilities] = useState([]);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 0,
    kategori: "Hotel",
    tipe: "hotel",
    status: true,
    akomodasi_content: content,
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data } = await apiClient.get("/lokasi");
      setLocations(data.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch locations", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const parsedValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : parsedValue }));
  };

  const handleChangeContent = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handleChangePrice = (index, field, value) => {
    const updated = [...roomPrices];
    updated[index][field] = value;
    setRoomPrices(updated);
  };

  const handleAddPrice = () => {
    setRoomPrices([...roomPrices, { nama: "", harga: 0 }]);
  };

  const handleRemovePrice = (index) => {
    setRoomPrices(roomPrices.filter((_, i) => i !== index));
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

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "akomodasi_content") payload.append(key, value);
    });

    content.forEach((item, i) => {
      payload.append(`akomodasi_content[${i}][bahasa]`, item.bahasa);
      payload.append(`akomodasi_content[${i}][deskripsi]`, item.deskripsi);
    });

    roomPrices.forEach((item, i) => {
      payload.append(`akomodasi_room[${i}][nama]`, item.nama);
      payload.append(`akomodasi_room[${i}][harga]`, item.harga);
    });

    facilities.forEach((facility, i) => {
      payload.append(`akomodasi_facility[${i}][nama]`, facility.nama);
      facility.fasilitas.forEach((f, j) => {
        payload.append(`akomodasi_facility[${i}][fasilitas][${j}][nama]`, f.nama);
      });
    });

    photos.forEach((file) => payload.append("files", file));

    try {
      const res = await apiClient.post("/akomodasi", payload);
      if (res.status === 201) {
        toast.success("Accommodation created successfully");
        navigate("/admin/accommodation");
      } else {
        toast.error(res.data.message || "Failed to create accommodation");
      }
    } catch (err) {
      toast.error("Submission Error: " + err.message);
      console.error("Submission Error:", err);
    }
  };

  const sections = ["description", "image", "room and price", "facility"];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1 overflow-y-auto">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Create Accommodation
            </h2>

            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${
                    activeSection === section ? "text-cyan-600 active" : "text-gray-500"
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
              content={content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
              type="accommodation"
            />

            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
            />

            <RoomAndPriceSection
              id="room and price"
              isActive={activeSection === "room and price"}
              roomPrices={roomPrices}
              onChange={handleChangePrice}
              onAdd={handleAddPrice}
              onRemove={handleRemovePrice}
            />

            <FacilitySection
              id="facility"
              isActive={activeSection === "facility"}
              facilities={facilities}
              setFacilities={setFacilities}
              roomPrices={roomPrices}
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
};

export default CreateAccomodationPage;
