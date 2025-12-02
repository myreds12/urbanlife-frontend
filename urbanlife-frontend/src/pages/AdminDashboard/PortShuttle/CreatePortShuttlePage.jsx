import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionSection from "../../../components/AdminDashboard/DayTour/DescriptionSection";
import ImageSection from "../../../components/AdminDashboard/DayTour/ImageSection";
import "../../../styles/AdminDashboard/DayTour/DayTour.css";
import toast from "react-hot-toast";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import PolicyAndProcedureSection from "../../../components/AdminDashboard/RentCar/PolicyAndProcedureSection";

const CreatePortShuttlePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  const [locations, setLocations] = useState([]);
  const [activeSection, setActiveSection] = useState("description");
  const [content, setContent] = useState([
    { id: null, bahasa: "ENGLISH", deskripsi: "", kebijakan: "" },
    { id: null, bahasa: "INDONESIA", deskripsi: "", kebijakan: "" },
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    lokasi_id: 0,
    top_attraction: true,
  });


  useEffect(() => {
    setFormData((prev) => ({ ...prev, content }));
  }, [content]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          { data: locationData },
          portData
        ] = await Promise.all([
          apiClient.get("/lokasi?is_active=true"),
          isEditMode
            ? apiClient.get(`/port-shuttle/${id}`)
            : Promise.resolve({ data: {} }),
        ]);

        setLocations(locationData.data || []);

        if (isEditMode) {
          const port = portData.data.data;

          setFormData({
            nama: port.nama || "",
            harga: port.harga || "",
            top_attraction: port.top_attraction,
            lokasi_id: port.lokasi_id || 0,
            content: port.port_shuttle_content?.length
              ? port.port_shuttle_content
              : DEFAULT_CONTENT,
            port_shuttle_id: port.id || "",
          });

          setExistingPhotos(
            (port.port_shuttle_file || []).map((file) => ({
              id: file.id,
              url: `${apiClient.defaults.baseURL}/public/${file.url
                .replace(/\\/g, "/")
                .replace(/^uploads\//, "")}`,
              nama_file: file.nama_file,
            }))
          );

          setContent(port.port_shuttle_content || DEFAULT_CONTENT);
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
    const url = `${apiClient.defaults.baseURL}/public/port-shuttle/${nama_file}`;
    const response = await fetch(url);
    const blob = await response.blob();
    const type = blob.type || "application/octet-stream";
    return new File([blob], nama_file, { type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "content" && key !== "durasi" && key !== "port_shuttle_id") {
        payload.append(key, value);
      }
    });

    content.forEach((item, i) => {
      payload.append(`port_shuttle_content[${i}][bahasa]`, item.bahasa);
      payload.append(`port_shuttle_content[${i}][deskripsi]`, item.deskripsi);
      payload.append(`port_shuttle_content[${i}][kebijakan]`, item.kebijakan);
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
      const response = isEditMode || formData.port_shuttle_id
        ? await apiClient.patch(`/port-shuttle/${id || formData.port_shuttle_id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        : await apiClient.post("/port-shuttle", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if ([200, 201].includes(response.status)) {
        toast.success(
          isEditMode ? "Updated successfully" : "Created successfully"
        );
        navigate("/admin/port-shuttle");
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
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex h-screen">
        <main className="p-1 flex-1">
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              {isEditMode ? "Edit Port Shuttle" : "Create Port Shuttle"}
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
              type="port_shuttle"
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

          </div>

          <div className="flex justify-end gap-3 px-6 pb-6">
            <Link to="/admin/port-shuttle">
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

export default CreatePortShuttlePage;
