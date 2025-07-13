import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

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
    "City ID": "id",
    "Country name": (row) => row?.negara?.nama ?? "-",
    "City name": "nama",
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
      data={cities}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default CityTable;
