import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const CarTable = ({ cars, onEdit, onDelete }) => {
  const columns = [
    "#",
    "Unit ID",
    "Brand",
    "Model",
    "Police number",
    "Vehicle tax status",
    "Tax expiry period",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Unit ID": "id",
    "Brand": "nama",
    "Model": "model",
    "Police number": "plat_nomor",
    "Vehicle tax status": (row) => (row.status_pajak ? "Active" : "Inactive"),
    "Tax expiry period": "tanggal_pajak_berakhir",
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
      data={cars}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default CarTable;