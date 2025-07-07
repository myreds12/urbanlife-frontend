const CityTable = ({ cities, onEdit, onDelete }) => {
  console.log(cities, "cities data"); // Debugging output
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-gray-400">
        <tr>
          <th className="py-2">#</th>
          <th className="py-2">City ID</th>
          <th className="py-2">Country name</th>
          <th className="py-2">City name</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city, index) => (
          <tr key={city.id} className="last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{city.id}</td>
            <td className="py-2">{city.negara.nama}</td>
            <td className="py-2">{city.nama}</td>
            <td className="py-2">
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full 
                  ${city.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {city.status ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="py-2 space-x-2">
              <button
                onClick={() => onEdit(city)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Edit
              </button>
              <button onClick={() => onDelete(city.id)} className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CityTable;
