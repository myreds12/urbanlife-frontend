
const PriceSection = ({ id, isActive, formData, handleChange, type, prices, handleAddPrice, handleDeletePrice, handlePriceChange, handleAddPackage, handleChangePackage, handleRemovePackage }) => {


  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Pricing</h3>
          {type !== "daytour" && (
            <button
              type="button"
              onClick={handleAddPrice}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
            >
              Add Price +
            </button>
          )}
        </div>

        
        {type === "daytour" ? (
          <>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Child Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="harga_anak"
                value={formData.harga_anak}
                onChange={handleChange}
                className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                placeholder="e.g. 500000"
                required
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adult Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="harga_dewasa"
                value={formData.harga_dewasa}
                onChange={handleChange}
                className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                placeholder="e.g. 1200000"
                required
                min={0}
              />
            </div>
          </div>
          </>
        ) : (
          <div className="space-y-3">
            {prices.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border border-gray-100 p-2 rounded-md shadow-sm"
              >
                <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[110px] text-center">
                  Description <span className="text-red-500">*</span>
                </span>

                <input
                  type="text"
                  placeholder="e.g. 4 - 6 hours"
                  required
                  value={item.durasi}
                  onChange={(e) =>
                    handlePriceChange(index, "durasi", e.target.value)
                  }
                  className="flex-1 py-1 px-3 rounded-md border border-gray-300 focus:ring-cyan-500"
                />

                <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[70px] text-center">
                  Price <span className="text-red-500">*</span>
                </span>

                <input
                  type="text"
                  placeholder="IDR 1,000,000"
                  required
                  value={item.harga}
                  onChange={(e) =>
                    handlePriceChange(index, "harga", e.target.value)
                  }
                  className="flex-1 py-1 px-3 rounded-md border border-gray-300 focus:ring-cyan-500"
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

          </div>
        )}
      </div>
      { type === "daytour" 
      ? <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Package Pricing</h3>
            {type === "daytour" && (
              <button
                type="button"
                onClick={handleAddPackage}
                className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
              >
                Add Package Pricing
              </button>
            )}
          </div>

          {formData.travel_package_prices.map((pair, index) => (
            <div key={pair.id || index} className="relative grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={pair.description}
                  onChange={(e) => handleChangePackage(index, e)}
                  className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                  placeholder="e.g. 1 - 4 Orang"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="harga"
                  value={pair.harga}
                  onChange={(e) => handleChangePackage(index, e)}
                  className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                  placeholder="e.g. 1200000"
                  min={0}
                />
              </div>

              {formData.travel_package_prices.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePackage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      : <></> }
    </div>
  );
};

export default PriceSection;
