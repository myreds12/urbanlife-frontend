
const ItinerarySection = ({ id, isActive, itinerary, onChange, onAdd, onRemove }) => {
  const pairedItineraries = [];
  for (let i = 0; i < itinerary.length; i += 2) {
    const en = itinerary.find((item, idx) => item.bahasa === "ENGLISH" && Math.floor(idx / 2) === i / 2);
    const idn = itinerary.find((item, idx) => item.bahasa === "INDONESIA" && Math.floor(idx / 2) === i / 2);
    if (en && idn) {
      pairedItineraries.push({ en, idn, pairIndex: i / 2 });
    }
  }

  return (
    <div id={id} className={isActive ? "block" : "hidden"}>
      <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Itinerary</h3>
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            + Add Destination
          </button>
        </div>
        <div className="space-y-8">
          {pairedItineraries.map(({ en, idn, pairIndex }, index) => (
            <div key={index} className="grid grid-cols-2 gap-6 relative bg-gray-50 p-4 rounded-lg border">
              {[{ label: "INDONESIA", data: idn }, { label: "ENGLISH", data: en }].map(({ label, data }, langIndex) => (
                <div key={langIndex}>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{label}</h4>
                  <div className="space-y-3">
                    <div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Destination</label>
                      <input
                        type="text"
                        placeholder="e.g. Pantai Kelingking"
                        value={data.destination}
                        onChange={(e) => onChange(itinerary.indexOf(data), "destination", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Description</label>
                      <textarea
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => onChange(itinerary.indexOf(data), "description", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md h-24"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              {pairedItineraries.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(pairIndex)}
                  className="absolute top-2 right-2 text-red-600 text-xl hover:text-red-800"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ItinerarySection;
