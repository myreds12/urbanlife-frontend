// import React from "react";

// const ContactHeader = ({
//   id,
//   isActive,
//   tagline,
//   title,
//   description,
//   onChange,
// }) => {
//   return (
//     <div id={id} className={isActive ? "block" : "hidden"}>
//       <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
//         {/* Tagline */}
//         <div className="flex items-center">
//           <label
//             className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
//             style={{ minWidth: "190px" }}
//           >
//             Tagline <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="tagline"
//             required
//             value={tagline}
//             onChange={onChange}
//             className="mt-1 py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
//             placeholder="Enter tagline"
//           />
//         </div>

//         {/* Title */}
//         <div className="flex items-center mt-5">
//           <label
//             className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
//             style={{ minWidth: "190px" }}
//           >
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             required
//             value={title}
//             onChange={onChange}
//             className="mt-1 py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
//             placeholder="Enter title"
//           />
//         </div>

//         {/* Description */}
//         <div className="flex items-center mt-5">
//           <label
//             className="block text-sm font-medium text-gray-600 mr-5 bg-gray-100 px-4 py-2 rounded-md"
//             style={{ minWidth: "190px" }}
//           >
//             Description <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="description"
//             required
//             value={description}
//             onChange={onChange}
//             className="mt-1 py-1 px-3 w-full rounded-md border border-gray-300 focus:ring-cyan-500"
//             placeholder="Enter description"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactHeader;
