import { useRef, useState } from "react";
import CarForm from "../../../components/AdminDashboard/Utils/Form/CarForm";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CarGallery from "../../../components/AdminDashboard/Utils/Ui/Gallery/CarGallery";
import Table from "../../../components/AdminDashboard/Utils/Table/Table";

const Car = () => {
  const [cars, setCars] = useState([
    {
      id: "001",
      brand: "Toyota",
      model: "Alphard",
      policeNumber: "B 1234 KKP",
      taxStatus: "Active",
      taxExpiry: "2025-12-12",
      status: "Active",
    },
    {
      id: "002",
      brand: "Toyota",
      model: "Alphard",
      policeNumber: "B 1234 KKO",
      taxStatus: "Active",
      taxExpiry: "2025-12-12",
      status: "Inactive",
    },

  ]);

  const columns = ['#', 'Unit ID', 'Brand', 'Model', 'PoliceNumber', 'TaxStatus', 'TaxExpiry', 'Status', 'Action'];

  // State untuk images - mulai dengan array kosong
  const [images, setImages] = useState([]);

  const formRef = useRef(null);
  const dropzoneRef = useRef(null);

  const handleSave = () => {
    const data = formRef.current?.getFormData();
    if (!data) return;
    
    // Generate ID untuk car baru
    const newId = String(cars.length + 1).padStart(3, '0');
    setCars((prev) => [...prev, { ...data, id: newId, status: "Active" }]);
    
    // Reset form dan images
    formRef.current?.resetForm();
    
    // Clean up object URLs
    images.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImages([]);
    dropzoneRef.current?.resetFiles();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    
    // Clean up object URLs
    images.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setImages([]);
    dropzoneRef.current?.resetFiles();
  };

  // Handle files dari Dropzone
  const handleFilesChange = (files) => {
    // Clean up previous URLs to prevent memory leaks
    images.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    const newImages = files.map(file => {
      // Convert file ke object URL untuk preview
      return URL.createObjectURL(file);
    });
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => {
      // Revoke object URL untuk prevent memory leaks
      if (prev[index] && prev[index].startsWith('blob:')) {
        URL.revokeObjectURL(prev[index]);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleEdit = (car) => {
    console.log("Edit car:", car);
  };

  const handleDelete = (car) => {
    if (window.confirm(`Are you sure you want to delete ${car.brand} ${car.model}?`)) {
      setCars((prev) => prev.filter(c => c.id !== car.id));
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Add New Car</h3>
          <CarForm ref={formRef} />
          
          {/* Car Gallery - Show uploaded images */}
          {images.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Car Images ({images.length})
              </label>
              <CarGallery images={images} onDelete={handleDeleteImage} />
            </div>
          )}
          
          <div className="flex justify-end gap-4">
            <button 
              onClick={handleCancel} 
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
                  {/* Dropzone */}
        <Dropzone 
          ref={dropzoneRef}
          onFilesChange={handleFilesChange}
          maxFiles={10}
          showTitle={false}
        />

        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List Car Units</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <i className="fas fa-filter mr-2"></i>Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              See all
            </button>
          </div>
        </div>
        <Table
          data={cars}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          startIndex={0}
        />
      </div>
    </div>
  );
};

export default Car;