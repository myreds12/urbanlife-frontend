import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PolicyAndProcedureSection from "../../../components/AdminDashboard/RentCar/PolicyAndProcedureSection";
import PriceSection from "../../../components/AdminDashboard/DayTour/PriceSection";

const DEFAULT_CONTENT = [
  { bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
  { bahasa: "INDONESIA", deskripsi: "", kebijakan: "" },
];
const DEFAULT_PRICE = [{ id: 0, durasi: "", harga: "" }];

const CreateAirportShuttlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [prices, setPrices] = useState(DEFAULT_PRICE);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 0,
    top_attraction: true,
  });


  useEffect(() => {
    setFormData((prev) => ({ ...prev, content, prices }));
  }, [content, prices]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          { data: locationData },
          airportData
        ] = await Promise.all([
          apiClient.get("/lokasi?is_active=true"),
          isEditMode
            ? apiClient.get(`/airport-shuttle/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);

        if (isEditMode) {
          const airport = airportData.data.data;

          setFormData({
            nama: airport.nama || "",
            top_attraction: airport.top_attraction,
            lokasi_id: airport.lokasi_id || 0,
            content: airport.airport_shuttle_content?.length
              ? airport.airport_shuttle_content
              : DEFAULT_CONTENT,
            prices: airport.airport_shuttle_price?.length
              ? airport.airport_shuttle_price
              : DEFAULT_PRICE,
            airport_shuttle_id: airport.id || "",
          });

          setExistingPhotos(
            (airport.airport_shuttle_file || []).map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
            }))
          );

          setContent(airport.airport_shuttle_content || DEFAULT_CONTENT);
          setPrices(
            (airport.airport_shuttle_price || []).map((p) => ({
              id: p.id,
              durasi: p.nama,
              harga: p.harga,
            }))
          );
        }
      } catch (error) {
        toast.error("Failed to get initial data.");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handlePriceChange = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    setPrices(updated);
  };

  const handlePolicyChange = (index, value) =>
    handleContentChange(index, "kebijakan", value);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotos((prev) => [...prev, file]);
  };

  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/airport-shuttle/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "content" && key !== "prices" && key !== "airport_shuttle_id") {
        payload.append(key, value);
      }
    });

    content.forEach((item, i) => {
      payload.append(`airport_shuttle_content[${i}][bahasa]`, item.bahasa);
      payload.append(`airport_shuttle_content[${i}][deskripsi]`, item.deskripsi);
      payload.append(`airport_shuttle_content[${i}][kebijakan]`, item.kebijakan);
    });

    prices.forEach((item, i) => {
      payload.append(`airport_shuttle_price[${i}][id]`, item.id);
      payload.append(`airport_shuttle_price[${i}][nama]`, item.durasi);
      payload.append(`airport_shuttle_price[${i}][harga]`, item.harga);
    });

    const existingFileObjects = await Promise.all(
      existingPhotos.map((f) => fetchExistingFileAsFile(f.nama_file))
    );
    [...existingFileObjects, ...photos].forEach((file) => {
      payload.append("files", file);
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
      const response = isEditMode || formData.airport_shuttle_id
        ? await apiClient.patch(`/airport-shuttle/${id || formData.airport_shuttle_id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        : await apiClient.post("/airport-shuttle", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
        navigate("/admin/airport-shuttle");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to save.");
      console.error("Submission Error:", error);
    }
  };

  const moveSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    "description",
    "image",
    "policy and procedure",
    "price",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Airport Shuttle" : "Create Airport Shuttle"}
            </h2>

            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative ${activeSection === section
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
              content={content}
              onChangeContent={handleContentChange}
              handleChange={handleChange}
              locations={locations}
              type="airport_shuttle"
            />

            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              type="airport_shuttle"
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            />

            <PolicyAndProcedureSection
              id="kebijakan"
              isActive={activeSection === "policy and procedure"}
              content={content}
              onChangePolicy={handlePolicyChange}
            />

            <PriceSection
              id="price"
              isActive={activeSection === "price"}
              formData={formData}
              handleChange={handleChange}
              type="airport_shuttle"
              prices={prices}
              handlePriceChange={handlePriceChange}
              handleAddPrice={() =>
                setPrices([...prices, { id: 0, durasi: "", harga: "" }])
              }
              handleDeletePrice={(index) =>
                setPrices(prices.filter((_, i) => i !== index))
              }
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/airport-shuttle">
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

export default CreateAirportShuttlePage;
