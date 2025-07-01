import { useRef, useState } from "react";
import GuideForm from "../../../components/AdminDashboard/Utils/Form/GuideForm";
import Table from "../../../components/AdminDashboard/Utils/Table/Table"; // Import reusable table

const Guide = () => {
  const [guides, setGuides] = useState([
    {
      id: "001",
      name: "David omstein",
      idguide: "12345678",
      phone: "081111111",
      gender: "Male",
      english: "yes",
      status: "Active",
    },
    {
      id: "002",
      name: "David raya",
      idguide: "12345678",
      phone: "081111111",
      gender: "Male",
      english: "yes",
      status: "Active",
    },
  ]);

  const formRef = useRef(null);

  const columns = ['#', 'Guide ID', 'Guide Name', 'IDguide', 'Phone Number', 'Gender', 'Fluent English', 'Status', 'Action'];


  const handleSave = () => {
    const newData = formRef.current?.getFormData?.();
    if (!newData) return;
    setGuides((prev) => [...prev, { ...newData, status: "Active" }]);
    formRef.current?.resetForm?.();
  };

  const handleCancel = () => {
    formRef.current?.resetForm?.();
  };

  const handleEdit = (guide) => {
    console.log("Edit guide:", guide);
  };

  const handleDelete = (guide) => {
    if (window.confirm(`Are you sure you want to delete ${guide.name}?`)) {
      setGuides((prev) => prev.filter(c => c.id !== guide.id));
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-800">Guide</h3>

          <GuideForm ref={formRef} />

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
              Save Changes
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
          data={guides}
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

export default Guide;
