export interface Country {
    id: string;
    name: string;
    status: string;
  }
  
  const CountryTable = ({ countries }: { countries: Country[] }) => {
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
            <tr key={country.id} className=" last:border-none">
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
    );
  };
  
  export default  CountryTable;
  