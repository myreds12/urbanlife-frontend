import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import Dropzone from "../../../../components/AdminDashboard/Utils/Form/DropZone";
import toast from "react-hot-toast";

const HeroForm = forwardRef(({ isEditing }, ref) => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
  });

  const [files, setFiles] = useState([]); 
  const [existingFiles, setExistingFiles] = useState([]);
  const dropzoneRef = useRef(null);

  const validateFiles = (uploadedFiles) => {
    for (const file of uploadedFiles) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
    }
    return true;
  };

  const onFilesChange = (uploadedFiles) => {
    if (!validateFiles(uploadedFiles)) {
      return;
    }
    setFiles(uploadedFiles);
  };

  useImperativeHandle(ref, () => ({
    setFormData: (data) => {
      setForm({
        id: data.id || "",
        title: data.title || "",
        description: data.description || "",
      });
      
      // Set existing files for editing
      if (data.image_url) {
        setExistingFiles([{
          id: data.id,
          name: "Current Hero Image",
          url: data.image_url
        }]);
      }
    },
    getFormData: () => {
      if (!form.title.trim()) {
        toast.error("Title is required");
        return null;
      }

      // Check if we have at least one image (new or existing)
      const allFiles = dropzoneRef.current?.getFiles() || [];
      if (!isEditing && allFiles.length === 0) {
        toast.error("Please select an image");
        return null;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      
      // Add new uploaded files
      files.forEach((file) => {
        formData.append("image", file);
      });

      return formData;
    },
    resetForm: () => {
      setForm({ 
        id: "", 
        title: "", 
        description: ""
      });
      setFiles([]);
      setExistingFiles([]);
      dropzoneRef.current?.resetFiles();
    },
  }));

  const validateImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Check minimum dimensions (10x10px as requested)
        if (img.width < 10 || img.height < 10) {
          toast.error(`${file.name} dimensions must be at least 10x10 pixels`);
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast.error(`${file.name} is not a valid image file`);
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFilesWithDimensionCheck = async (uploadedFiles) => {
    for (const file of uploadedFiles) {
      const isValidDimension = await validateImage(file);
      if (!isValidDimension) {
        return;
      }
    }
    onFilesChange(uploadedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      {/* Description
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Enter hero description (optional)"
          rows={3}
          className="input input-bordered w-full rounded-lg border border-gray-200 shadow-sm resize-none"
          value={form.description}
          onChange={handleChange}
        />
      </div> */}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hero Image <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Max size: 5MB | Min dimensions: 10x10px | Formats: JPG, PNG, WebP, SVG | Only 1 image allowed
        </p>
        
        <Dropzone
          ref={dropzoneRef}
          files={files}
          setFiles={setFiles}
          existingFiles={existingFiles}
          setExistingFiles={setExistingFiles}
          onFilesChange={handleFilesWithDimensionCheck}
          multiple={false}
          maxFiles={1}
          title="Hero Image Upload"
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