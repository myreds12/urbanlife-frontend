import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const CityTable = ({ cities, onEdit, onDelete, onSetActive }) => {
  const columns = [
    "#",
    "City ID",
    "Country name",
    "City name",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "City ID": (row) => row.id || "-",
    "Country name": (row) => row?.negara?.nama ?? "-",
    "City name": (row) => row.nama || "-",
    Status: (row) => (
      <button
        onClick={() => onSetActive(row.id, row.status)}
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-red-100 text-red-700 hover:bg-red-200"
        }`}
      >
        {row.status ? "Active" : "Inactive"}
      </button>
    ),
  };

  return (
    <Table
      data={cities}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default CityTable;
