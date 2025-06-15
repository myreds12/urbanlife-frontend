import React, { useState } from 'react';

interface ItineraryItem {
  destination: string;
  description: string;
}

interface ItinerarySectionProps {
  id: string;
  isActive: boolean;
}

const ItinerarySection: React.FC<ItinerarySectionProps> = ({ id, isActive }) => {
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([
    { destination: '', description: '' },
    { destination: '', description: '' },
  ]);

  const handleChange = (index: number, field: keyof ItineraryItem, value: string) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addDestination = () => {
    setItinerary([...itinerary, { destination: '', description: '' }]);
  };

  const removeDestination = (index: number) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Itinerary submitted:', itinerary);
  };

  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Itinerary</h3>
            <button
              type="button"
              onClick={addDestination}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add destination
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">English</h4>
              {itinerary.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-red-500">* Destination {index + 1}</label>
                    <input
                      type="text"
                      value={item.destination}
                      onChange={(e) => handleChange(index, 'destination', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-500">* Description {index + 1}</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDestination(index)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">English</h4>
              {itinerary.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-red-500">* Destination {index + 1}</label>
                    <input
                      type="text"
                      value={item.destination}
                      onChange={(e) => handleChange(index, 'destination', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-500">* Description {index + 1}</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDestination(index)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItinerarySection;