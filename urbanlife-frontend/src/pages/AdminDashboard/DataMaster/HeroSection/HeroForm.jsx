import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import toast from "react-hot-toast";
import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const HeroForm = forwardRef(({ isEditing }, ref) => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    status: false,
  });

  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [isValidImage, setIsValidImage] = useState(true);
  const dropzoneRef = useRef(null);

  // Validasi ukuran dan tipe file
  const validateFiles = (uploadedFiles) => {
    for (const file of uploadedFiles) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
    }
    return true;
  };

  // Validasi dimensi gambar (harus 1920x1080)
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width < 1920 || img.height < 1080) {
          toast.error(
            `${file.name} must be at least 1920x1080 pixels (current size: ${img.width}x${img.height})`
          );
          setIsValidImage(false);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast.error(`${file.name} is not a valid image file`);
        setIsValidImage(false);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Handler untuk file upload dengan validasi lengkap
  const handleFilesWithValidation = async (uploadedFiles) => {
    if (!validateFiles(uploadedFiles)) {
      setIsValidImage(false);
      return;
    }

    // Validasi dimensi satu per satu
    for (const file of uploadedFiles) {
      const isValidDimension = await validateImageDimensions(file);
      if (!isValidDimension) {
        setIsValidImage(false);
        return;
      }
    }

    // Semua validasi lolos
    setIsValidImage(true);
    setFiles(uploadedFiles);
  };

  // Handler perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Expose method ke parent via ref
  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        title: data.title || "",
        status: data.status || false,
      });

      if (data.image_url) {
        const fullImageUrl = `${
          apiClient.defaults.baseURL
        }/public/${data.image_url.replace(/uploads[\\/]/, "")}`;
        const mockFile = {
          name: data.title || "image.png",
          preview: fullImageUrl,
          url: fullImageUrl,
        };
        setExistingFiles([mockFile]);
      } else {
        setExistingFiles([]);
      }

      setFiles([]);
      setIsValidImage(true);
      dropzoneRef.current?.resetFiles();
    },

    getFormData: () => {
      if (!form.title.trim()) {
        toast.error("Title is required");
        return null;
      }

      if (!isValidImage) {
        toast.error("Image validation failed. Please upload a valid image.");
        return null;
      }

      const allFiles = dropzoneRef.current?.getFiles() || [];
      if (!isEditing && allFiles.length === 0) {
        toast.error("Please select an image");
        return null;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());

      files.forEach((file) => {
        formData.append("file", file);
      });

      return formData;
    },

    resetForm: () => {
      setForm({ id: "", title: "", status: false });
      setFiles([]);
      setExistingFiles([]);
      setIsValidImage(true);
      dropzoneRef.current?.resetFiles();
    },
  }));

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter hero title"
          required
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hero Image <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Max size: 5MB | Dimensions: 1920x1080px | Formats: JPG, PNG, WebP, SVG
          | Only 1 image allowed
        </p>

        <Dropzone
          ref={dropzoneRef}
          files={files}
          setFiles={setFiles}
          existingFiles={existingFiles}
          setExistingFiles={setExistingFiles}
          onFilesChange={handleFilesWithValidation}
          multiple={false}
          maxFiles={1}
          title="Hero Image Upload"
          required
          showTitle={false}
        />
      </div>

      {/* Current Image Info (when editing) */}
      {isEditing && existingFiles.length > 0 && files.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            📝 Currently using existing image. Upload a new image to replace it.
          </p>
        </div>
      )}
    </div>
  );
});

export default HeroForm;
