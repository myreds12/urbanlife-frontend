import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const PartnerTable = ({ partners, onEdit, onDelete }) => {
  const columns = [
    "#",
    "Partner ID",
    "Partner Name",
    "Image",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Partner ID": (row) => row.id || "-",
    "Partner Name": (row) => row.nama || "-",
    "Image": (row) => (
      row.file ? (
        <img
          src={row.file}
          alt={row.nama}
          className="w-12 h-12 object-contain rounded-lg border"
          onError={(e) => {
            e.target.src = '/placeholder-image.png'; // fallback image
            e.target.onerror = null;
          }}
        />
      ) : (
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )
    ),
    Status: (row) => <StatusBadge status={row.status} />,
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