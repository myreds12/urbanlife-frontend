import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";

const PartnerForm = forwardRef(({}, ref) => {
  const [form, setForm] = useState({
    name: "",
    image: null,
  });

  const dropzoneRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        name: data.name || "",
        image: data.image || null,
      });
      if (dropzoneRef.current) {
        dropzoneRef.current.resetFiles();
        if (data.image) {
          dropzoneRef.current.setExistingFiles([{ name: data.name, url: data.image }]);
        }
      }
    },
    getFormData: () => {
      if (!form.name.trim()) return null;
      const files = dropzoneRef.current?.getFiles() || [];
      const data = {
        name: form.name.trim(),
      };
      if (files.length > 0 && files[0].preview) {
        data.image = files[0]; // Ambil file terbaru dari Dropzone
      } else if (form.image) {
        data.image = form.image; // Kalau ada image lama
      }
      return data;
    },
    resetForm: () => {
      setForm({ name: "", image: null });
      if (dropzoneRef.current) dropzoneRef.current.resetFiles();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Partner Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Partner Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter partner name"
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      {/* Image Upload with Dropzone */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Partner Image
        </label>
        <Dropzone
          ref={dropzoneRef}
          files={form.image ? [form.image] : []}
          setFiles={(files) => setForm((prev) => ({ ...prev, image: files[0] || null }))}
          multiple={false}
          maxFiles={1} 
          title="Upload Partner Image"
          showTitle={false}
          existingFiles={form.image ? [{ name: form.name, url: form.image }] : []}
          setExistingFiles={(files) => {
            if (files.length > 0) setForm((prev) => ({ ...prev, image: files[0].url }));
          }}
          onFilesChange={(files) => {
            if (files.length > 0) setForm((prev) => ({ ...prev, image: files[0] }));
          }}
        />
      </div>
    </div>
  );
});

export default PartnerForm;