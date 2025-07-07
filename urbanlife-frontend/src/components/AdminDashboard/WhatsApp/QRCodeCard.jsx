import { RefreshCw, LogOut } from "lucide-react";

export default function QRCodeCard({
  isConnected,
  isConnecting,
  qrCode,
  onConnect,
  onDisconnect,
  onRefresh,
}) {
  return (
    <div className="max-w-md w-full mx-auto p-6 border rounded-xl shadow-md text-center">
      {!isConnected ? (
        <>
          {qrCode && (
            <div className="relative inline-block mb-6">
              <img
                src={qrCode}
                alt="WhatsApp QR Code"
                className="w-48 h-48 mx-auto border-2 border-gray-200 rounded-lg"
              />
              <button
                onClick={onRefresh}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                title="Refresh QR Code"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          <button
            onClick={onConnect}
            disabled={isConnecting}
            className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Connecting...
              </>
            ) : (
              "Connect"
            )}
          </button>
        </>
      ) : (
        <>
          <div className="mb-4 text-green-600 font-semibold text-lg">
            ✅ WhatsApp is Connected!
          </div>

          <button
            onClick={onDisconnect}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}
