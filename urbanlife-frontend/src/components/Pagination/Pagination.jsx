const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6 space-x-1 text-sm">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded border ${
          page === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-gray-100 border-gray-400"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border ${
            p === page
              ? "bg-cyan-500 text-white border-cyan-500"
              : "hover:bg-gray-100 border-gray-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded border ${
          page === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "hover:bg-gray-100 border-gray-400"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
