const GuideTable = ({ guides }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">List guide</h3>
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
        <thead className="text-gray-400 border-b rounded-full rounded-lg">
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Guide ID</th>
            <th className="py-2">Guide name</th>
            <th className="py-2">ID</th>
            <th className="py-2">Phone number</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Fluent english</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide, index) => (
            <tr key={guide.id} className="border-b last:border-none">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{guide.id}</td>
              <td className="py-2">{guide.name}</td>
              <td className="py-2">{guide.identity}</td>
              <td className="py-2">{guide.phone}</td>
              <td className="py-2">{guide.gender}</td>
              <td className="py-2 capitalize">{guide.english}</td>
              <td className="py-2">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                  {guide.status}
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

export default GuideTable;
