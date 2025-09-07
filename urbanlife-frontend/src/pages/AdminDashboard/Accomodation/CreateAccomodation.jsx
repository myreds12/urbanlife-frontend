import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import RoomAndPriceSection from "../../../components/AdminDashboard/Accommodation/RoomAndPriceSection";
import FacilitySection from "../../../components/AdminDashboard/Accommodation/FacilitySection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PolicyAndProcedureSection from "../../../components/AdminDashboard/RentCar/PolicyAndProcedureSection";

const CreateAccomodationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");

  const [content, setContent] = useState([
    {
      id: null,
      bahasa: "INDONESIA",
      deskripsi: "",
      informasi: "",
      kebijakan: "",
    },
    {
      id: null,
      bahasa: "ENGLISH",
      deskripsi: "",
      informasi: "",
      kebijakan: "",
    },
  ]);

  const [roomPrices, setRoomPrices] = useState([
    {
      nama: "",
      harga: 0,
      images: [],
      temp_id: `room_${Date.now()}`,
    },
  ]);

  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 0,
    top_attraction: true,
    kategori: "Hotel",
    tipe: "hotel",
    akomodasi_content: content,
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [{ data: locationData }, akomodasiData] = await Promise.all([
          apiClient.get("/lokasi?is_active=true"),
          isEditMode
            ? apiClient.get(`/akomodasi/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);

        if (isEditMode) {
          const akomodasi = akomodasiData.data.data;
          const {
            nama,
            lokasi_id,
            kategori,
            tipe,
            top_attraction,
            akomodasi_content,
            akomodasi_room_and_price,
            akomodasi_facility_group,
            akomodasi_file,
          } = akomodasi;

          setFormData({
            nama: nama || "",
            lokasi_id: lokasi_id || 0,
            kategori: kategori || "Hotel",
            top_attraction: top_attraction,
            tipe: tipe || "hotel",
          });

          setContent(
            akomodasi_content?.length > 0
              ? akomodasi_content.map((item) => ({
                id: item.id,
                bahasa: item.bahasa,
                deskripsi: item.deskripsi,
                informasi: item.informasi,
                kebijakan: item.kebijakan,
              }))
              : [...content]
          );

          setRoomPrices(
            akomodasi_room_and_price?.map((room) => ({
              id: room.id,
              nama: room.nama,
              harga: parseInt(room.harga) || 0,
              images:
                room.AkomodasiFile?.map((file) => ({
                  id: file.id,
                  nama_file: file.nama_file,
                  url: file.url,
                  isExisting: true, // Flag untuk membedakan gambar existing
                })) || [],
              temp_id: room.id ? `room_${room.id}` : `room_${Date.now()}`,
            })) || []
          );

          setFacilities(
            akomodasi_facility_group?.map((group) => ({
              id: group.id,
              nama: group.nama,
              type: group.type,
              fasilitas:
                group.fasilitas?.map((f) => ({
                  id: f.id,
                  nama: f.nama,
                  facility_group_id: f.facility_group_id,
                })) || [],
            })) || []
          );

          setExistingPhotos(
            akomodasi_file?.map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
              type: file.type,
            })) || []
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
    const { name, value, files, type } = e.target;
    const parsedValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : parsedValue,
    }));
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
    setRoomPrices([
      ...roomPrices,
      {
        nama: "",
        harga: 0,
        images: [],
        temp_id: `room_${Date.now()}`,
      },
    ]);
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

  const handleRoomImageUpload = (roomIndex) => (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const updatedRoomPrices = [...roomPrices];
      const currentImages = updatedRoomPrices[roomIndex].images || [];
      updatedRoomPrices[roomIndex].images = [...currentImages, ...files];
      setRoomPrices(updatedRoomPrices); // Simpan di roomPrices[index].images
    }
  };

  const handleContentChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };

  const handlePolicyChange = (index, value) =>
    handleContentChange(index, "kebijakan", value);

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  const moveSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/akomodasi/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "akomodasi_content") payload.append(key, value);
    });

    content.forEach((item, i) => {
      if (item.id) payload.append(`akomodasi_content[${i}][id]`, item.id);
      payload.append(`akomodasi_content[${i}][bahasa]`, item.bahasa);
      payload.append(`akomodasi_content[${i}][deskripsi]`, item.deskripsi);
      payload.append(
        `akomodasi_content[${i}][informasi]`,
        item.informasi || ""
      );
      payload.append(
        `akomodasi_content[${i}][kebijakan]`,
        item.kebijakan || ""
      );
    });

    roomPrices.forEach((item, i) => {
      if (item.id) payload.append(`akomodasi_room[${i}][id]`, item.id);
      payload.append(`akomodasi_room[${i}][nama]`, item.nama);
      payload.append(`akomodasi_room[${i}][harga]`, item.harga);

      const roomIdentifier = item.temp_id || `room_${item.id || Date.now()}`;
      payload.append(`akomodasi_room[${i}][temp_id]`, roomIdentifier);

      item.images?.forEach((img) => {
        if (!img.toBeDeleted) {
          // Hanya tambahkan gambar yang tidak ditandai untuk dihapus
          if (img.isExisting) {
            payload.append(`room_room_${img.id}`, img); // Menggunakan id untuk gambar yang ada
          } else {
            payload.append(`room_${roomIdentifier}`, img); // Untuk gambar baru
          }
        }
      });
    });

    facilities.forEach((facility, i) => {
      if (facility.id)
        payload.append(`akomodasi_facility[${i}][id]`, facility.id);
      payload.append(`akomodasi_facility[${i}][nama]`, facility.nama);
      payload.append(`akomodasi_facility[${i}][type]`, facility.type);

      facility.fasilitas.forEach((f, j) => {
        if (f.id)
          payload.append(`akomodasi_facility[${i}][fasilitas][${j}][id]`, f.id);
        payload.append(
          `akomodasi_facility[${i}][fasilitas][${j}][nama]`,
          f.nama
        );
      });
    });

    const existingFileObjects = await Promise.all(
      existingPhotos.map((f) => fetchExistingFileAsFile(f.nama_file))
    );
    existingFileObjects.forEach((file) => {
      payload.append("files", file);
    });

    console.log("=== Payload yang akan dikirim ke API ===");
    for (let [key, value] of payload.entries()) {
      if (value instanceof File) {
        console.log(`${key}:[File: ${value.name}]`);
      } else {
        console.log(`${key}:${value}`);
      }
    }

    try {
      const res = !isEditMode
        ? await apiClient.post("/akomodasi", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        : await apiClient.patch(`/akomodasi/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (res.status === 201 || res.status === 200) {
        toast.success("Akomodasi berhasil disimpan");
        navigate("/admin/accommodation");
      } else {
        toast.error(res.data.message || "Gagal menyimpan akomodasi");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
      console.error("Submission error:", err);
    }
  };

  const sections = [
    "description",
    "image",
    "room and price",
    "facility",
    "policy and procedure",
  ];

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
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
              type="accommodation"
            />
            <ImageSection
              id="image"
              isActive={activeSection === "image"}
              type={"accommodation"}
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            />
            <RoomAndPriceSection
              id="room and price"
              isActive={activeSection === "room and price"}
              roomPrices={roomPrices}
              onChange={handleChangePrice}
              onAdd={handleAddPrice}
              onRemove={handleRemovePrice}
              handleRoomImageUpload={handleRoomImageUpload}
            />
            <FacilitySection
              id="facility"
              isActive={activeSection === "facility"}
              facilities={facilities}
              setFacilities={setFacilities}
              roomPrices={roomPrices}
              formData={formData}
            />
            <PolicyAndProcedureSection
              id="policy and procedure"
              isActive={activeSection === "policy and procedure"}
              content={content}
              onChangePolicy={handlePolicyChange}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/accommodation">
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
