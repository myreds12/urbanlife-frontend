import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const PartnerTable = ({ partners, onEdit, onDelete }) => {
  const columns = [
    "#",
    "Partner Name",
    "Partner Image",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Partner Name": (row) => row.name || "-",
    "Partner Image": (row) => row.image || "-",
  };

  return (
    <Table
      data={partners}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default PartnerTable;