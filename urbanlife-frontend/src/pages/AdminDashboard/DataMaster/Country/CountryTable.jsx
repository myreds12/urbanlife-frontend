import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const CountryTable = ({ countries, onEdit, onDelete }) => {
  const columns = ["#", "Country ID", "Country Name", "Status", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Country ID": (row) => row.kode || "-",
    "Country Name": (row) => row.nama || "-",
    Status: (row) => <StatusBadge status={row.status} />,
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
