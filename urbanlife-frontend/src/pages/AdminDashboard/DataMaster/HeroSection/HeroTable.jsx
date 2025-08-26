import Table from "../../../../components/AdminDashboard/Utils/Table/Table";


const HeroTable = ({ heroImages, onEdit, onDelete, onSetActive }) => {
  const columns = [
    "#",
    "Preview",
    "Title",
    "Status",
    "Action",
  ];

  const defaultMapping = {
    "#": (_, index) => index + 1,
"Preview": (row) => {
  console.log(row); // cek apa isinya
  return (
    <div
      className="w-16 h-10 rounded-md overflow-hidden bg-gray-100 border cursor-pointer hover:opacity-80 transition"
      onClick={() => {
        import("sweetalert2").then(({ default: Swal }) => {
          Swal.fire({
            title: row.title || "Hero Image",
            imageUrl: row.image_url, // pastikan field ini benar
            imageAlt: row.title || "Hero preview",
            showCloseButton: true,
            showConfirmButton: false,
            width: "auto",
          });
        });
      }}
    >
      {row.image_url ? (
        <img
          src={row.image_url}
          alt="Hero preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );
},
    "Title": (row) => (
      <div className="max-w-xs">
        <p className="font-medium text-gray-900 truncate">{row.title || "-"}</p>
      </div>
    ),
//     "Description": (row) => (
//       <div className="max-w-xs">
//         <p className="text-sm text-gray-600 truncate">
//           {row.description || "-"}
//         </p>
//       </div>
//     ),
    "Status": (row) => (
      <div className="flex items-center gap-2">
        {row.is_active ? (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetActive(row.id);
            }}
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
            title="Set as active hero"
          >
            Set Active
          </button>
        )}
      </div>
    ),
  };

  const renderActions = (row) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(row)}
          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          title="Edit hero"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(row.id)}
          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          title="Delete hero"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <Table
      data={heroImages}
      columns={columns}
      defaultMapping={defaultMapping}
      customActions={renderActions}
      onEdit={() => {}} // Disabled because we use custom actions
      onDelete={() => {}} // Disabled because we use custom actions
    />
  );
};

export default HeroTable;