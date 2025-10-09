import React, { useEffect, useState } from "react";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import toast from "react-hot-toast";

export default function LogoFavicon() {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewFavicon, setPreviewFavicon] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    if (image.url) {
      const fixedUrl = image.url
        .replace(/^\/uploads\//, "/public/")
        .replace(/\\/g, "/");

      return `${apiClient.defaults.baseURL.replace(/\/$/, "")}${fixedUrl}`;
    }

    if (typeof image === "string") {
      const fixedUrl = image
        .replace(/^\/uploads\//, "/public/")
        .replace(/\\/g, "/");

      return `${apiClient.defaults.baseURL.replace(/\/$/, "")}${fixedUrl}`;
    }

    return "";
  };


  const fetchData = async () => {
    try {
      const res = await apiClient.get("/logo");
      const result = res.data;

      if (Array.isArray(result.data)) {
        const logo = result.data.find((x) => x.type === "logo");
        const favicon = result.data.find((x) => x.type === "favicon");

        if (logo) setPreviewLogo(getImageUrl(logo));
        if (favicon) setPreviewFavicon(getImageUrl(favicon));
      }
    } catch (err) {
      toast.error("Failed to load existing logo & favicon");
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "logo") {
        setLogo(file);
        setPreviewLogo(url);
      } else {
        setFavicon(file);
        setPreviewFavicon(url);
      }
    }
  };

  const handleSubmit = async () => {
    if (!logo && !favicon) return toast.error("Please select a file first!");
    setLoading(true);

    try {
      const formData = new FormData();
      if (logo) {
        formData.append("files", logo);
        formData.append("types", "logo");
      }
      if (favicon) {
        formData.append("files", favicon);
        formData.append("types", "favicon");
      }

      await apiClient.post("/logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Upload successful!");
      setLogo(null);
      setFavicon(null);
      fetchData();
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-semibold mb-5 text-center text-gray-700">
        Upload Logo & Favicon
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col items-center border rounded-lg p-4 hover:bg-gray-50 transition">
          <label className="block mb-2 font-medium text-gray-600">Logo Website</label>
          {previewLogo && (
            <img
              src={previewLogo}
              alt="Logo Preview"
              className="object-contain border rounded-md mb-3 shadow max-h-32"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "logo")}
            className="text-sm text-gray-600"
          />
        </div>

        <div className="flex flex-col items-center border rounded-lg p-4 hover:bg-gray-50 transition">
          <label className="block mb-2 font-medium text-gray-600">Favicon</label>
          {previewFavicon && (
            <img
              src={previewFavicon}
              alt="Favicon Preview"
              className="object-contain border rounded-md mb-3 shadow max-h-16"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "favicon")}
            className="text-sm text-gray-600"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
