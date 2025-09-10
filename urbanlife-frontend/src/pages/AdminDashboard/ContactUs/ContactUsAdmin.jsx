// import React, { useState, useEffect, useMemo } from "react";
// import Table from "../../../components/AdminDashboard/Utils/Table/Table";
// import Button from "../../../components/AdminDashboard/Utils/Ui/button/Button";
// import Pagination from "../../../components/AdminDashboard/Utils/Ui/Pagination/Pagination";
// import Search from "../../../components/AdminDashboard/Utils/Ui/button/Search";
// import BulkActionBar from "../../../components/AdminDashboard/Utils/BulkAction/BulkActionBar";
// import ModalView from "../../../components/AdminDashboard/Utils/Ui/modal/ModalDetail";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
// import toast from "react-hot-toast";

// const useDebouncedValue = (value, delay = 500) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// };

// const ContactUsAdmin = () => {
//   const navigate = useNavigate();

//   const [contactUsData, setContactUsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [take] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [selectedRows, setSelectedRows] = useState([]);

//   // modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedModalData, setSelectedModalData] = useState(null);

//   const itemsPerPage = 10;

//   // modal config utk contact us
//   const contactUsModalConfig = {
//     sections: [
//       {
//         title: "Contact Information",
//         fields: [
//           { key: "title", label: "Title" },
//           { key: "contact_info", label: "Contact Info", type: "text" },
//           { key: "services", label: "Services", type: "text" },
//         ],
//       },
//     ],
//   };

//   // bulk action config
//   const bulkEditableFields = [
//     {
//       name: "title",
//       label: "Title",
//       type: "text",
//       placeholder: "Enter title",
//       description: "Title for the contact information",
//     },
//     {
//       name: "contact_info",
//       label: "Contact Info",
//       type: "text",
//       placeholder: "Enter contact information",
//       description: "Contact information details",
//     },
//     {
//       name: "services",
//       label: "Services",
//       type: "text",
//       placeholder: "Enter services",
//       description: "Services offered",
//     },
//   ];

//   const debouncedSearch = useDebouncedValue(searchTerm);

//   const fetchContactUs = async (search = "") => {
//     setLoading(true);
//     try {
//       // TODO: Implement API call when backend is ready
//       // const params = {
//       //   page: currentPage,
//       //   take,
//       //   ...(search.trim() && { search: search.trim() }),
//       // };
//       // const res = await apiClient.get("/contact-us", { params });
//       // const { data, total } = res.data;
//       // setContactUsData(data);
//       // setTotal(total);
//       setContactUsData([]);
//       setTotal(0);
//     } catch (err) {
//       console.error("Failed to fetch contact us data", err);
//       toast.error("Failed to load contact us data");
//       setContactUsData([]);
//       setTotal(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContactUs(debouncedSearch);
//   }, [debouncedSearch, currentPage]);

//   const handleSort = (columnKey) => {
//     let direction = "asc";
//     if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key: columnKey, direction });
//     setCurrentPage(1);
//   };

//   const handleRowSelect = (rowId) => {
//     setSelectedRows((prev) =>
//       prev.includes(rowId)
//         ? prev.filter((id) => id !== rowId)
//         : [...prev, rowId]
//     );
//   };

//   const handleView = async (row) => {
//     try {
//       // TODO: Implement API call when backend is ready
//       // const { data } = await apiClient.get(`/contact-us/${row.id}`);
//       // setSelectedModalData(data.data);
      
//       setSelectedModalData(row);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Failed to fetch details:", error);
//       toast.error("Failed to load contact details");
//     }
//   };

//   // handler utk edit
//   const handleEdit = (row) => {
//     navigate(`/admin/contact-us/edit/${row.id}`);
//   };

//   // handler utk delete
//   const handleDelete = async (row) => {
//     const confirmed = window.confirm(
//       `Are you sure want to delete "${row.title}"?`
//     );
//     if (!confirmed) return;

//     try {
//       // TODO: Implement API call when backend is ready
//       // await apiClient.delete(`/contact-us`, {
//       //   data: { ids: [row.id] },
//       // });
      
//       toast.success(`"${row.title}" was successfully deleted.`);
      
//       fetchContactUs();
//     } catch (err) {
//       console.error("Failed to delete:", err);
//       toast.error("Could not delete the contact. Please try again.");
//     }
//   };

//   // bulkaction handlers
//   const handleBulkDelete = async (selectedData) => {
//     const confirmed = window.confirm(
//       `Delete ${selectedData.length} selected contacts?`
//     );
//     if (!confirmed) return;

//     try {
//       // TODO: Implement API call when backend is ready
//       // const ids = selectedData.map((item) => item.id);
//       // await apiClient.delete("/contact-us", { data: { ids } });
      
//       toast.success(`${selectedData.length} contacts were successfully deleted.`);
      
//       fetchContactUs();
//       setSelectedRows([]);
//     } catch (err) {
//       console.error("Bulk delete failed:", err);
//       toast.error("Could not delete the contacts. Please try again.");
//     }
//   };

//   const handleBulkExport = async (selectedData) => {
//     try {
//       const headers = ["ID", "Title", "Contact Info", "Services"];
//       const csvContent = [
//         headers.join(","),
//         ...selectedData.map((item) =>
//           [
//             item.id,
//             `"${item.title}"`,
//             `"${item.contact_info}"`,
//             `"${item.services}"`,
//           ].join(",")
//         ),
//       ].join("\n");

