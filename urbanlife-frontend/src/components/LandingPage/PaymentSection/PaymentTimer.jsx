import React from 'react';

const PaymentTimer = ({ timeLeft }) => {
  const FORMAT_TIME = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeComponents = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return [
        { value: hours.toString().padStart(2, '0'), label: 'hours' },
        { value: mins.toString().padStart(2, '0'), label: 'minutes' },
        { value: secs.toString().padStart(2, '0'), label: 'seconds' }
      ];
    }
    return [
      { value: mins.toString().padStart(2, '0'), label: 'minutes' },
      { value: secs.toString().padStart(2, '0'), label: 'seconds' }
    ];
  };

  const timeComponents = getTimeComponents(timeLeft);
  const isUrgent = timeLeft < 300; // Less than 5 minutes

  return (
    <div className="flex items-center gap-2">
      {timeComponents.map((component, index) => (
        <React.Fragment key={component.label}>
          {index > 0 && (
            <span className={`text-lg font-bold ${isUrgent ? 'text-red-500' : 'text-gray-600'}`}>
              :
            </span>
          )}
          <div className="flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm
              ${isUrgent ? 'bg-red-500' : 'bg-red-400'}
            `}>
              {component.value}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PaymentTimer;
