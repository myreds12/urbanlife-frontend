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
    top_attraction: true,
    status: "",
    plat_nomor: "",
    model: "",
    tanggal_pajak_berakhir: "",
    content: DEFAULT_CONTENT,
    durasi: DEFAULT_PRICE,
    kendaraan_id: "",
    driver_id: "", // ✅ Tambahkan field untuk driver
  });

  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [prices, setPrices] = useState(DEFAULT_PRICE);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  console.log(existingPhotos, "existingPhotos");
  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [availableCars, setAvailableCars] = useState([]);
  const [drivers, setDrivers] = useState([]); // ✅ State untuk menyimpan data driver

  useEffect(() => {
    setFormData((prev) => ({ ...prev, content, durasi: prices }));
  }, [content, prices]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          { data: locationData },
          carData,
          availableCarsData,
          driversData, // ✅ Ambil data driver
        ] = await Promise.all([
          apiClient.get("/lokasi?is_active=true"),
          isEditMode
            ? apiClient.get(`/kendaraan/${id}`)
            : Promise.resolve({ data: {} }),
          apiClient.get("/kendaraan?is_rent=false"),
          apiClient.get("/driver"), // ✅ API untuk mendapatkan driver
        ]);
        console.log(carData.data.data, "ini carData");

        setLocations(locationData.data || []);
        setAvailableCars(availableCarsData.data.data || []);
        setDrivers(driversData.data.data || []); // ✅ Simpan data driver

        if (isEditMode) {
          const car = carData.data.data;

          setFormData({
            nama: car.nama || "",
            top_attraction: car.top_attraction,
            lokasi_id: car.lokasi_id || 0,
            status_pajak: car.status_pajak || "",
            // status: car.status || "TERSEDIA DIPESAN",
            status: car.status,
            kapasitas: car.kapasitas || 0,
            plat_nomor: car.plat_nomor || "",
            model: car.model || "",
            tanggal_pajak_berakhir:
              car.tanggal_pajak_berakhir?.split("T")[0] || "",
            content: car.kendaraan_content?.length
              ? car.kendaraan_content
              : DEFAULT_CONTENT,
            durasi: car.kendaraan_durasi?.length
              ? car.kendaraan_durasi
              : DEFAULT_PRICE,
            kendaraan_id: car.id || "",
            driver_id: car.driver_id || "", // ✅ Set driver_id untuk edit mode
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
        toast.error("Failed to get initial data.");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [isEditMode, id]);

  // ✅ Fungsi untuk handle pemilihan kendaraan
  const handleCarSelect = (carId) => {
    const selectedCar = availableCars.find((car) => car.id === parseInt(carId));
    if (selectedCar) {
      setFormData((prev) => ({
        ...prev,
        kendaraan_id: selectedCar.id,
        nama: selectedCar.nama,
        model: selectedCar.model,
        plat_nomor: selectedCar.plat_nomor,
        lokasi_id: selectedCar.lokasi_id,
        kapasitas: selectedCar.kapasitas,
        tanggal_pajak_berakhir:
          selectedCar.tanggal_pajak_berakhir?.split("T")[0] || "",
        status_pajak: selectedCar.status_pajak ? "LUNAS" : "BELUM LUNAS",
      }));

      setExistingPhotos(
        (selectedCar.kendaraan_file || []).map((file) => ({
          id: file.id,
          url: `${apiClient.defaults.baseURL}/public/${file.url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`,
          nama_file: file.nama_file,
        }))
      );
    }
  };

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

  const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/kendaraan/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "content" && key !== "durasi" && key !== "kendaraan_id") {
        payload.append(key, value);
      }
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
      const response = isEditMode || formData.kendaraan_id
        ? await apiClient.patch(`/kendaraan/${id || formData.kendaraan_id}`, payload, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await apiClient.post("/kendaraan", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
        navigate("/admin/rent-car");
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
    "police number",
    "price",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Rent a Car" : "Create Rent a Car"}
            </h2>

            {/* ✅ Select Kendaraan yang Tersedia */}
            <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Available Car
              </h3>
              <div className="flex items-center gap-5 mb-4">
                <label className="block text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-md min-w-[120px]">
                  Available Cars
                </label>
                <select
                  value={formData.kendaraan_id}
                  onChange={(e) => handleCarSelect(e.target.value)}
                  className="input input-bordered w-full py-2 rounded-lg border border-gray-200 shadow-sm"
                  disabled={isEditMode}
                >
                  <option value="">-- Choose a car --</option>
                  {availableCars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.nama} - {car.model} ({car.plat_nomor})
                    </option>
                  ))}
                </select>
              </div>

              {formData.kendaraan_id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>Selected:</strong> {formData.nama} -{" "}
                    {formData.model}
                  </p>
                  {formData.driver_id && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Driver:</strong>{" "}
                      {drivers.find(
                        (d) => d.id === parseInt(formData.driver_id)
                      )?.nama || "Unknown"}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {sections.map((section) => (
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
              content={content}
              onChangeContent={handleContentChange}
              handleChange={handleChange}
              locations={locations}
              type="rentcar"
              drivers={drivers} // ✅ Pass drivers ke DescriptionSection
            />

            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              type="rentcar"
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
            <Link to="/admin/rent-car">
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
