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
    "Guide ID": (row) => row.id || "-",
    "Guide name": (row) => row.nama || "-",
    "ID": (row) => row.guide_id || "-",
    "Phone number": (row) => row.nomor_hp || "-",
    "Gender": (row) => row.gender || "-",
    "Fluent english": (row) => (row.fluent_english ? "Yes" : "No"),
    "Status": (row) => (
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
        {row.createdAt ? "Active" : "Inactive"}
      </span>
    ),
  };

  return (
      <Table
        data={guides}
        columns={columns}
        defaultMapping={defaultMapping}
        onEdit={onEdit}
        onDelete={(row) => onDelete(row.id)}
      />
  );
};

export default GuideTable;
