import { useRef, useState } from "react";
import DriverForm, {
  type Driver,
  type DriverFormHandle,
} from "../../../components/AdminDashboard/Utils/Form/DriverForm";
import DriverTable from "../../../components/AdminDashboard/Utils/Table/DriverTable";

const Driver = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: "001",
      brand: "toyota",
      model: "supra",
      phone: "0811111111",
      gender: "Male",
      expiry: "2025-12-12",
      status: "Active",
    },
    {
      id: "002",
      brand: "toyota",
      model: "kijang",
      phone: "0811111111",
      gender: "Male",
      expiry: "2025-12-12",
      status: "Active",
    },
  ]);

  const formRef = useRef<DriverFormHandle>(null);

  const handleSave = () => {
    const newData = formRef.current?.getFormData();
    if (!newData) return;
    setDrivers((prev) => [...prev, { ...newData, status: "Active" }]);
    formRef.current?.resetForm();
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
  };

  return (
    <div className="p-6">
      {/* FORM */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Driver</h3>

        <DriverForm ref={formRef} />

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List driver unit</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fas fa-filter mr-2"></i>Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              See all
            </button>
          </div>
        </div>
        <DriverTable drivers={drivers} />
      </div>
    </div>
  );
};

export default Driver;
