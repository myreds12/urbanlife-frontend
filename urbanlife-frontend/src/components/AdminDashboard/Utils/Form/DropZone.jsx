import { useDropzone } from "react-dropzone";
import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { Trash2, X } from "lucide-react";
import ComponentCard from "../../common/ComponentCard";

const Dropzone = forwardRef(({
  files = [],
  setFiles,
  multiple = true,
  maxFiles = 5,
  title = "Upload Files",
  showTitle = true,
  existingFiles = [],
  setExistingFiles = () => {},
  onFilesChange = () => {},
}, ref) => {
  const [preview, setPreview] = useState(null);
  const [existing, setExisting] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setExisting(existingFiles || []);
  }, [existingFiles]);

  useEffect(() => {
    setUploadedFiles([...existing, ...files]);
  }, [existing, files]);

  const onDrop = (acceptedFiles) => {
    const withPreview = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const updatedFiles = multiple ? [...files, ...withPreview] : withPreview;

    if (updatedFiles.length <= maxFiles) {
      setFiles(updatedFiles);
      setUploadedFiles([...existing, ...updatedFiles]);
      onFilesChange(updatedFiles);
    }
  };

  useImperativeHandle(ref, () => ({
    resetFiles: () => {
      setFiles([]);
      setExisting([]);
      setUploadedFiles([]);
      onFilesChange([]);
    },
    getFiles: () => [...existing, ...files],
  }));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple,
  });

  const handleRemoveNewFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleRemoveExistingFile = (index) => {
    const updated = [...existing];
    updated.splice(index, 1);
    setExisting(updated);
    setExistingFiles(updated);
  };

  return (
    <ComponentCard title={showTitle ? title : ""}>
      <div
        {...getRootProps()}
        className={`border border-dashed rounded-xl transition p-10 cursor-pointer 
        ${isDragActive ? "border-cyan-600 bg-gray-50" : "border-gray-200 bg-white"}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-[68px] h-[68px] flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
            📁
          </div>
          <h4 className="text-lg font-semibold text-gray-800">
            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
          </h4>
          <p className="text-sm text-gray-500">
            Drag and drop your PNG, JPG, WebP, SVG images here or browse
            {multiple && ` (Max: ${maxFiles} files)`}
          </p>
          <span className="font-medium text-cyan-600 underline text-sm">
            Browse File
          </span>

          {uploadedFiles.length > 0 && (
            <div className="mt-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} uploaded
            </div>
          )}
        </div>
      </div>

      {/* FILE BARU */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
            >
              <button
                onClick={() => setPreview(file.preview)}
                className="text-sm tex-cyan-600 hover:underline truncate max-w-[240px] text-left"
                title={file.name}
              >
                🖼️ {file.name}
              </button>
              <button
                onClick={() => handleRemoveNewFile(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* FILE LAMA */}
      {existing.length > 0 && (
        <div className="mt-4 space-y-2">
          {existing.map((file, idx) => (
            <div
              key={file.id || idx}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
            >
              <button
                onClick={() => setPreview(file.url)}
                className="text-sm text-cyan-600 hover:underline truncate max-w-[240px] text-left"
                title={file.name}
              >
                🌐 {file.name}
              </button>
              <button
                onClick={() => handleRemoveExistingFile(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white p-4 rounded-lg relative max-w-xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <img src={preview} alt="Preview" className="w-full h-auto rounded" />
          </div>
        </div>
      )}
    </ComponentCard>
  );
});

Dropzone.displayName = "Dropzone";

export default Dropzone;
