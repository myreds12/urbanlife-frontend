const DriverTable = ({ drivers }) => {
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
          <tr key={driver.id} className="last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{driver.id}</td>
            <td className="py-2">{driver.brand}</td>
            <td className="py-2">{driver.model}</td>
            <td className="py-2">{driver.phone}</td>
            <td className="py-2">{driver.gender}</td>
            <td className="py-2">{driver.expiry}</td>
            <td className="py-2">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-500 text-white">
                Active
              </span>
            </td>
            <td className="py-2 space-x-2">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DriverTable;
