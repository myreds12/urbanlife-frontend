import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import ItinerarySection from "../../../components/AdminDashboard/DayTour/ItinerarySection";
import PriceSection from "../../../components/AdminDashboard/DayTour/PriceSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import { PopsicleIcon } from "lucide-react";
import PolicyAndProcedureSection from "../../../components/AdminDashboard/RentCar/PolicyAndProcedureSection";
import PoliceNumberSection from "../../../components/AdminDashboard/RentCar/PoliceNumberSection";

const CreateRentCarPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  console.log(locations, "locations");

  console.log(photos, "photos");
  const [content, setContent] = useState([
    { bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
    { bahasa: "INDONESIA", deskripsi: "", kebijakan: "" },
  ]);

  const [prices, setPrices] = useState([{ durasi: "", harga: "" }]);

  const handlePriceChange = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    setPrices(updated);
  };

  const handleAddPrice = () => {
    setPrices([...prices, { duration: "", price: "" }]);
  };

  const handleDeletePrice = (index) => {
    const updated = prices.filter((_, i) => i !== index);
    setPrices(updated);
  };

  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 0,
    status_pajak: "",
    status: "TERSEDIA DIPESAN",
    plat_nomor: "",
    model: "",
    tanggal_pajak_berakhir: "",
    content: content,
    durasi: prices,
  });

  console.log(formData, "form data");

  console.log(content, "content");

  const [activeSection, setActiveSection] = useState("description");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  }, [content]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      durasi: prices,
    }));
  }, [prices]);

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


  const handleChangePolicy = (index, value) => {
    const updated = [...content];
    updated[index].kebijakan = value;
    setContent(updated);
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
    payload.append("plat_nomor", formData.plat_nomor);
    payload.append("model", formData.model);
    payload.append("tanggal_pajak_berakhir", formData.tanggal_pajak_berakhir);
    payload.append("status", "TERSEDIA DIPESAN");

    // Content (deskripsi)
    content.forEach((item, index) => {
      payload.append(`content[${index}][bahasa]`, item.bahasa);
      payload.append(`content[${index}][deskripsi]`, item.deskripsi);
      payload.append(`content[${index}][kebijakan]`, item.kebijakan || "");
    });

    // Durasi harga
    prices.forEach((item, index) => {
      payload.append(`durasi[${index}][durasi]`, item.duration);
      payload.append(`durasi[${index}][harga]`, item.price);
    });

    // Foto
    photos.forEach((file) => {
      payload.append("files", file);
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
      const response = await apiClient.post("/kendaraan", payload);
      console.log(response, "response");

      if (response.status === 201) {
        navigate("/admin/rent-car");
        toast.success("Rent Car created successfully");
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
              Create Rent Car
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {[
                "description",
                "image",
                "policy and procedure",
                "police number",
                "price",
              ].map((section) => (
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
              content={formData.content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
              type="rentcar"
            />

            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
            />

            <PolicyAndProcedureSection
              id="kebijakan"
              isActive={activeSection === "policy and procedure"}
              content={content}
              onChangePolicy={handleChangePolicy}
            />

            <PoliceNumberSection
              id="police"
              isActive={activeSection === "police number"}
              formData={formData}
              content={formData.content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
            />

            <PriceSection
              id="price"
              isActive={activeSection === "price"}
              formData={formData}
              handleChange={handleChange}
              type="rentcar"
              prices={prices}
              handlePriceChange={handlePriceChange}
              handleAddPrice={handleAddPrice}
              handleDeletePrice={handleDeletePrice}
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

export default CreateRentCarPage;
