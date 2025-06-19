const countries = [
    { id: "001", name: "Indonesia", status: "Active" },
    { id: "002", name: "Vietnam", status: "Active" },
  ];
  
  const CountryTable = () => {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">List Country</h3>
          <div className="flex gap-2">
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              <i className="fas fa-filter mr-2"></i>Filter
            </button>
            <button className="px-4 py-1 text-sm border rounded-lg text-gray-600 hover:bg-gray-100">
              See all
            </button>
          </div>
        </div>
  
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b">
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
              <tr key={country.id} className="border-b last:border-none">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{country.id}</td>
                <td className="py-2">{country.name}</td>
                <td className="py-2">
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    {country.status}
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
      </div>
    );
  };
  
  export default CountryTable;
  