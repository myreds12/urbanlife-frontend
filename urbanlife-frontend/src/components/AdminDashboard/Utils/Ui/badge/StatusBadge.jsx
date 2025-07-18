const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-red-500',

  //status on Orders
  selesai: 'bg-green-500',
  pending: 'bg-yellow-500',
  dibatalkan: 'bg-red-500',

  suspended: 'bg-gray-500',
};

const StatusBadge = ({ status }) => {
  if (!status || typeof status !== 'string') {
    return (
      <span className="text-white px-2 py-1 rounded-full text-xs capitalize bg-gray-300">
        Unknown
      </span>
    );
  }

  const color = statusColors[status.toLowerCase()] || 'bg-gray-300';

  return (
    <span className={`text-white px-2 py-1 rounded-full text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
