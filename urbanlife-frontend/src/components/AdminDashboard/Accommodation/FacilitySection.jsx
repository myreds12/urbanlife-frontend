import { useEffect } from "react";

const FacilitySection = ({
  id,
  isActive,
  facilities,
  setFacilities,
  roomPrices,
  formData,
}) => {
  useEffect(() => {
    // Facility per room (type 1)
    const roomFacilities = roomPrices.map((room) => {
      const existing = facilities.find((f) => f.nama === room.nama && f.type === 1);
      return {
        id: existing?.id || null,
        nama: room.nama || "",
        type: 1, // Type 1 untuk facility per room
        fasilitas: existing?.fasilitas || [],
      };
    });

    // Facility accommodation (type 2) - hanya satu card
    const accommodationFacility = facilities.find((f) => f.type === 2) || {
      id: null,
      nama: formData.nama || "Accommodation Facility",
      type: 2, // Type 2 untuk facility accommodation
      fasilitas: [],
    };

    // Gabungkan kedua facility
    const updatedFacilities = [...roomFacilities, accommodationFacility];
    setFacilities(updatedFacilities);
  }, [roomPrices, formData.nama]);

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
        Facilities
      </h3>

      <div className="space-y-6">
        {/* Card 1: Facility per Room (Type 1) */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Facilities per Room
          </h3>
          
          <div className="space-y-4">
            {facilities
              .filter(group => group.type === 1)
              .map((group, groupIndex) => (
                <div key={groupIndex} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-700">
                      {group.nama || `Room ${groupIndex + 1}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => addFacility(facilities.indexOf(group))}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-3 py-1 rounded-md"
                    >
                      Add Facility +
                    </button>
                  </div>

                  <div className="space-y-2">
                    {group.fasilitas.map((item, facilityIndex) => (
                      <div key={facilityIndex} className="flex gap-2 items-center">
                        <label className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-md min-w-[80px] text-center">
                          Facility <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Facility name"
                          required
                          value={item.nama}
                          onChange={(e) =>
                            handleFacilityChange(
                              facilities.indexOf(group),
                              facilityIndex,
                              e.target.value
                            )
                          }
                          className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeFacility(facilities.indexOf(group), facilityIndex)}
                          className="text-red-600 border border-red-400 px-2 py-1 rounded-md hover:bg-red-50 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Card 2: Facility Accommodation (Type 2) */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              Accommodation Facility
            </h3>
            <button
              type="button"
              onClick={() => {
                const accommodationGroup = facilities.find(f => f.type === 2);
                if (accommodationGroup) {
                  addFacility(facilities.indexOf(accommodationGroup));
                }
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-4 py-2 rounded-md"
            >
              Add Facility +
            </button>
          </div>

          <div className="space-y-2">
            {facilities
              .filter(group => group.type === 2)
              .map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.fasilitas.map((item, facilityIndex) => (
                    <div key={facilityIndex} className="flex gap-2 items-center mb-2">
                      <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[90px] text-center">
                        Facility <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Facility name"
                        required
                        value={item.nama}
                        onChange={(e) =>
                          handleFacilityChange(
                            facilities.indexOf(group),
                            facilityIndex,
                            e.target.value
                          )
                        }
                        className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeFacility(facilities.indexOf(group), facilityIndex)}
                        className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitySection;