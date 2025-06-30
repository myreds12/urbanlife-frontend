import { useRef, useState } from "react";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm from "../../../components/AdminDashboard/Utils/Form/CountryForm";
import CountryTable from "../../../components/AdminDashboard/Utils/Table/CountryTable";

const Country = () => {
  const [countries, setCountries] = useState([
    { id: "001", name: "Indonesia", status: "Active" },
    { id: "002", name: "Vietnam", status: "Active" },
  ]);

  const formRef = useRef(null);

  const handleSave = () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;
    setCountries((prev) => [...prev, { ...newData, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Countries</h3>
          <CountryForm ref={formRef} />
          <Dropzone />
          <div className="flex justify-end gap-4">
            <button onClick={handleCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Countries List</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
                <i className="fas fa-filter mr-2"></i>Filter
              </button>
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
                See all
              </button>
            </div>
          </div>
          <CountryTable countries={countries} />
        </div>
      </div>
    </div>
  );
};

export default Country;
