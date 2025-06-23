const OrderItem = ({ customerName, location, date, status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'accommodation':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'day tour':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'rent car':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };
  
    const getStatusIcon = (status) => {
      switch (status.toLowerCase()) {
        case 'accommodation':
          return '🏨';
        case 'day tour':
          return '🎯';
        case 'rent car':
          return '🚗';
        default:
          return '📋';
      }
    };
  
    return (
      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mb-2 hover:shadow-sm transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{customerName}</h4>
            <p className="text-sm text-gray-600">{location}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          <span className="mr-1">{getStatusIcon(status)}</span>
          {status}
        </div>
      </div>
    );
  };
  
  export default OrderItem;