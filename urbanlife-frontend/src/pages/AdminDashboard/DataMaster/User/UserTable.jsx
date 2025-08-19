import Table from "../../../../components/AdminDashboard/Utils/Table/Table";
import StatusBadge from "../../../../components/AdminDashboard/Utils/Ui/badge/StatusBadge";

const UserTable = ({ users, loading, onEdit, onDelete }) => {
  if (loading) return <p>Loading...</p>;

  const columns = ["#", "Name", "Email", "Phone Number", "Role", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    Name: (row) => row.nama || "-",
    Email: (row) => row.email || "-",
    "Phone Number": (row) => row.nomor_hp || "-",
    Role: (row) => row.role?.nama || "No role",
    // klo gada status ya apus ja
    // Status: (row) => <StatusBadge status={row.status} />,
  };

  return (
    <Table
      data={users}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default UserTable;