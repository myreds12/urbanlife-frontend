import { useRef, useState } from "react";
import DriverForm from "../../../components/AdminDashboard/Utils/Form/DriverForm";
import Table from "../../../components/AdminDashboard/Utils/Table/Table"; // Import reusable table

const Driver = () => {
  const [drivers, setDrivers] = useState([
    {
      id: "001",
      name: "Baginda Raja",
      iddriver: "317508",
      phone: "0811111111",
      gender: "Male",
      expiry: "2025-12-12",
      status: "Active",
    },
  ]);

  const formRef = useRef(null);
  const [editId, setEditId] = useState(null); // Untuk tracking data yang sedang di-edit

  const columns = ['#', 'Driver ID', 'Driver Name', 'IDdriver', 'Phone Number', 'Gender', 'Driving Expiry Period', 'Status', 'Action'];

  const handleSave = () => {
    const newData = formRef.current?.getFormData?.();
    if (!newData) return;

    if (editId) {
      // Update data existing
      setDrivers((prev) =>
        prev.map((d) => (d.id === editId ? { ...newData, id: editId, status: d.status } : d))
      );
      setEditId(null);
    } else {
      // Tambah data baru
      const newId = String(drivers.length + 1).padStart(3, "0");
      setDrivers((prev) => [...prev, { ...newData, id: newId, status: "Active" }]);
    }

    formRef.current?.resetForm?.();
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
    setEditId(null);
  };

  const handleEdit = (driver) => {
    formRef.current?.setFormData?.(driver); // Populate form
    setEditId(driver.id); // Tandai sedang edit
  };

  const handleDelete = (driver) => {
    if (window.confirm(`Are you sure you want to delete ${driver.name}?`)) {
      setDrivers((prev) => prev.filter((d) => d.id !== driver.id));
    }
  };

  return (
    <div className="p-6">
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
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            {editId ? "Update Driver" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List Driver Unit</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fas fa-filter mr-2" />
              Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              See all
            </button>
          </div>
        </div>

        <Table
          data={drivers}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          startIndex={0}
        />
      </div>
    </div>
  );
};

export default Driver;
