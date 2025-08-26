import React from "react";

const FacilitySection = ({ id, isActive, facilities, setFacilities }) => {
  const handleFacilityChange = (facilityIndex, value) => {
    const updated = [...facilities];
    updated[facilityIndex].nama = value;
    setFacilities(updated);
  };

  const addFacility = () => {
    setFacilities([...facilities, { nama: "" }]);
  };

  const removeFacility = (facilityIndex) => {
    const updated = [...facilities];
    updated.splice(facilityIndex, 1);
    setFacilities(updated);
  };

  return (
    <div
      id={id}
      className={`transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Facility</h3>
          <button
            type="button"
            onClick={addFacility}
            className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
          >
            Add Facility +
          </button>
        </div>

        <div className="space-y-2">
          {(facilities.length > 0 ? facilities : [{ nama: "" }]).map(
            (item, facilityIndex) => (
              <div key={facilityIndex} className="flex gap-2 items-center">
                <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[90px] text-center">
                  Facility <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Facility name"
                  required
                  name="nama"
                  value={item.nama}
                  onChange={(e) =>
                    handleFacilityChange(facilityIndex, e.target.value)
                  }
                  className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeFacility(facilityIndex)}
                  className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
                >
                  Remove
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilitySection;
