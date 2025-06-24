import React, { useState } from 'react';

const QRCodeCard = ({ isConnected, isConnecting, onConnect, onDisconnect, onRefresh }) => {
  const [qrCode, setQrCode] = useState(
    'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/qr/SAMPLE_QR_CODE'
  );

  const handleRefresh = () => {
    const timestamp = Date.now();
    setQrCode(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/qr/SAMPLE_QR_CODE_${timestamp}`
    );
    onRefresh && onRefresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      {!isConnected ? (
        <>
          <div className="relative inline-block mb-6">
            <img
              src={qrCode}
              alt="WhatsApp QR Code"
              className="w-48 h-48 mx-auto border-2 border-gray-200 rounded-lg"
            />
            <button
              onClick={handleRefresh}
              className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              title="Refresh QR Code"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Connecting...
              </>
            ) : (
              'Connect'
            )}
          </button>
        </>
      ) : (
        <>
          <div className="w-48 h-48 mx-auto flex items-center justify-center bg-cyan-50 rounded-lg border-2 border-cyan-200 mb-6">
            <svg
              className="w-16 h-16 text-cyan-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
              />
            </svg>
          </div>

          <button
            onClick={onDisconnect}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </>
      )}

      {/* Optional Refresh button for both states */}
      <button
        onClick={handleRefresh}
        className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Generate New QR
      </button>
    </div>
  );
};

export default QRCodeCard;
