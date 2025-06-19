import { useRef, useState } from "react";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm, {
  type CountryFormHandle,
  type Country,
} from "../../../components/AdminDashboard/Utils/Form/CountryForm";
import CountryTable from "../../../components/AdminDashboard/Utils/Table/CountryTable";

const Country = () => {
  const [countries, setCountries] = useState<Country[]>([
    { id: "001", name: "Indonesia", status: "Active" },
    { id: "002", name: "Vietnam", status: "Active" },
  ]);

  const formRef = useRef<CountryFormHandle>(null);

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
        {/* LEFT: WRAPPER */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Countries</h3>

          {/* Form input (tanpa tombol) */}
          <CountryForm ref={formRef} />

          {/* Dropzone */}
          <Dropzone />

          {/* Tombol pindah ke bawah Dropzone */}
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

        {/* RIGHT: Table */}
        <CountryTable countries={countries} />
      </div>
    </div>
  );
};

export default Country;
