import React, { useEffect, useRef } from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.css';
import 'jsvectormap/dist/maps/world';

const CardMap = () => {
  const mapRef = useRef(null);

  const customerData = [
    {
      country: 'Indonesia',
      code: 'ID',
      customers: 1500,
      percentage: 60,
      coords: [ -6.1751, 106.8272],
      flag: '🇮🇩'
    },
    {
      country: 'Vietnam',
      code: 'VN',
      customers: 1000,
      percentage: 40,
      coords: [21.0278, 105.8520],
      flag: '🇻🇳'
    }
  ];

  useEffect(() => {
    if (mapRef.current && !mapRef.current._jsVectorMap) {
      // Clear any existing content first
      mapRef.current.innerHTML = '';
      
      const initializeMap = () => {
        const mapConfig = {
          selector: mapRef.current,
          map: 'world',
          backgroundColor: '#f8fafc',
          zoomButtons: false,
          zoomOnScroll: false,
          regionStyle: {
            initial: {
              fill: '#e2e8f0',
              stroke: '#cbd5e1',
              strokeWidth: 0.5,
            },
            hover: {
              fill: '#189AB4',
              cursor: 'pointer'
            }
          },
          markerStyle: {
            initial: {
              fill: '#26DBFF',
              stroke: '#189AB4',
              strokeWidth: 2,
              r: 6
            },
            hover: {
              fill: '#ffffff',
              stroke: '#189AB4',
              strokeWidth: 2,
              r: 8,
              cursor: 'pointer'
            }
          },
          markers: customerData.map(item => ({
            coords: item.coords,
            name: `${item.country}: ${item.customers} customers`
          })),
          onRegionTooltipShow: function(event, tooltip, code) {
            // Show country name on hover
            tooltip.text(tooltip.text() || 'Country');
          },
          onMarkerTooltipShow: function(event, tooltip, code) {
            const marker = customerData.find(item => 
              tooltip.text().includes(item.country)
            );
            if (marker) {
              tooltip.text(
                `${marker.country}\n${marker.customers.toLocaleString()} Customers\n${marker.percentage}%`
              );
            }
          }
        };

        try {
          // Try with direct import first
          const map = new jsVectorMap(mapConfig);
          mapRef.current._jsVectorMap = map;
        } catch (error) {
          console.error('Error with direct import, trying window.jsVectorMap:', error);
          
          // Fallback to window.jsVectorMap
          if (window.jsVectorMap) {
            const map = new window.jsVectorMap(mapConfig);
            mapRef.current._jsVectorMap = map;
          } else {
            console.error('jsVectorMap not available');
          }
        }
      };

      // Add small delay to ensure DOM is ready
      const timer = setTimeout(initializeMap, 100);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      if (mapRef.current && mapRef.current._jsVectorMap) {
        mapRef.current._jsVectorMap.destroy();
        mapRef.current._jsVectorMap = null;
      }
    };
  }, []);

  return (
    <div className="">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Customer Demographic</h3>
        <p className="text-sm text-gray-500">Number of customer based on country</p>
      </div>
      
      {/* Map Container */}
      <div className="mb-6">
        <div 
          ref={mapRef}
          className="w-full h-64 rounded-lg"
          style={{ minHeight: '250px' }}
        />
      </div>

      {/* Country List */}
      <div className="space-y-3">
        {customerData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{item.flag}</span>
                <div>
                  <div className="font-medium text-gray-900">{item.country}</div>
                  <div className="text-sm text-gray-500">
                    {item.customers.toLocaleString()} Customers
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-8">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMap;