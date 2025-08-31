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
    "Partner Name": (row) => row.nama || "-", // Ubah dari name ke nama
    "Partner Image": (row) => row.file || "-", // Ubah dari image ke file
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