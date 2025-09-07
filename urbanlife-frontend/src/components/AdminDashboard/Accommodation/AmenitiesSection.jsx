// import { useEffect } from "react";

// const AmenitiesSection = ({
//   id,
//   isActive,
//   amenities,
//   setAmenities,
//   roomPrices,
// }) => {

//   useEffect(() => {
//     const updatedAmenities = roomPrices.map((room) => {
//       const existing = amenities.find((f) => f.nama === room.nama);
//       return {
//         nama: room.nama || "",
//         amenities: existing?.amenities || [],
//       };
//     });
//     setAmenities(updatedAmenities);
//   }, [roomPrices]);


//   const handleAmenitiesChange = (groupIndex, amenitiesIndex, value) => {
//     const updated = [...amenities];
//     updated[groupIndex].amenities[amenitiesIndex].nama = value;
//     setAmenities(updated);
//   };

//   const addAmenities = (groupIndex) => {
//     const updated = [...amenities];
//     updated[groupIndex].amenities.push({ nama: "" });
//     setAmenities(updated);
//   };

//   const removeAmenities = (groupIndex, amenitiesIndex) => {
//     const updated = [...amenities];
//     updated[groupIndex].amenities.splice(amenitiesIndex, 1);
//     setAmenities(updated);
//   };

//   return (
//     <div
//       id={id}
//       className={`transition-opacity duration-500 ${
//         isActive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
//       }`}
//     >
//       <h3 className="text-xl font-semibold text-gray-800 mb-4">
//         Amenities
//       </h3>

//       <div className="space-y-6">
//         {amenities.map((group, groupIndex) => (
//           <div key={groupIndex} className="bg-white p-4 rounded-lg shadow-md">
//             <div className="flex items-center justify-between mb-5">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">
//               {group.nama || `Room ${groupIndex + 1}`}
//             </h3>
//             <button
//               type="button"
//               onClick={() => addAmenities(groupIndex)}
//               className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm px-6 py-2 rounded-md"
//             >
//               Add Amenity +
//             </button>


//             </div>

//             <div className="space-y-2">
//               {group.amenities.map((item, amenitiesIndex) => (
//                 <div key={amenitiesIndex} className="flex gap-2 items-center">
//                 <label className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2 rounded-md min-w-[95px] text-center">
//                   Amenity <span className="text-red-500">*</span>
//                 </label>
//                   <input
//                     type="text"
//                     placeholder="Amenity name"
//                     required
//                     name="nama"
//                     value={item.nama}
//                     onChange={(e) =>
//                       handleAmenitiesChange(
//                         groupIndex,
//                         amenitiesIndex,
//                         e.target.value
//                       )
//                     }
//                     className="w-full py-1 px-3 border border-gray-300 focus:ring-cyan-500 rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeAmenities(groupIndex, amenitiesIndex)}
//                     className="text-red-600 border border-red-400 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AmenitiesSection;
