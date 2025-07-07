import { forwardRef, useImperativeHandle, useState } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const CountryForm = forwardRef((_, ref) => {
  const [form, setForm] = useState({
    id: "",
    kode: "",
    nama: "",
  });

  const [imageFile, setImageFile] = useState([]);
  const [existingImage, setExistingImage] = useState([]);

  useImperativeHandle(ref, () => ({
    setFormData(data) {
      setForm({
        id: data.id || "",
        kode: data.kode || "",
        nama: data.nama || "",
      });

      if (data.url) {
        const fullImageUrl = `${
          apiClient.defaults.baseURL
        }/public/${data.url.replace("uploads\\", "")}`;

        const mockFile = {
          name: data.nama_file || "image.png",
          preview: fullImageUrl,
          url: fullImageUrl,
        };
        setExistingImage([mockFile]);
      } else {
        setExistingImage([]);
      }

      setImageFile([]);
    },

    getFormData() {
      return {
        ...form,
        file: imageFile.length > 0 ? imageFile[0] : null,
      };
    },

    resetForm() {
      setForm({ id: "", kode: "", nama: "" });
      setImageFile([]);
      setExistingImage([]);
    },
  }));

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country Name
          </label>
          <input
            type="text"
            name="nama"
            placeholder="Enter country name"
            value={form.nama}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country Code
          </label>
          <input
            type="text"
            name="kode"
            placeholder="Enter country code"
            value={form.kode}
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
      </div>

      <div>
        <Dropzone
          files={imageFile}
          setFiles={setImageFile}
          multiple={false}
          existingFiles={existingImage}
        />
      </div>
    </div>
  );
});

export default CountryForm;
