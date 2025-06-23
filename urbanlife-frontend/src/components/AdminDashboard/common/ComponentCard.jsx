  import React from 'react';

  const ComponentCard = ({
    title,
    children,
    className = "",
    desc = "",
  }) => {
    return (
      <div className={className}>
        {(title || desc) && (
          <div className="px-4 pt-3 pb-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            )}
            {desc && (
              <p className="mt-1 text-sm text-gray-500">
                {desc}
              </p>
            )}
          </div>
        )}
        <div className="p-4 sm:p-6">
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    );
  };

  export default ComponentCard;