import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const CountryTable = ({ countries, onEdit, onDelete }) => {
  const columns = ["#", "Country ID", "Country Name", "Status", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Country ID": (row) => row.kode || "-",
    "Country Name": (row) => row.nama || "-",
    "Status": (row) => (
      <span
        className={`inline-block px-3 py-1 text-sm rounded-full 
          ${row.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {row.status ? "Active" : "Inactive"}
      </span>
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