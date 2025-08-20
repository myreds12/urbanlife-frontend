import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const CarTable = ({ cars, onEdit, onDelete }) => {
  const columns = [
    "#",
    "Unit ID",
    "Brand",
    "Model",
    "Plate Number",
    "Vehicle tax status",
    "Tax expiry period",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Unit ID": (row) => row.id || "-",
    Brand: (row) => row.nama || "-",
    Model: (row) => row.model || "-",
    "Plate Number": (row) => row.plat_nomor || "-",
    "Vehicle tax status": (row) => (row.status_pajak ? "Active" : "Inactive"),
    "Tax expiry period": (row) => row.tanggal_pajak_berakhir || "-",
    Status: (row) => <StatusBadge status={row.status} />,
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
