import React from 'react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  size = 'base' // 'sm' atau 'base'
}) => {
  const isSmall = size === 'sm';
  
  const baseClasses = `flex items-center justify-center leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200`;
  
  const sizeClasses = isSmall 
    ? 'px-3 h-8 text-sm' 
    : 'px-4 h-10 text-base';

  const activeClasses = `z-10 flex items-center justify-center ${sizeClasses} leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700`;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation">
      <ul className={`flex items-center -space-x-px ${isSmall ? 'h-8' : 'h-10'}`}>
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${baseClasses} ${sizeClasses} ms-0 border-e-0 rounded-s-lg ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg 
              className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} rtl:rotate-180`} 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 6 10"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={
                page === currentPage
                  ? activeClasses
                  : `${baseClasses} ${sizeClasses} cursor-pointer`
              }
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${baseClasses} ${sizeClasses} rounded-e-lg ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <span className="sr-only">Next</span>
            <svg 
              className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} rtl:rotate-180`} 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 6 10"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;