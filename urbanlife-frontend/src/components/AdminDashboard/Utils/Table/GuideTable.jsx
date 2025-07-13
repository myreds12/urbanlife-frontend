import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const GuideTable = ({ guides, onEdit, onDelete, loading }) => {
  if (loading) return <p>Loading...</p>;

  const columns = [
    "#",
    "Guide ID",
    "Guide name",
    "ID",
    "Phone number",
    "Gender",
    "Fluent english",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Guide ID": "id",
    "Guide name": "nama",
    "ID": (row) => row.guide_id ?? "Tidak Ada",
    "Phone number": "nomor_hp",
    "Gender": "gender",
    "Fluent english": (row) => (row.fluent_english ? "Yes" : "No"),
    "Status": (row) => (
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
        {row.createdAt ? "Active" : "Inactive"}
      </span>
    ),
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">List guide</h3>
        <div className="flex gap-2">
          <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
            <i className="fas fa-filter mr-2"></i>Filter
          </button>
          <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
            See all
          </button>
        </div>
      </div>

      <Table
        data={guides}
        columns={columns}
        defaultMapping={defaultMapping}
        onEdit={onEdit}
        onDelete={(row) => onDelete(row.id)}
      />
    </div>
  );
};

export default GuideTable;
