
const PriceSection = ({ id, isActive, formData, handleChange, type, prices, handleAddPrice, handleDeletePrice, handlePriceChange }) => {


  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-6">Pricing</h3>

        {type === "daytour" ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Anak <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="harga_anak"
                value={formData.harga_anak}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. 500000"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Dewasa <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="harga_dewasa"
                value={formData.harga_dewasa}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g. 1200000"
                required
                min={0}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {prices.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-100 p-2 rounded-md shadow-sm"
              >
                <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[110px] text-center">
                  Description
                </span>

                <input
                  type="text"
                  placeholder="e.g. 4 - 6 hours"
                  value={item.durasi}
                  onChange={(e) =>
                    handlePriceChange(index, "durasi", e.target.value)
                  }
                  className="flex-1 py-2 px-3 rounded-md border border-gray-300"
                />

                <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[70px] text-center">
                  Price
                </span>

                <input
                  type="text"
                  placeholder="IDR 1,000,000"
                  value={item.harga}
                  onChange={(e) =>
                    handlePriceChange(index, "harga", e.target.value)
                  }
                  className="flex-1 py-2 px-3 rounded-md border border-gray-300"
                />

                <button
                  type="button"
                  onClick={() => handleDeletePrice(index)}
                  className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddPrice}
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
              >
                ADD
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceSection;
