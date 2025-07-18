const RoomAndPriceSection = ({ id, isActive, roomPrices, onChange, onAdd, onRemove }) => {
  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">

      {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Pricing</h3>
          <button
            type="button"
            onClick={onAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Price +
          </button>
        </div>

      {/* Form */}
        <div className="space-y-4">
          {roomPrices.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border border-gray-100 p-2 rounded-md shadow-sm"
            >
              <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[110px] text-center">
                Room
              </label>
              <input
                type="text"
                placeholder="Deluxe"
                value={item.nama}
                onChange={(e) => onChange(index, "nama", e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[70px] text-center">
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
                className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RoomAndPriceSection;
