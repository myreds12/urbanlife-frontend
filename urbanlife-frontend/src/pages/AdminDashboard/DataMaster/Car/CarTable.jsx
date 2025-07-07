const CarTable = ({ cars, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-gray-400">
        <tr>
          <th className="py-2">#</th>
          <th className="py-2">Unit ID</th>
          <th className="py-2">Brand</th>
          <th className="py-2">Model</th>
          <th className="py-2">Police number</th>
          <th className="py-2">Vehicle tax status</th>
          <th className="py-2">Tax expiry period</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={car.id} className="last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{car.id}</td>
            <td className="py-2">{car.nama}</td>
            <td className="py-2">{car.model}</td>
            <td className="py-2">{car.plat_nomor}</td>
            <td className="py-2">{car.status_pajak ? "Active" : "Inactive"}</td>
            <td className="py-2">{car.tanggal_pajak_berakhir}</td>
            <td className="py-2">
             <span
                className={`inline-block px-3 py-1 text-sm rounded-full 
                  ${car.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {car.status ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="py-2 space-x-2">
              <button onClick={() => onEdit(car)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => onDelete(car.id)} className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarTable;
