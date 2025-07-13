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
    "Driver ID": "id",
    "Driver name": "nama",
    "ID": (row) => row.driver_id || "Tidak Ada",
    "Phone number": "nomor_hp",
    "Gender": "gender",
    "Driving expiry period": (row) =>
      row.tanggal_periode_berakhir
        ? new Date(row.tanggal_periode_berakhir).toLocaleDateString()
        : "Tidak Ada",
    "Status": () => (
      <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-500 text-white">
        Active
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
