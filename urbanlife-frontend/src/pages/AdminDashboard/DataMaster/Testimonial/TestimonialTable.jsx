import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const TestimonialTable = ({ testimonials, loading, onEdit, onDelete }) => {
  if (loading) return <p>Loading...</p>;

  const columns = ["#", "Name", "Occupation", "Description", "Order ID", "Action"];

  const defaultMapping = {
    "#": (_, index) => index + 1,
    Name: (row) => row.name || "-",
    Occupation: (row) => row.occupation || "-",
    Description: (row) => row.description || "-",
    "Order ID": (row) => row.order_id || "-",
  };

  return (
    <Table
      data={testimonials}
      columns={columns}
      defaultMapping={defaultMapping}
      onEdit={onEdit}
      onDelete={(row) => onDelete(row.id)}
    />
  );
};

export default TestimonialTable;