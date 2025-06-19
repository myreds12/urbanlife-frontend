import type { Car } from "../Form/CarForm";

const CarTable = ({ cars }: { cars: Car[] }) => {
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
          <tr key={car.id} className="border-b last:border-none">
            <td className="py-2">{index + 1}</td>
            <td className="py-2">{car.id}</td>
            <td className="py-2">{car.brand}</td>
            <td className="py-2">{car.model}</td>
            <td className="py-2">{car.policeNumber}</td>
            <td className="py-2">{car.taxStatus}</td>
            <td className="py-2">{car.taxExpiry}</td>
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

export default CarTable;
