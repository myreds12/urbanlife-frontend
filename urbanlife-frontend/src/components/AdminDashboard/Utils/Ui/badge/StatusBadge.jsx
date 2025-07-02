const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-red-500',
  pending: 'bg-yellow-500',

  //status on Orders
  paid: 'bg-green-500',
  unpaid: 'bg-yellow-500',
  cancelled: 'bg-red-500',

  suspended: 'bg-gray-500',
};

const StatusBadge = ({ status }) => {
  const color = statusColors[status.toLowerCase()] || 'bg-gray-300';

  return (
    <span className={`text-white px-2 py-1 rounded-full text-xs capitalize ${color}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
