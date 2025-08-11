import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const DEFAULT_CONTENT = [
  { bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
  { bahasa: "INDONESIA", deskripsi: "", kebijakan: "" },
];

const DEFAULT_PRICE = [{ durasi: "", harga: "" }];

const CreateRentCarPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 0,
    status_pajak: "",
    status: "TERSEDIA DIPESAN",
    plat_nomor: "",
    model: "",
    tanggal_pajak_berakhir: "",
    content: DEFAULT_CONTENT,
    durasi: DEFAULT_PRICE,
  });

  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [prices, setPrices] = useState(DEFAULT_PRICE);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content, durasi: prices }));
  }, [content, prices]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [{ data: locationData }, carData] = await Promise.all([
          apiClient.get("/lokasi"),
          isEditMode
            ? apiClient.get(`/kendaraan/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);

        if (isEditMode) {
          const car = carData.data.data;

          setFormData({
            nama: car.nama || "",
            lokasi_id: car.lokasi_id || 0,
            status_pajak: car.status_pajak || "",
            status: car.status || "TERSEDIA DIPESAN",
            plat_nomor: car.plat_nomor || "",
            model: car.model || "",
            tanggal_pajak_berakhir:
              car.tanggal_pajak_berakhir.split("T")[0] || "",
            content: car.kendaraan_content?.length
              ? car.kendaraan_content
              : DEFAULT_CONTENT,
            durasi: car.kendaraan_durasi?.length
              ? car.kendaraan_durasi
              : DEFAULT_PRICE,
          });

          setExistingPhotos(
            (car.kendaraan_file || []).map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
            }))
          );

          setContent(car.kendaraan_content || DEFAULT_CONTENT);
          setPrices(car.kendaraan_durasi || DEFAULT_PRICE);
        }
      } catch (error) {
        toast.error("Gagal mengambil data awal");
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

  const handlePolicyChange = (index, value) =>
    handleContentChange(index, "kebijakan", value);

  const handlePriceChange = (index, field, value) => {
    const updated = [...prices];
    updated[index][field] = value;
    setPrices(updated);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhotos((prev) => [...prev, file]);
  };

  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "content" && key !== "durasi") payload.append(key, value);
    });

    content.forEach((item, i) => {
      payload.append(`content[${i}][bahasa]`, item.bahasa);
      payload.append(`content[${i}][deskripsi]`, item.deskripsi);
      payload.append(`content[${i}][kebijakan]`, item.kebijakan);
    });

    prices.forEach((item, i) => {
      payload.append(`durasi[${i}][durasi]`, item.durasi);
      payload.append(`durasi[${i}][harga]`, item.harga);
    });

    photos.forEach((file) => payload.append("files", file));

    try {
      const response = isEditMode
        ? await apiClient.patch(`/kendaraan/${id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await apiClient.post("/kendaraan", payload);

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
        navigate("/admin/rent-car");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
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
    "police number",
    "price",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5 darktitle">
              Create Rent Car
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
                <span
                  key={section}
                  className={`cursor-pointer px-1 font-medium underline-item relative darksubtitle darkunderline ${
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
              content={content}
              onChangeContent={handleContentChange}
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
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            />

            <PolicyAndProcedureSection
              id="kebijakan"
              isActive={activeSection === "policy and procedure"}
              content={content}
              onChangePolicy={handlePolicyChange}
            />

            <PoliceNumberSection
              id="police"
              isActive={activeSection === "police number"}
              formData={formData}
              content={content}
              onChangeContent={handleContentChange}
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
              handleAddPrice={() =>
                setPrices([...prices, { durasi: "", harga: "" }])
              }
              handleDeletePrice={(index) =>
                setPrices(prices.filter((_, i) => i !== index))
              }
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
