import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const DriverTable = ({ drivers, loading, onEdit, onDelete }) => {
  if (loading) return <p>Loading...</p>;

  const columns = [
    "#",
    "Driver ID",
    "Driver name",
    "ID",
    "Phone number",
    "Gender",
    "Driving expiry period",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Driver ID": (row) => row.id || "-",
    "Driver name": (row) => row.nama || "-",
    "ID": (row) => row.driver_id || "-",
    "Phone number": (row) => row.nomor_hp || "-",
    "Gender": (row) => row.gender || "-",
    "Driving expiry period": (row) =>
      row.tanggal_periode_berakhir
        ? new Date(row.tanggal_periode_berakhir).toLocaleDateString()
        : "Tidak Ada",
    "Status": (row) => (
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
        {row.createdAt ? "Active" : "Inactive"}
      </span>
    ),
  };

  return (
    <Table
      data={drivers}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default DriverTable;
