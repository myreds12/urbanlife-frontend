import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const CountryTable = ({ countries, onEdit, onDelete, onSetActive }) => {
  const columns = ["#", "Country ID", "Country Name", "Status", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Country ID": (row) => row.kode || "-",
    "Country Name": (row) => row.nama || "-",
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
      data={countries}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default CountryTable;
