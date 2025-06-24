import { useRef, useState } from "react";
import CarForm from "../../../components/AdminDashboard/Utils/Form/CarForm";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CarGallery from "../../../components/AdminDashboard/Utils/Ui/Gallery/CarGallery";
import CarTable from "../../../components/AdminDashboard/Utils/Table/CarTable";

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
  ]);

  const [images, setImages] = useState([
    "/img/car-1.jpg",
    "/img/car-1.jpg",
    "/img/car-1.jpg",
  ]);

  const formRef = useRef(null);

  const handleSave = () => {
    const data = formRef.current?.getFormData();
    if (!data) return;
    setCars((prev) => [...prev, { ...data, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Car</h3>
          <CarForm ref={formRef} />
          <CarGallery images={images} onDelete={handleDeleteImage} />
          <div className="flex justify-end gap-4">
            <button onClick={handleCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
              Save Changes
            </button>
          </div>
        </div>
        <Dropzone />
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List car unit</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fas fa-filter mr-2"></i>Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              See all
            </button>
          </div>
        </div>
        <CarTable cars={cars} />
      </div>
    </div>
  );
};

export default Car;