//       // Download CSV
//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const link = document.createElement("a");
//       const url = URL.createObjectURL(blob);
//       link.setAttribute("href", url);
//       link.setAttribute(
//         "download",
//         `contact_us_${new Date().toISOString().split("T")[0]}.csv`
//       );
//       link.style.visibility = "hidden";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       toast.success(`Successfully exported ${selectedData.length} contacts`);
//     } catch (err) {
//       console.error("Failed to export contacts", err);
//       toast.error("Failed to export contacts. Please try again.");
//     }
//   };

//   const handleClearSelection = () => {
//     setSelectedRows([]);
//   };

//   useEffect(() => {
//     if (contactUsData.length === 0) {
//       const sampleData = [
//         {
//           id: 1,
//           title: "Customer Service",
//           contact_info: "Email: service@company.com, Phone: +123456789",
//           services: "Product support, Returns, Refunds",
//         },
//         {
//           id: 2,
//           title: "Sales Department",
//           contact_info: "Email: sales@company.com, Phone: +987654321",
//           services: "Product inquiries, Bulk orders, Pricing",
//         },
//         {
//           id: 3,
//           title: "Technical Support",
//           contact_info: "Email: tech@company.com, Phone: +1122334455",
//           services: "Technical issues, Setup assistance, Troubleshooting",
//         },
//       ];
      
//       setContactUsData(sampleData);
//       setTotal(sampleData.length);
//     }
//   }, [contactUsData.length]);

//   const filteredData = useMemo(() => {
//     return contactUsData.filter((contact) =>
//       Object.values(contact).some((value) => {
//         if (value && typeof value === "object") {
//           return Object.values(value).some((nestedValue) =>
//             String(nestedValue).toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }
//         return String(value).toLowerCase().includes(searchTerm.toLowerCase());
//       })
//     );
//   }, [contactUsData, searchTerm]);

//   const sortedData = useMemo(() => {
//     const dataToSort = filteredData || contactUsData;
//     if (!sortConfig.key) return dataToSort;
//     return [...dataToSort].sort((a, b) => {
//       let aValue = a[sortConfig.key];
//       let bValue = b[sortConfig.key];

//       if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, contactUsData, sortConfig]);

//   const selectedData = useMemo(() => {
//     return sortedData.filter((item) => selectedRows.includes(item.id));
//   }, [sortedData, selectedRows]);

//   const totalPages =
//     Math.ceil(total / take) || Math.ceil(sortedData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const columns = [
//     "#",
//     "ID",
//     "Title",
//     "Contact Info",
//     "Services",
//     "Action",
//   ];

//   const mapping = {
//     "#": (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
//     "ID": (row) => row.id,
//     "Title": (row) => row.title || "-",
//     "Contact Info": (row) => row.contact_info || "-",
//     "Services": (row) => row.services || "-",
//     "Action": null,
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-600"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="p-5">
//         <div
//           style={{
//             background: "#ffffff",
//             borderRadius: "12px",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//             overflow: "hidden",
//             maxWidth: "1050px",
//             margin: "0 auto",
//           }}
//         >
//           {selectedRows.length > 0 && (
//             <BulkActionBar
//               selectedCount={selectedRows.length}
//               selectedData={selectedData}
//               onClearSelection={handleClearSelection}
//               onBulkDelete={handleBulkDelete}
//               onExport={handleBulkExport}
//               editableFields={bulkEditableFields}
//             />
//           )}

//           {/* Header */}
//           <div className="flex justify-between items-center mb-6 pt-3 pl-5 pr-5">
//             <div className="flex items-center gap-4">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Contact Us Management
//               </h1>
//             </div>

//             <div className="flex flex-wrap justify-between items-center gap-4">
//               <div className="flex-1 min-w-[200px]">
//                 <Search
//                   searchTerm={searchTerm}
//                   onSearchChange={setSearchTerm}
//                   placeholder="Search contacts..."
//                 />
//               </div>
//               <Button
//                 variant="primary"
//                 size="sm"
//                 className="whitespace-nowrap"
//                 onClick={() => navigate("/admin/contact-us/create")}
//               >
//                 Add Contact
//                 <i className="fa-solid fa-plus ml-2"></i>
//               </Button>
//             </div>
//           </div>

//           {/* Table */}
//           <div style={{ overflowX: "auto" }}>
//             <Table
//               data={currentData}
//               columns={columns}
//               selectedRows={selectedRows}
//               onRowSelect={handleRowSelect}
//               onSort={handleSort}
//               sortConfig={sortConfig}
//               startIndex={startIndex}
//               onView={handleView}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               defaultMapping={mapping}
//             />
//           </div>
//         </div>

//         {/* Data info dan Pagination */}
//         <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div className="text-sm text-gray-700">
//             Showing {startIndex + 1} to {Math.min(startIndex + take, total)} of{" "}
//             {total} contacts
//           </div>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//             size="base"
//           />
//         </div>
//       </div>

//       {/* Modal View */}
//       <ModalView
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Contact Details"
//         data={selectedModalData}
//         config={contactUsModalConfig}
//       />
//     </>
//   );
// };

// export default ContactUsAdmin;