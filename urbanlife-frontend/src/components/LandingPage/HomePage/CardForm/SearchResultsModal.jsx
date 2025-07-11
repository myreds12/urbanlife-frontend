import React from "react";
import { X, Star } from "lucide-react";

const SearchResultsModal = ({ showResults, setShowResults, searchResults, country, city, service, cities, services }) => {
  return (
    showResults && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Search Results ({searchResults.length})
              </h3>
              <div className="text-sm text-gray-500">
                {country && cities[country]?.find((c) => c.value === city)?.label} • {services.find((s) => s.value === service)?.label}
              </div>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{result.image}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-1">{result.title}</h4>
                            <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {result.duration && <span>⏱️ {result.duration}</span>}
                              {result.features && <span>✨ {result.features}</span>}
                              {result.amenities && <span>🏆 {result.amenities}</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-cyan-600">{result.price}</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Star size={16} className="text-yellow-500 fill-current" />
                              <span>{result.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-gray-500">No results found for your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SearchResultsModal;