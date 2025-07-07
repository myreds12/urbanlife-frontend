import { useEffect } from "react";

const FacilitySection = ({
  id,
  isActive,
  facilities,
  setFacilities,
  roomPrices,
}) => {

  useEffect(() => {
    const updatedFacilities = roomPrices.map((room) => {
      const existing = facilities.find((f) => f.nama === room.nama);
      return {
        nama: room.nama || "",
        fasilitas: existing?.fasilitas || [],
      };
    });
    setFacilities(updatedFacilities);
  }, [roomPrices]);


  const handleFacilityChange = (groupIndex, facilityIndex, value) => {
    const updated = [...facilities];
    updated[groupIndex].fasilitas[facilityIndex].nama = value;
    setFacilities(updated);
  };

  const addFacility = (groupIndex) => {
    const updated = [...facilities];
    updated[groupIndex].fasilitas.push({ nama: "" });
    setFacilities(updated);
  };

  const removeFacility = (groupIndex, facilityIndex) => {
    const updated = [...facilities];
    updated[groupIndex].fasilitas.splice(facilityIndex, 1);
    setFacilities(updated);
  };

  return (
    <div
      id={id}
      className={`transition-opacity duration-500 ${
        isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Facilities per Room
      </h3>
      <div className="space-y-6">
        {facilities.map((group, groupIndex) => (
          <div key={groupIndex} className="border p-4 rounded-lg shadow">
            <h4 className="font-semibold text-gray-700 mb-3">
              {group.nama || `Room ${groupIndex + 1}`}
            </h4>
            <div className="space-y-2">
              {group.fasilitas.map((item, facilityIndex) => (
                <div key={facilityIndex} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Facility name"
                    name="nama"
                    value={item.nama}
                    onChange={(e) =>
                      handleFacilityChange(
                        groupIndex,
                        facilityIndex,
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeFacility(groupIndex, facilityIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addFacility(groupIndex)}
              className="mt-3 text-sm text-cyan-600 hover:text-cyan-800"
            >
              + Add Facility
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitySection;
