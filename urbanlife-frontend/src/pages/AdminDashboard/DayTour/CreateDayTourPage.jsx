import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import ItinerarySection from "../../../components/AdminDashboard/DayTour/ItinerarySection";
import PriceSection from "../../../components/AdminDashboard/DayTour/PriceSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

function CreateDayTourPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([
    { id: null, bahasa: "ENGLISH", deskripsi: "" },
    { id: null, bahasa: "INDONESIA", deskripsi: "" },
  ]);

  const [itinerary, setItinerary] = useState([
    { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "" },
    { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "" },
  ]);

  const [formData, setFormData] = useState({
    nama: "Wettern and Eastern Nusa Penida Tour",
    lokasi_id: 1,
    category_id: 0,
    durasi: "",
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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [{ data: locationData }, {data: categoryData}, travelData] = await Promise.all([
          apiClient.get("/lokasi"),
          apiClient.get("/category"),
          isEditMode
            ? apiClient.get(`/travel-package/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);
        setCategory(categoryData.data || []);

        if (isEditMode) {
          const travel = travelData.data.data;
          const {
            nama,
            lokasi_id,
            category_id,
            durasi,
            harga_anak,
            harga_dewasa,
            travel_package_content,
            travel_package_itinerary,
            travelPackageFile,
          } = travel;

          // Set form data utama
          setFormData({
            nama: nama || "",
            lokasi_id: lokasi_id || 0,
            category_id: category_id || 0,
            durasi: durasi || "",
            harga_anak: parseInt(harga_anak) || 0,
            harga_dewasa: parseInt(harga_dewasa) || 0,
            travel_package_itinerary: travel_package_itinerary || [],
            travel_package_content: travel_package_content || [],
          });

          // Set konten deskripsi
          setContent(
            travel_package_content || [
              { id: null, bahasa: "ENGLISH", deskripsi: "" },
              { id: null, bahasa: "INDONESIA", deskripsi: "" },
            ]
          );

          // Set itinerary
          setItinerary(
            travel_package_itinerary || [
              { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "" },
              { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "" },
            ]
          );

          // Set foto yang sudah ada
          setExistingPhotos(
            (travelPackageFile || []).map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
            }))
          );
        }
      } catch (error) {
        toast.error("Gagal mengambil data awal");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [isEditMode, id]);

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
      { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "" },
      { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "" },
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
    payload.append("category_id", formData.category_id);
    payload.append("durasi", formData.durasi);
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
      if (item.id) payload.append(`travel_package_itinerary[${index}][id]`, item.id);
      payload.append(`travel_package_itinerary[${index}][bahasa]`, item.bahasa);
      payload.append(
        `travel_package_itinerary[${index}][deskripsi]`,
        item.deskripsi
      );
      payload.append(
        `travel_package_itinerary[${index}][nama]`,
        item.nama
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
      const response = isEditMode
        ? await apiClient.patch(`/travel-package/${id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        : await apiClient.post("/travel-package", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
        navigate("/admin/day-tour");
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

  const removeExistingPhoto = (index) =>
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen ">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Day Tour" : "Create Day Tour"}
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
              category={category}
              type="daytour"
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