import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const CityTable = ({ cities, onEdit, onDelete }) => {
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
    Status: (row) => <StatusBadge status={row.status} />,
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
