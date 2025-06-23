import { useRef, useState } from "react";
import CityForm from "../../../components/AdminDashboard/Utils/Form/CityForm";
import CityTable from "../../../components/AdminDashboard/Utils/Table/CityTable";

const City = () => {
  const [cities, setCities] = useState([
    { id: "001", country: "Indonesia", name: "Jakarta", status: "Active" },
    { id: "002", country: "Vietnam", name: "Ho chi minh city", status: "Active" },
  ]);

  const formRef = useRef(null);

  const handleSave = () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;
    setCities((prev) => [...prev, { ...newData, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Cities</h3>
          <CityForm ref={formRef} />
          <div className="flex justify-end gap-4">
            <button onClick={handleCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={handleSave} className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">List Cities</h3>
            <div className="flex gap-2">
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
                <i className="fas fa-filter mr-2"></i>Filter
              </button>
              <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
                See all
              </button>
            </div>
          </div>
          <CityTable cities={cities} />
        </div>
      </div>
    </div>
  );
};

export default City;
