// import React, { useState, useEffect } from "react";

// const ContactServices = ({ id, isActive, services, onChange }) => {
//   // State for title and description with default values
//   const [title, setTitle] = useState(services?.title || "");
//   const [description, setDescription] = useState(services?.description || "");

//   // Update local state when props services change
//   useEffect(() => {
//     setTitle(services?.title || "");
//     setDescription(services?.description || "");
//   }, [services?.title, services?.description]);

//   // Handle title change
//   const handleTitleChange = (e) => {
//     const newTitle = e.target.value;
//     setTitle(newTitle);
//     onChange({
//       ...services,
//       title: newTitle,
//       items: services?.items || [],
//     });
//   };

//   // Handle description change
//   const handleDescriptionChange = (e) => {
//     const newDescription = e.target.value;
//     setDescription(newDescription);
//     onChange({
//       ...services,
//       description: newDescription,
//       items: services?.items || [],
//     });
//   };

//   // Handle individual service change
//   const handleServiceChange = (index, field, value) => {
//     const currentItems = services?.items || [];
//     const updatedServices = [...currentItems];

//     // Ensure item exists at that index
//     if (updatedServices[index]) {
//       updatedServices[index] = {
//         ...updatedServices[index],
//         [field]: value,
//       };
//     }

//     onChange({
//       ...services,
//       title: title,
//       description: description,
//       items: updatedServices,
//     });
//   };

//   // Add new service
//   const addService = () => {
//     const newService = { icon: "", name: "" };
//     const currentItems = services?.items || [];
//     const updatedServices = [...currentItems, newService];

//     onChange({
//       ...services,
//       title: title,
//       description: description,
//       items: updatedServices,
//     });
//   };

//   // Remove service
//   const removeService = (index) => {
//     const currentItems = services?.items || [];
//     const updatedServices = [...currentItems];
//     updatedServices.splice(index, 1);

//     onChange({
//       ...services,
//       title: title,
//       description: description,
//       items: updatedServices,
//     });
//   };

//   const currentItems = services?.items || [];

//   return (
//     <div id={id} className={isActive ? "block" : "hidden"}>
//       <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
//         {/* Title input */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={handleTitleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
//             placeholder="Example: Our Services"
//           />
//         </div>

//         {/* Description input */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={handleDescriptionChange}
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
//             placeholder="Example: We provide a variety of high-quality services to meet your needs..."
//           />
//         </div>

//         {/* Services list */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Services
//           </label>

//           {currentItems.length > 0 ? (
//             currentItems.map((service, index) => (
//               <div
//                 key={index}
//                 className="flex items-center mb-3 p-3 border border-gray-200 rounded-md"
//               >
//                 {/* Icon URL input */}
//                 <div className="mr-3 flex-shrink-0">
//                   <label className="block text-xs text-gray-500 mb-1">
//                     Icon URL
//                   </label>
//                   <input
//                     type="text"
//                     value={service.icon || ""}
//                     onChange={(e) =>
//                       handleServiceChange(index, "icon", e.target.value)
//                     }
//                     className="w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600 text-xs"
//                     placeholder="https://icon-url.com"
//                   />
//                 </div>

//                 {/* Service name input */}
//                 <div className="flex-grow">
//                   <label className="block text-xs text-gray-500 mb-1">
//                     Service Name
//                   </label>
//                   <input
//                     type="text"
//                     value={service.name || ""}
//                     onChange={(e) =>
//                       handleServiceChange(index, "name", e.target.value)
//                     }
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-600"
//                     placeholder="Example: Web Development"
//                   />
//                 </div>

//                 {/* Delete button */}
//                 <button
//                   type="button"
//                   onClick={() => removeService(index)}
//                   className="ml-3 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
//                   title="Remove service"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="text-gray-500 text-sm italic p-4 border border-dashed border-gray-300 rounded-md text-center">
//               No services yet. Click "Add Service" to create your first service.
//             </div>
//           )}

//           {/* Add service button */}
//           <button
//             type="button"
//             onClick={addService}
//             className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm font-medium transition-colors"
//           >
//             + Add Service
//           </button>
//         </div>

//         <div className="bg-blue-50 p-3 rounded-md">
//           <p className="text-xs text-blue-700 mb-1">
//             <strong>Tips:</strong>
//           </p>
//           <ul className="text-xs text-blue-600 space-y-1">
//             <li>• Title & Description explain the overall services</li>
//             <li>• Each individual service can be added/removed freely</li>
//             <li>• Icon URL should be a square image (64x64px or larger)</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactServices;