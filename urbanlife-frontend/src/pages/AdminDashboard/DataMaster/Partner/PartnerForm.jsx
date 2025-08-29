import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";

const PartnerForm = forwardRef(({}, ref) => {
  const [form, setForm] = useState({
    nama: "", // Ubah dari name ke nama
    file: null, // Ubah dari image ke file
  });

  const dropzoneRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        nama: data.nama || "", // Ubah dari name ke nama
        file: null, // Jangan set file kecuali file baru
      });
      if (dropzoneRef.current) {
        dropzoneRef.current.resetFiles();
      }
    },

    getFormData: () => {
      if (!form.nama.trim()) return null; // Ubah dari name ke nama
      const files = dropzoneRef.current?.getFiles() || [];
      console.log("Files from Dropzone:", files);
      console.log("Form file type:", typeof form.file, form.file);
      const data = {
        nama: form.nama.trim(), // Ubah dari name ke nama
      };
      if (files.length > 0 && files[0] instanceof File) {
        data.file = files[0]; // Ubah dari image ke file
      } else if (form.file instanceof File) {
        data.file = form.file; // Ubah dari image ke file
      }
      console.log("Data sent:", data);
      return data;
    },
    resetForm: () => {
      setForm({ nama: "", file: null }); // Ubah dari name, image ke nama, file
      if (dropzoneRef.current) dropzoneRef.current.resetFiles();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Partner Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Partner Name
        </label>
        <input
          type="text"
          name="nama" // Ubah dari name ke nama
          placeholder="Enter partner name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.nama} // Ubah dari name ke nama
          onChange={handleChange}
        />
      </div>

      {/* Image Upload with Dropzone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Partner Image
        </label>
      <Dropzone
        ref={dropzoneRef}
        files={form.file ? [form.file] : []} // Ubah dari image ke file
        setFiles={(files) =>
          setForm((prev) => ({ ...prev, file: files[0] || null })) // Ubah dari image ke file
        }
        multiple={false}
        maxFiles={1}
        title="Upload Partner Image"
        showTitle={false}
        existingFiles={
          form.file ? [{ name: form.nama, url: form.file }] : [] // Ubah dari name, image ke nama, file
        }
        setExistingFiles={(files) => {
          if (files.length > 0)
            setForm((prev) => ({ ...prev, file: files[0].url })); // Ubah dari image ke file
        }}
        onFilesChange={(files) => {
          if (files.length > 0)
            setForm((prev) => ({ ...prev, file: files[0] })); // Ubah dari image ke file
        }}
      />
    </div>
  </div>
  );
});

export default PartnerForm;