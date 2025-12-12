// src/components/AdminDashboard/DayTour/CreateDayTourPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import ItinerarySection from "../../../components/AdminDashboard/DayTour/ItinerarySection";
import PriceSection from "../../../components/AdminDashboard/DayTour/PriceSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PolicyAndProcedureSection from "../../../components/AdminDashboard/RentCar/PolicyAndProcedureSection";

function CreateDayTourPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [guides, setGuides] = useState([]);
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState([]);
  const [content, setContent] = useState([
    { id: null, bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
    { id: null, bahasa: "INDONESIA", deskripsi: "", kebijakan: "" },
  ]);

  const [itinerary, setItinerary] = useState([
    { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "", itinerary_files: [] },
    { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "", itinerary_files: [] },
  ]);

  const [packagePrices, setPackagePrices] = useState([
    { id: null, description: "", harga: "" }
  ]);

  const disabled = false
  const [isLoading, setIsLoading] = useState(false);

  const [deletedItineraryFile, setDeletedItineraryFile] = useState([])

  const [formData, setFormData] = useState({
    nama: "",
    lokasi_id: 1,
    category_id: 0,
    guide_id: 0,
    top_attraction: true,
    durasi: "",
    harga_anak: 0,
    harga_dewasa: 0,
    travel_package_itinerary: itinerary,
    travel_package_content: content,
    travel_package_prices: packagePrices,
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
    setFormData((prev) => ({
      ...prev,
      travel_package_prices: packagePrices,
    }));
  }, [packagePrices]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          { data: locationData },
          { data: categoryData },
          { data: guideData },
          travelData,
        ] = await Promise.all([
          apiClient.get("/lokasi"),
          apiClient.get("/category"),
          apiClient.get("/guide"), // 🔑 endpoint guide
          isEditMode
            ? apiClient.get(`/travel-package/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);
        setCategory(categoryData.data || []);

        setGuides(guideData.data || []); // simpan daftar guide

        if (isEditMode) {
          const travel = travelData.data.data;
          console.log("Raw API data:", travel);
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
            travel_package_prices,
          } = travel;

          // Set form data utama
          setFormData({
            nama: nama || "",
            lokasi_id: lokasi_id || 0,
            category_id: category_id || 0,
            guide_id: travel.guide_id || 0,
            top_attraction: travel.top_attraction,
            durasi: durasi || "",
            harga_anak: parseInt(harga_anak) || 0,
            harga_dewasa: parseInt(harga_dewasa) || 0,
            travel_package_itinerary: travel_package_itinerary || [],
            travel_package_content: travel_package_content?.length
              ? travel_package_content.map((item) => ({
                  id: item.id,
                  bahasa: item.bahasa,
                  deskripsi: item.deskripsi || "",
                  kebijakan: item.kebijakan || "", // Load kebijakan
                }))
              : [
                  { id: null, bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
                  {
                    id: null,
                    bahasa: "INDONESIA",
                    deskripsi: "",
                    kebijakan: "",
                  },
                ],
            travel_package_prices: travel_package_prices || [],
          });

          setContent(
            travel_package_content?.length
              ? travel_package_content.map((item) => ({
                  id: item.id,
                  bahasa: item.bahasa,
                  deskripsi: item.deskripsi || "",
                  kebijakan: item.kebijakan || "", // Load kebijakan
                }))
              : [
                  { id: null, bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
                  {
                    id: null,
                    bahasa: "INDONESIA",
                    deskripsi: "",
                    kebijakan: "",
                  },
                ]
          );

          setItinerary(
            travel_package_itinerary?.length
              ? travel_package_itinerary.map((itinerary) => ({
                ...itinerary,
                itinerary_files: itinerary.itinerary_files?.map((file) => ({
                  id: file.id,
                  url: `${apiClient.defaults.baseURL}/public/${file.url
                    .replace(/\\/g, "/")
                    .replace(/^uploads\//, "")}`,
                  nama_file: file.nama_file,
                })) || [], // Pastikan kita tidak melempar error jika itinerary_files kosong
              }))
              : [
                  { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "", itinerary_files: [] },
                  { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "", itinerary_files: [] },
                ]
          );

          setPackagePrices(
            travel_package_prices?.length 
              ? travel_package_prices 
              : [
                  { id: id, description: "", harga: ""}
                ]
          )

          // Set foto yang sudah ada
          // setExistingPhotos(
          //   (travelPackageFile || []).map((file) => ({
          //     id: file.id,
          //     url: `${apiClient.defaults.baseURL}/public/${file.url
          //       .replace(/\\/g, "/")
          //       .replace(/^uploads\//, "")}`,
          //     nama_file: file.nama_file,
          //   }))
          // );

        }
      } catch (error) {
        toast.error("Failed to get initial data.");
        console.error(error);
      }
    };

    fetchInitialData();
  }, [isEditMode, id]);

  const handleChangeContent = (index, field, value) => {
    setContent((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      setFormData((prevForm) => ({
        ...prevForm,
        travel_package_content: updated,
      }));
      return updated;
    });
  };

  const handlePolicyChange = (index, value) => {
    handleChangeContent(index, "kebijakan", value);
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
      { id: null, bahasa: "ENGLISH", nama: "", deskripsi: "", itinerary_files: [] },
      { id: null, bahasa: "INDONESIA", nama: "", deskripsi: "", itinerary_files: [] },
    ]);
  };

  const handleRemoveItineraryPair = (pairIndex) => {
    const updated = itinerary.filter((_, index) => {
      const pairPosition = Math.floor(index / 2);
      return pairPosition !== pairIndex;
    });
    setItinerary(updated);
  };

  const handlePackagePriceChange = (index, event) => {
    const updatedPackagePrices = [...packagePrices];
    updatedPackagePrices[index][event.target.name] = event.target.value;
    setPackagePrices(updatedPackagePrices);
  };

  const handleAddPackagePricePair = () => {
    const newId = packagePrices.length
      ? packagePrices[packagePrices.length - 1].id + 1
      : 1;
    setPackagePrices([
      ...packagePrices,
      { id: newId, description: "", harga: "" }
    ]);
  };

  const handleRemovePackagePricePair = (index) => {
    const updatedPackagePrices = packagePrices.filter((_, i) => i !== index);
    setPackagePrices(updatedPackagePrices);
  };


  const handleContentChange = (index, field, value) => {
    const updated = [...content];
    updated[index][field] = value;
    setContent(updated);
  };
    // console.log("Policy changed:", index, value);
    // console.log("Content state after update:", content);

  const handleItineraryImageUpload = (pairIndex) => (e) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 0) {
      const updatedItinerary = [...itinerary];

      const idxInd = pairIndex * 2;
      const idxEn = idxInd + 1;

      const currentFilesInd = updatedItinerary[idxInd]?.itinerary_files || [];
      const currentFilesEn = updatedItinerary[idxEn]?.itinerary_files || [];

      const newFilesInd = [...currentFilesInd, ...files];
      const newFilesEn = [...currentFilesEn, ...files];

      updatedItinerary[idxInd] = { ...updatedItinerary[idxInd], itinerary_files: newFilesInd };
      updatedItinerary[idxEn] = { ...updatedItinerary[idxEn], itinerary_files: newFilesEn };

      setItinerary(updatedItinerary);
    }
  };

  const fetchExistingFileAsFile = async (nama_file) => {
    const url = `${apiClient.defaults.baseURL}/public/travel-package/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const removeItineraryFile = (imageIndex, pairIndex, file) => {
    const updatedFiles = (itinerary[pairIndex * 2].itinerary_files || []).filter((_, i) => i !== imageIndex);
    setItinerary((prevItinerary) => {
      const newItinerary = [...prevItinerary];
      newItinerary[pairIndex * 2].itinerary_files = updatedFiles;
      newItinerary[pairIndex * 2 + 1].itinerary_files = updatedFiles;
      return newItinerary;
    });
    setDeletedItineraryFile((prev) => [
      ...prev,
      file
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const payload = new FormData();
    payload.append("nama", formData.nama);
    payload.append("lokasi_id", formData.lokasi_id);
    payload.append("category_id", formData.category_id);
    payload.append("guide_id", formData.guide_id);
    payload.append("durasi", formData.durasi);
    payload.append("harga_anak", formData.harga_anak);
    payload.append("harga_dewasa", formData.harga_dewasa);
    payload.append("top_attraction", formData.top_attraction)

    photos.forEach((file) => {
      payload.append("files", file);
    });

    formData.travel_package_content.forEach((item, index) => {
      if (item.id)
        payload.append(`travel_package_content[${index}][id]`, item.id);
      payload.append(`travel_package_content[${index}][bahasa]`, item.bahasa);
      payload.append(
        `travel_package_content[${index}][deskripsi]`,
        item.deskripsi
      );
      payload.append(
        `travel_package_content[${index}][kebijakan]`,
        item.kebijakan || ""
      );
    });

    formData.travel_package_itinerary.forEach((item, index) => {
      if (item.id)
        payload.append(`travel_package_itinerary[${index}][id]`, item.id);
      payload.append(`travel_package_itinerary[${index}][bahasa]`, item.bahasa);
      payload.append(
        `travel_package_itinerary[${index}][deskripsi]`,
        item.deskripsi
      );
      payload.append(`travel_package_itinerary[${index}][nama]`, item.nama);
      
      if (item.itinerary_files?.length > 0) { 
        item.itinerary_files.forEach((file) => {
          payload.append(`travel_package_itinerary[${index}][itinerary_file]`, file);
        });
      }
    });

    formData.travel_package_prices.forEach((item, index) => {
        payload.append(`travel_package_prices[${index}][id]`, item.id);
        payload.append(`travel_package_prices[${index}][description]`, item.description);
        payload.append(`travel_package_prices[${index}][harga]`, item.harga);
    })

    deletedItineraryFile.forEach((item, index) => {
      payload.append(`travel_package_deleted_itinerary_file`, item.id)
    })

    console.log("=== Payload yang akan dikirim ke API ===");
    // console.log("Payload content:", formData.travel_package_content);

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

  // const handlePhotoUpload = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setPhotos((prev) => [...prev, file]);
  //   }
  // };

  // const removePhoto = (index) => {
  //   setPhotos((prev) => prev.filter((_, i) => i !== index));
  // };

  // const removeExistingPhoto = (index) =>
  //   setExistingPhotos((prev) => prev.filter((_, i) => i !== index));

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen ">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? `Edit Day Tour ${formData.nama}` : "Create Day Tour"}
            </h2>
            <div className="text-sm text-gray-500 mb-6 flex space-x-5">
              {[
                "description",
                // "image",
                "itinerary",
                "price",
                "policy and procedure",
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
              content={formData.travel_package_content}
              onChangeContent={handleChangeContent}
              handleChange={handleChange}
              locations={locations}
              category={category}
              guides={guides}
              type="daytour"
            />

            {/* <ImageSection
              id="image"
              isActive={activeSection === "image"}
              type="daytour"
              photos={photos}
              handlePhotoUpload={handlePhotoUpload}
              removePhoto={removePhoto}
              existingPhotos={existingPhotos}
              removeExistingPhoto={removeExistingPhoto}
            /> */}

            <ItinerarySection
              id="itinerary"
              isActive={activeSection === "itinerary"}
              itinerary={itinerary}
              onChange={handleItineraryChange}
              onAdd={handleAddItineraryPair}
              onRemove={handleRemoveItineraryPair} 
              handleItineraryImageUpload={handleItineraryImageUpload} 
              removeItineraryFile={removeItineraryFile}
            />

            <PriceSection
              id="price"
              isActive={activeSection === "price"}
              formData={formData}
              handleChange={handleChange}
              type={"daytour"} 
              prices={[]}
              handleAddPrice={null}
              handleDeletePrice={null}
              handlePriceChange={null}
              handleAddPackage={handleAddPackagePricePair}
              handleChangePackage={handlePackagePriceChange}
              handleRemovePackage={handleRemovePackagePricePair}
            />

            <PolicyAndProcedureSection
              id="policy and procedure"
              isActive={activeSection === "policy and procedure"}
              content={content}
              onChangePolicy={handlePolicyChange}
            />
          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/day-tour">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              disabled={disabled || isLoading}
              className={`px-4 py-2 text-white rounded-md ${disabled || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-cyan-700 bg-cyan-600"
              }`}
            >
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <svg className="animate-spin w-5 h-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
                </svg>
                  processing...
                </span>
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </main>
      </div>
    </form>
  );
}


export default CreateDayTourPage;