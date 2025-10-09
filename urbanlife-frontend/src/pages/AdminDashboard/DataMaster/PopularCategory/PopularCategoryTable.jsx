import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const PopularCategoryTable = ({ data, onDelete }) => {
  const columns = ["#", "Service Type", "Service Name", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    "Service Type": (row) => row.service_type || "-",
    "Service Name": (row) => row.nama || "-",
  };
  
  return (
    <Table
      data={data}
      columns={columns}
      defaultMapping={defaultMapping}
      onDelete={(row) => onDelete(row.id, row.type)}
    />
  );
};

export default PopularCategoryTable;
