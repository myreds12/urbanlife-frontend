import { useRef, useState } from "react";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm from "../../../components/AdminDashboard/Utils/Form/CountryForm";
import Table from '../../../components/AdminDashboard/Utils/Table/Table';

const Country = () => {
  const [countries, setCountries] = useState([
    { id: "001", name: "Indonesia", status: "Active" },
    { id: "002", name: "Vietnam", status: "Active" },
  ]);

  const formRef = useRef(null);

  const handleSave = () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;
    
    // Generate ID untuk country baru
    const newId = String(countries.length + 1).padStart(3, '0');
    setCountries((prev) => [...prev, { ...newData, id: newId, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  const handleEdit = (country) => {
    console.log("Edit country:", country);
    // Implementasi logic edit di sini
    // Misalnya bisa populate form dengan data yang akan di-edit
    // formRef.current?.setFormData(country);
  };

  const handleDelete = (country) => {
    if (window.confirm(`Are you sure you want to delete ${country.name}?`)) {
      setCountries((prev) => prev.filter(c => c.id !== country.id));
    }
  };

  // Define columns untuk table
  const columns = ['#','Country ID', 'Name', 'Status', 'Action'];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Countries</h3>
          <CountryForm ref={formRef} />
          <Dropzone />
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

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Countries List</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                <i className="fas fa-filter mr-2"></i>Filter
              </button>
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                See all
              </button>
            </div>
          </div>
          
          {/* Menggunakan reusable Table component */}
          <Table
            data={countries}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            startIndex={0}
          />
        </div>
      </div>
    </div>
  );
};

export default Country;