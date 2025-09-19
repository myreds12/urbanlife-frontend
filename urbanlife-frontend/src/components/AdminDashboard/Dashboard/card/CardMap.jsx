import React, { useEffect, useRef, useState } from 'react';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.css';
import 'jsvectormap/dist/maps/world';
import apiClient from '../../Utils/ApiClient/apiClient';

const CardMap = () => {
  const mapRef = useRef(null);
  const [dataNegara, setDataNegara] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/negara');
        if (response.data && response.data.status === 200) {
          const mappedData = response.data.data.map(item => ({
            country: item.nama,
            customers: item.total_customer || 0,
            percentage: 0
          }));

          // Hitung total customers untuk persentase
          const totalCustomers = mappedData.reduce((sum, item) => sum + item.customers, 0);
          const withPercentage = mappedData.map(item => ({
            ...item,
            percentage: totalCustomers > 0 ? Math.round((item.customers / totalCustomers) * 100) : 0
          }));

          setDataNegara(withPercentage);
          setLoading(false);
        } else {
          setError('Failed to load data');
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (mapRef.current && mapRef.current._jsVectorMap) {
        mapRef.current._jsVectorMap.destroy();
        mapRef.current._jsVectorMap = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && dataNegara.length > 0 && mapRef.current) {
      mapRef.current.innerHTML = '';

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
        }
        // ❌ Tidak ada markers karena koordinat sudah dihapus
      };

      try {
        const map = new jsVectorMap(mapConfig);
        mapRef.current._jsVectorMap = map;
      } catch (error) {
        console.error('Error initializing map', error);
      }
    }
  }, [loading, dataNegara]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
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
        {dataNegara.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{item.country}</div>
              <div className="text-sm text-gray-500">
                {item.customers.toLocaleString()} Customers
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
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
