// import React from "react";

// const ContactInformation = ({ id, isActive, contactInfo, onChange }) => {
//   // Parse contactInfo dari string JSON ke array objek
//   const contacts = contactInfo ? JSON.parse(contactInfo) : [];

//   const handleAddContact = () => {
//     const newContact = {
//       id: Date.now(),
//       title: "",
//       icon: "",
//       contactDetails: "",
//     };

//     const updatedContacts = [...contacts, newContact];
//     onChange({
//       target: { name: "contact_info", value: JSON.stringify(updatedContacts) },
//     });
//   };

//   // Handler untuk menghapus kontak
//   const handleRemoveContact = (id) => {
//     if (contacts.length <= 1) return;
//     const updatedContacts = contacts.filter((contact) => contact.id !== id);
//     onChange({
//       target: { name: "contact_info", value: JSON.stringify(updatedContacts) },
//     });
//   };

//   // Handler untuk mengubah data kontak
//   const handleContactChange = (id, field, value) => {
//     const updatedContacts = contacts.map((contact) => {
//       if (contact.id === id) {
//         return { ...contact, [field]: value };
//       }
//       return contact;
//     });

//     onChange({
//       target: { name: "contact_info", value: JSON.stringify(updatedContacts) },
//     });
//   };

//   return (
//     <div id={id} className={isActive ? "block" : "hidden"}>
//       <div className="bg-white p-6 rounded-lg shadow-md shadow-black/20">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Contact Information</h2>
//           <button
//             type="button"
//             onClick={handleAddContact}
//             className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-600 text-sm"
//           >
//             Add Contact Method
//           </button>
//         </div>

//         {contacts.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             <p>No contact methods added yet.</p>
//             <p className="text-sm mt-2">
//               Click "Add Contact Method" to get started.
//             </p>
//           </div>
//         ) : (
//           contacts.map((contact, index) => (
//             <div
//               key={contact.id}
//               className="mb-6 p-4 border border-gray-200 rounded-lg"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-medium">Contact Method {index + 1}</h3>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveContact(contact.id)}
//                   className="text-red-500 hover:text-red-700 text-sm"
//                   disabled={contacts.length <= 1}
//                 >
//                   Remove
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={contact.title || ""}
//                   onChange={(e) =>
//                     handleContactChange(contact.id, "title", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                   placeholder="e.g., General Inquiries"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Contact Details *
//                 </label>
//                 <textarea
//                   value={contact.contactDetails || ""}
//                   onChange={(e) =>
//                     handleContactChange(
//                       contact.id,
//                       "contactDetails",
//                       e.target.value
//                     )
//                   }
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 resize-none"
//                   placeholder="Enter contact information (email, phone, etc.)"
//                   required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Separate different contact methods with spaces or new lines
//                 </p>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Icon
//                 </label>
//                 <input
//                   type="text"
//                   value={contact.icon || ""}
//                   onChange={(e) =>
//                     handleContactChange(contact.id, "icon", e.target.value)
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
//                   placeholder="Icon name or URL"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter icon name (from icon library) or URL to an image
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactInformation;
