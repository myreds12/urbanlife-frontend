const RoomAndPriceSection = ({ id, isActive, roomPrices, onChange, onAdd, onRemove }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="space-y-4">
          {roomPrices.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-3 items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <label className="text-sm font-medium text-white bg-gray-400 px-3 py-2 rounded-md">
                Room
              </label>
              <input
                type="text"
                placeholder="Deluxe"
                value={item.nama}
                onChange={(e) => onChange(index, "nama", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <label className="text-sm font-medium text-white bg-gray-400 px-3 py-2 rounded-md">
                Price
              </label>
              <input
                type="text"
                name="harga"
                placeholder="IDR 1,000,000"
                value={item.harga}
                onChange={(e) => onChange(index, "harga", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-red-600 border border-red-400 hover:bg-red-100 px-4 py-2 rounded-md ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomAndPriceSection;
