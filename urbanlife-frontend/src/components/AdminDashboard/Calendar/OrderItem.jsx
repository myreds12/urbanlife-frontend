const OrderItem = ({ customerName, location, date, status }) => {
  const getContainerStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'accommodation':
        return 'bg-orange-50 border-2 border-orange-300 rounded-xl';
      case 'day tour':
        return 'bg-green-50 border-2 border-green-300 rounded-xl';
      case 'rent car':
        return 'bg-blue-50 border-2 border-blue-300 rounded-xl';
      default:
        return 'bg-gray-50 border-2 border-gray-300 rounded-xl';
    }
  };

  const getCheckIconStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'accommodation':
        return 'w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center';
      case 'day tour':
        return 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center';
      case 'rent car':
        return 'w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center';
      default:
        return 'w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center';
    }
  };

  const getBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'accommodation':
        return 'px-3 py-1 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium';
      case 'day tour':
        return 'px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium';
      case 'rent car':
        return 'px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium';
      default:
        return 'px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium';
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-3 ${getContainerStyle(status)}`}>
      <div className="flex items-center gap-3">
        <div className={getCheckIconStyle(status)}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-base">{customerName}</h4>
          <p className="text-gray-600 text-sm">{location}</p>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>
      <div className={getBadgeStyle(status)}>
        {status}
      </div>
    </div>
  );
};

export default OrderItem;