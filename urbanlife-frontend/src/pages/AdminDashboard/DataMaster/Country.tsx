import { useState } from "react";
import Dropzone from "../../../components/AdminDashboard/Utils/Form/DropZone";
import CountryForm from "../../../components/AdminDashboard/Utils/Form/CountryForm";
import CountryTable from "../../../components/AdminDashboard/Utils/Table/CountryTable";

const Country = () => {
  const [countries, setCountries] = useState([
    { id: "001", name: "Indonesia", status: "Active" },
    { id: "002", name: "Vietnam", status: "Active" },
  ]);

  const handleAddCountry = (newCountry: { id: string; name: string }) => {
    if (!newCountry.id || !newCountry.name) return;
    setCountries((prev) => [...prev, { ...newCountry, status: "Active" }]);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SIDE: FORM + DROPZONE WRAPPED */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Countries</h3>
          <CountryForm onSubmit={handleAddCountry} />
          <Dropzone />
        </div>

        {/* RIGHT SIDE: TABLE */}
        <CountryTable countries={countries} />
      </div>
    </div>
  );
};

export default Country;
