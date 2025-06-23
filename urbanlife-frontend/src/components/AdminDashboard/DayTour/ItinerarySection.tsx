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

  const handleSubmit = () => {
    console.log('Itinerary submitted:', itinerary);
  };

  return (
    <div id={id} className={isActive ? 'block' : 'hidden'}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Itinerary</h3>
            <button
              type="button"
              onClick={addDestination}
              className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            >
              Add destination
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - English */}
            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-700">English</h4>
              <div className="space-y-4">
                {itinerary.map((item, index) => (
                  <div key={`left-${index}`} className="relative">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder={`* Destination ${index + 1}`}
                          value={item.destination}
                          onChange={(e) => handleChange(index, 'destination', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none "
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder={`* Description ${index + 1}`}
                          value={item.description}
                          onChange={(e) => handleChange(index, 'description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none "
                        />
                      </div>
                    </div>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDestination(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        title="Remove destination"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - English (duplicate for now) */}
            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-700">English</h4>
              <div className="space-y-4">
                {itinerary.map((item, index) => (
                  <div key={`right-${index}`} className="relative">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder={`* Destination ${index + 1}`}
                          value={item.destination}
                          onChange={(e) => handleChange(index, 'destination', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none "
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder={`* Description ${index + 1}`}
                          value={item.description}
                          onChange={(e) => handleChange(index, 'description', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none "
                        />
                      </div>
                    </div>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDestination(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        title="Remove destination"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleSubmit}
              className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySection;