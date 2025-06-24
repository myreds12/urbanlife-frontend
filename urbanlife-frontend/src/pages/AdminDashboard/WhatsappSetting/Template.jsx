import React, { useState } from 'react';

import QRCodeCard from '../../../components/AdminDashboard/WhatsApp/QRCodeCard'; // Import the QRCodeCard component
// Temporary QRCodeCard component - nanti dipindah ke file terpisah

const Template = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleRefresh = () => {
    console.log('QR Code refreshed');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Integration</h1>
          <p className="text-gray-600 text-base">
            Connect your WhatsApp Business account to enable automated messaging
          </p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* QR Code Section */}
          <QRCodeCard 
            isConnected={isConnected}
            isConnecting={isConnecting}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onRefresh={handleRefresh}
          />
  
          {/* Instructions Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">How to Connect</h3>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Open WhatsApp Business',
                  desc: "Make sure you're using WhatsApp Business app, not regular WhatsApp"
                },
                {
                  step: 2,
                  title: 'Go to Linked Devices',
                  desc: 'Tap Menu → Linked Devices → Link a Device'
                },
                {
                  step: 3,
                  title: 'Scan QR Code',
                  desc: 'Point your phone at the QR code on the left'
                },
                {
                  step: 4,
                  title: 'Done!',
                  desc: 'Your WhatsApp Business is now connected to the system'
                }
              ].map(({ step, title, desc }) => (
                <div className="flex items-start gap-4" key={step}>
                  <div className="w-7 h-7 bg-green-100 text-green-600 font-medium text-sm rounded-full flex items-center justify-center">
                    {step}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">{title}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2">
                <div className="text-amber-600 mt-1">⚠️</div>
                <div>
                  <p className="text-amber-800 font-medium text-sm">Important Notes:</p>
                  <ul className="text-amber-700 text-sm mt-1 space-y-1 list-disc list-inside">
                    <li>QR code expires in 20 seconds</li>
                    <li>Make sure your phone has internet connection</li>
                    <li>Only one device can be connected at a time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Connection Status */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'WhatsApp', status: isConnected ? 'Connected' : 'Disconnected' },
              { label: 'API Status', status: isConnected ? 'Active' : 'Inactive' },
              { label: 'Messages', status: isConnected ? 'Ready' : 'Pending' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-500">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Template;