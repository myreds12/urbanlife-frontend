const CountryTable = ({ countries, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-gray-400">
        <tr>
          <th className="py-2">#</th>
          <th className="py-2">Country ID</th>
          <th className="py-2">Country Name</th>
          <th className="py-2">Status</th>
          <th className="py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, index) => (
          <tr key={country.id} className="last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{country.kode}</td>
            <td className="py-2">{country.nama}</td>
            <td className="py-2">
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full 
                  ${country.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {country.status ? "Active" : "Inactive"}
              </span>
            </td>
            <td className="py-2 space-x-2">
              <button
                onClick={() => onEdit(country)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(country.id)}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryTable;
