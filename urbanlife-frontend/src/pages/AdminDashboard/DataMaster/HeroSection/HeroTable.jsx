import apiClient from "../../../../components/AdminDashboard/Utils/ApiClient/apiClient";
import Table from "../../../../components/AdminDashboard/Utils/Table/Table";

const HeroTable = ({ heroImages, onEdit, onDelete, onSetActive }) => {
  const columns = ["#", "Preview", "Title", "Status", "Action"];

  const getImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (image.url) {
      return `${apiClient.defaults.baseURL}/public/${image.url
        .replace(/\\/g, "/")
        .replace(/^uploads\//, "")}`;
    }
    return "";
  };

  const defaultMapping = {
    "#": (_, index) => index + 1,
    Preview: (row) => {
      const imageUrl = getImageUrl(row);

      return (
        <div
          className="w-40 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 border border-gray-300 cursor-pointer shadow-md 
               hover:opacity-90 hover:scale-105 transition-transform transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          onClick={(e) => {
            e.stopPropagation();
            import("sweetalert2").then(({ default: Swal }) => {
              Swal.fire({
                title: row.title || "Hero Image",
                imageUrl: imageUrl || "",
                imageAlt: row.title || "Hero preview",
                showCloseButton: true,
                showConfirmButton: false,
                width: "auto",
                background: "#fff",
                padding: "1.5rem",
                customClass: {
                  popup: "rounded-lg shadow-xl max-w-lg mx-4",
                  title: "text-lg font-semibold text-gray-900",
                  image: "rounded-md object-contain", // menggunakan object-contain supaya preview didialog tidak terpotong
                },
              });
            });
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              import("sweetalert2").then(({ default: Swal }) => {
                Swal.fire({
                  title: row.title || "Hero Image",
                  imageUrl: imageUrl || "",
                  imageAlt: row.title || "Hero preview",
                  showCloseButton: true,
                  showConfirmButton: false,
                  width: "auto",
                  background: "#fff",
                  padding: "1.5rem",
                  customClass: {
                    popup: "rounded-lg shadow-xl max-w-lg mx-4",
                    title: "text-lg font-semibold text-gray-900",
                    image: "rounded-md object-contain",
                  },
                });
              });
            }
          }}
          title={row.title || "Preview hero image"}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={row.title || "Hero preview"}
              className="w-full h-full object-cover" // object-cover menjaga proporsi tapi menutup seluruh area preview
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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

    Title: (row) => (
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
    Status: (row) => {
      // Cari status hero di state berdasarkan id
      const currentHero = heroImages.find((hero) => hero.id === row.id);
      const isActive = currentHero ? currentHero.status : false;
      console.log("Current hero status:", isActive);

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();

              // Toggle status aktif/nonaktif
              onSetActive(row.id, !isActive);

              // Update status lokal (opsional, jika ingin UI langsung terupdate)
            }}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              isActive
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-600 hover:bg-cyan-100 hover:text-cyan-700"
            }`}
            title={isActive ? "Set as inactive hero" : "Set as active hero"}
          >
            {isActive ? "Active" : "Set Active"}
          </button>
        </div>
      );
    },
  };

  const renderActions = (row) => {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(row)}
          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
          title="Edit hero"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(row.id)}
          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
          title="Delete hero"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
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
      onEdit={onEdit} // Disabled because we use custom actions
      onDelete={onDelete} // Disabled because we use custom actions
    />
  );
};

export default HeroTable;
