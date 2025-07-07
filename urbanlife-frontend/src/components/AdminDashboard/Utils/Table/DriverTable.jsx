const DriverTable = ({ drivers, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <table className="w-full text-sm text-left">
      <thead className="text-gray-400">
        <tr>
          <th className="py-2">#</th>
          <th className="py-2">Driver ID</th>
          <th className="py-2">Driver name</th>
          <th className="py-2">ID</th>
          <th className="py-2">Phone number</th>
          <th className="py-2">Gender</th>
          <th className="py-2">Driving expiry period</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver, index) => (
          <tr key={driver.id} className="border-t last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{driver.id}</td>
            <td className="py-2">{driver.nama}</td>
            <td className="py-2">{driver.driver_id || "Tidak Ada"}</td>
            <td className="py-2">{driver.nomor_hp}</td>
            <td className="py-2">{driver.gender}</td>
            <td className="py-2">
              {driver.tanggal_periode_berakhir ? new Date(driver.tanggal_periode_berakhir).toLocaleDateString() : "Tidak Ada"}
            </td>
            <td className="py-2">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-500 text-white">
                Active
              </span>
            </td>
             <td className="py-2 space-x-2">
              <button
                onClick={() => onEdit(driver)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Edit
              </button>
              <button onClick={() => onDelete(driver.id)} className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
