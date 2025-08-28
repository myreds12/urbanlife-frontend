// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft, ChevronRight, ShoppingCart, X } from "lucide-react";
// import Navbar from "../../HomePage/Navbar/Navbar";
// import Footer from "../../HomePage/Footer";
// import "./AccoDetail.css";
// import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

// const AccoDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [accommodation, setAccommodation] = useState(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [roomImageIndices, setRoomImageIndices] = useState({});
//   const thumbnailSliderRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   // Helper untuk format URL file
//   const formatFileUrl = (path) => {
//     if (!path) return "/public/images/error/No_Image_Available.jpg";
//     return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
//       .replace(/\\/g, "/") // backslash → slash
//       .replace(/^uploads\//, "")}`; // hapus 'uploads/' di awal
//   };

//   // Inisialisasi roomImageIndices berdasarkan akomodasi_room_and_price
//   useEffect(() => {
//     if (accommodation?.akomodasi_room_and_price) {
//       const initialIndices = accommodation.akomodasi_room_and_price.reduce((acc, room) => ({
//         ...acc,
//         [room.nama]: 0
//       }), {});
//       setRoomImageIndices(initialIndices);
//     }
//   }, [accommodation]);

//   // Fetch data dari API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await apiClient.get(/akomodasi/${id});
//         setAccommodation(res.data.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const scrollThumbnail = (direction) => {
//     if (!thumbnailSliderRef.current) return;
//     const scrollAmount = 250;
//     thumbnailSliderRef.current.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const heroSection = document.querySelector(".hero-section");
//       if (heroSection) {
//         const rect = heroSection.getBoundingClientRect();
//         const x = ((e.clientX - rect.left) / rect.width) * 100;
//         const y = ((e.clientY - rect.top) / rect.height) * 100;
//         setMousePosition({ x, y });
//       }
//     };

//     const heroSection = document.querySelector(".hero-section");
//     if (heroSection) {
//       heroSection.addEventListener("mousemove", handleMouseMove);
//       return () =>
//         heroSection.removeEventListener("mousemove", handleMouseMove);
//     }
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen) return;
//       switch (e.key) {
//         case 'Escape':
//           closeModal();
//           break;
//         case 'ArrowLeft':
//           handleImageNavigation("prev");
//           break;
//         case 'ArrowRight':
//           handleImageNavigation("next");
//           break;
//         default:
//           break;
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [isModalOpen, currentImageIndex]);

//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isModalOpen]);

//   const handleImageNavigation = (direction) => {
//     if (!accommodation?.akomodasi_file) return;
//     if (direction === "next") {
//       setCurrentImageIndex((prev) =>
//         prev === accommodation.akomodasi_file.length - 1 ? 0 : prev + 1
//       );
//     } else {
//       setCurrentImageIndex((prev) =>
//         prev === 0 ? accommodation.akomodasi_file.length - 1 : prev - 1
//       );
//     }
//   };

//   const openModal = (index = 0) => {
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleModalBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       closeModal();
//     }
//   };

//   const handleHomeClick = () => {
//     navigate("/");
//   };

//   const handleOrderClick = () => {
//     const tanggalHariIni = new Date().toISOString().split("T")[0];

//     const bookingData = {
//       id,
//       title: accommodation.nama,
//       type: "akomodasi",
//       country: accommodation.location?.split(", ")?.[1] || "Unknown",
//       location: accommodation.location?.split(", ")?.[0] || "Unknown",
//       image: formatFileUrl(accommodation?.akomodasi_file?.[0]?.url) || "/public/images/error/No_Image_Available.jpg",
//       content: accommodation.akomodasi_content?.[0] || {
//         description: "No description available.",
//         policies: [],
//         itinerary: [],
//         priceTable: [],
//       },
//       tanggal: tanggalHariIni,
//     };

//     // Sama seperti di handleBookNow → masukkan data spesifik untuk akomodasi
//     bookingData.room_and_price = accommodation.akomodasi_room_and_price;
//     bookingData.price = accommodation.akomodasi_room_and_price?.[0]?.harga ?? 0;

//     console.log("Navigating to OrderDetail with data:", bookingData);

//     navigate(/OrderDetail?type=akomodasi&id=${id}, {
//       state: bookingData,
//     });
//   };

//   const handleRoomThumbnailClick = (roomName, index) => {
//     setRoomImageIndices((prev) => ({
//       ...prev,
//       [roomName]: index
//     }));
//   };

//   if (loading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (!accommodation) {
//     return (
//       <div className="acco-detail-page">
//         <Navbar />
//         <div className="not-found">
//           <h2>Data Not Available</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
//           >
//             Back to Home
//           </button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="acco-detail-page">
//       {/* Navbar fixed */}
//       <div className="navbar-fixed">
//         <Navbar />
//       </div>

//       {/* Hero Section */}
//       <div
//         className="hero-section"
//         style={{
//           background: radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #00A5CC 0%, #007F9F 40%, #0092B8 100%),
//         }}
//       >
//         <div className="hero-decorations">
//           <div className="floating-element diamond diamond-1"></div>
//           <div className="floating-element diamond diamond-2"></div>
//           <div className="floating-element diamond diamond-3"></div>
//           <div className="floating-element triangle triangle-1"></div>
//           <div className="floating-element triangle triangle-2"></div>
//           <div className="floating-element triangle triangle-3"></div>
//           <div className="floating-element hexagon hexagon-1"></div>
//           <div className="floating-element hexagon hexagon-2"></div>
//           <div className="floating-line line-1"></div>
//           <div className="floating-line line-2"></div>
//           <div className="floating-line line-3"></div>
//           <div className="dots-pattern dots-1"></div>
//           <div className="dots-pattern dots-2"></div>
//         </div>

//         <div className="hero-content">
//           <h1 className="hero-title playfair">{accommodation.nama}</h1>
//           <div className="breadcrumb">
//             <button
//               className="breadcrumb-link cursor-pointer"
//               onClick={handleHomeClick}
//             >
//               Home
//             </button>
//             <span className="separator">/</span>
//             <span>{accommodation.kategori}</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="acco-container space-y-8">
//         {/* Image Gallery + Info */}
//         <div className="image-gallery-section">
//           <div className="thumbnail-slider-wrapper">
//             <button
//               className="slider-arrow left p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
//               onClick={() => scrollThumbnail("left")}
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//             <div className="thumbnail-slider" ref={thumbnailSliderRef}>
//               {accommodation.akomodasi_file.map((file, idx) => (
//                 <img
//                   key={idx}
//                   src={formatFileUrl(file.url)}
//                   alt={Hotel view ${idx + 1}}
//                   className="gallery-thumb cursor-pointer rounded-lg border-2 border-gray-200 hover:border-cyan-500"
//                   onClick={() => openModal(idx)}
//                 />
//               ))}
//             </div>
//             <button
//               className="slider-arrow right p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
//               onClick={() => scrollThumbnail("right")}
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="info-basic">
//             <div className="info-row flex justify-between items-center">
//               <span className="info-label text-lg font-semibold text-gray-800">
//                 {accommodation.kategori}
//               </span>
//               <button
//                 onClick={handleOrderClick}
//                 className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-md"
//               >
//                 <ShoppingCart size={16} />
//                 Order Now
//               </button>
//             </div>
//             <div className="info-description mt-2 text-gray-700 text-sm leading-relaxed">
//               <p>{accommodation.akomodasi_content[0]?.deskripsi}</p>
//             </div>
//           </div>
//         </div>

//         {/* Pricing and Facility */}
//         <div className="pricing-facility-section">
//           <h3 className="section-title text-xl font-semibold mb-4">Pricing & Facility</h3>
//           <div className="space-y-4">
//             {accommodation.akomodasi_room_and_price.map((room, idx) => {
//               const fasilitasGroup = accommodation.akomodasi_facility_group.find(
//                 (f) => f.nama === room.nama
//               );
//               const currentRoomIndex = roomImageIndices[room.nama] || 0;
//               return (
//                 <div
//                   key={idx}
//                   className="room-card border rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row"
//                 >
//                   <div className="room-image-box md:w-1/3">
//                     <img
//                       src={formatFileUrl(room.AkomodasiFile[0]?.url)}
//                       alt={${room.nama} preview}
//                       className="w-full h-48 object-cover cursor-pointer"
//                       onClick={() => openModal(currentRoomIndex)}
//                     />
//                     <div className="room-thumbnails flex gap-2 mt-2 p-2">
//                       {accommodation.akomodasi_file.slice(0, 3).map((file, index) => (
//                         <img
//                           key={index}
//                           src={formatFileUrl(file.url)}
//                           alt={Thumb ${index + 1}}
//                           className={`w-16 h-16 rounded-lg border-2 ${
//                             currentRoomIndex === index
//                               ? "border-cyan-500"
//                               : "border-gray-200 hover:border-gray-300"
//                           } cursor-pointer`}
//                           onClick={() => handleRoomThumbnailClick(room.nama, index)}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <div className="room-detail flex-1 p-4">
//                     <div className="room-header flex justify-between items-center mb-2">
//                       <h4 className="room-name text-lg font-semibold">{room.nama}</h4>
//                       <p className="room-price text-cyan-700 font-bold">
//                         IDR {parseInt(room.harga).toLocaleString()}
//                       </p>
//                     </div>
//                     <p className="facility-title font-medium">Facilities:</p>
//                     <ul className="room-facilities list-disc pl-5 mt-1 text-gray-700 text-sm">
//                       {fasilitasGroup?.fasilitas.map((fac, index) => (
//                         <li key={index}>{fac.nama}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Image Modal */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
//           onClick={handleModalBackdropClick}
//         >
//           <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
//             <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">{accommodation.nama} Gallery</h3>
//               <button
//                 onClick={closeModal}
//                 className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 aria-label="Close gallery"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="relative bg-gray-50 flex items-center justify-center min-h-[400px]">
//               <img
//                 src={formatFileUrl(accommodation.akomodasi_file[currentImageIndex]?.url)}
//                 alt={Hotel view ${currentImageIndex + 1}}
//                 className="max-w-full max-h-[500px] object-contain"
//                 loading="lazy"
//               />
//               {accommodation.akomodasi_file.length > 1 && (
//                 <>
//                   <button
//                     onClick={() => handleImageNavigation("prev")}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>
//                   <button
//                     onClick={() => handleImageNavigation("next")}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     aria-label="Next image"
//                   >
//                     <ChevronRight className="w-6 h-6" />
//                   </button>
//                 </>
//               )}
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
//                 {currentImageIndex + 1} / {accommodation.akomodasi_file.length}
//               </div>
//             </div>
//             <div className="p-4 bg-white border-t border-gray-200">
//               <div className="flex gap-2 overflow-x-auto pb-2">
//                 {accommodation.akomodasi_file.map((file, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
//                       index === currentImageIndex
//                         ? 'border-cyan-500 ring-2 ring-cyan-200'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <img
//                       src={formatFileUrl(file.url)}
//                       alt={${accommodation.nama} thumbnail ${index + 1}}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default AccoDetail;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import TourImage from "../../DayTour/TourImage";
// import TourHeader from "../../DayTour/TourHeader";
// import TourDescription from "../../DayTour/TourDescription";
// import TourRoomAndPrice from "../../DayTour/TourRoomAndPrice";
// import Navbar from "../../HomePage/Navbar/Navbar";
// import Footer from "../../HomePage/Footer";
// import "../../../../styles/LandingPage/DayTour/DaytourDetail.css";
// import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

// const AccoDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("description");
//   const [tourData, setTourData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helper untuk format URL file
//   const formatFileUrl = (path) => {
//     if (!path) return "/public/images/error/No_Image_Available.jpg";
//     return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
//       .replace(/\\/g, "/") // backslash → slash
//       .replace(/^uploads\//, "")}`; // hapus 'uploads/' di awal
//   };

//   // Fetch data dari API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await apiClient.get(/akomodasi/${id});
//         const accommodation = res.data.data;

//         // Transform data ke format yang sama dengan DayTourDetail
//         const transformedData = {
//           ...accommodation,
//           id: accommodation.id,
//           title: accommodation.nama,
//           type: "akomodasi",
//           price: accommodation.akomodasi_room_and_price?.[0]?.harga || "0",
//           location: accommodation.location || "",
//           images: accommodation.akomodasi_file?.map(file => formatFileUrl(file.url)) || ["/public/images/error/No_Image_Available.jpg"],
//           description: accommodation.akomodasi_content?.[0]?.deskripsi || "No description available.",
//           policies: accommodation.akomodasi_content?.[0]?.policies || [],
//           room_and_price: accommodation.akomodasi_room_and_price || [],
//           // Data tambahan untuk keperluan booking
//           akomodasi_facility_group: accommodation.akomodasi_facility_group || []
//         };

//         setTourData(transformedData);
//       } catch (err) {
//         console.error("Error fetching accommodation:", err);
//         navigate("/not-found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchData();
//     }
//   }, [id, navigate]);

//   // Tab configuration
//   const tabs = [
//     { id: "description", label: "Description" },
//     ...(tourData?.room_and_price?.length > 0
//       ? [{ id: "room_and_price", label: "Room & Price" }]
//       : []),
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
//       </div>
//     );
//   }

//   if (!tourData) {
//     return (
//       <div className="min-h-screen">
//         <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
//           <Navbar />
//         </div>
//         <div className="flex flex-col items-center justify-center min-h-screen pt-20">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accommodation Not Found</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Fixed Navbar */}
//       <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
//         <Navbar />
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto p-6 space-y-8 pt-24">
//         {/* Tour Image Gallery */}
//         <TourImage images={tourData.images} title={tourData.title} />

//         {/* Tour Header with Book Now */}
//         <TourHeader
//           title={tourData.title}
//           price={tourData.price}
//           location={tourData.location}
//           id={tourData.id}
//           type={tourData.type}
//           image={tourData.images?.[0]}
//           content={{
//             description: tourData.description,
//             policies: tourData.policies,
//             itinerary: [],
//             priceTable: [],
//           }}
//           room_and_price={tourData.room_and_price}
//         />

//         {/* Tab Navigation */}
//         <div className="mt-8 mb-1">
//           <nav className="flex space-x-7">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-1 font-medium text-lg navbar-menu-item relative ${
//                   activeTab === tab.id ? "active" : ""
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Tab Content */}
//         <div className="min-h-96">
//           {activeTab === "description" && (
//             <TourDescription
//               description={tourData.description}
//               policies={tourData.policies}
//             />
//           )}
//           {activeTab === "room_and_price" && (
//             <TourRoomAndPrice
//               roomAndPrice={tourData.room_and_price}
//               facilityGroups={tourData.akomodasi_facility_group}
//             />
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AccoDetail;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TourImage from "../../DayTour/TourImage";
import TourHeader from "../../DayTour/TourHeader";
import TourDescription from "../../DayTour/TourDescription";
import TourRoomAndPrice from "../../DayTour/TourRoomAndPrice";
import TourPolicies from "../../DayTour/TourPolicies";
import Navbar from "../../HomePage/Navbar/Navbar";
import Footer from "../../HomePage/Footer";
import "../../../../styles/LandingPage/DayTour/DaytourDetail.css";
import "./AccoDetail.css";
import TourFacilities from "../../DayTour/TourFacility";
import apiClient from "../../../AdminDashboard/Utils/ApiClient/apiClient";

const AccoDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const formatFileUrl = (path) => {
    if (!path) return "/public/images/error/No_Image_Available.jpg";
    return `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${path
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/akomodasi");
        const accommodation = res.data.data[0]; // Ambil data pertama dari array

        if (!accommodation) {
          setTourData(null);
          return;
        }

        // Transform data sesuai struktur API
        const transformedData = {
          id: accommodation.id,
          title: accommodation.nama,
          type: "akomodasi",
          price: accommodation.akomodasi_room_and_price?.[0]?.harga || "0",
          location: accommodation.lokasi?.nama || "",
          images: accommodation.akomodasi_file?.map(file => formatFileUrl(file.url)) || [],
          description:
            accommodation.akomodasi_content?.find(c => c.bahasa === "ENGLISH")?.deskripsi ||
            accommodation.akomodasi_content?.[0]?.deskripsi ||
            "Tidak ada deskripsi.",
          facilities:
            accommodation.akomodasi_facility_group?.flatMap(group =>
              group.fasilitas?.map(f => ({ nama: f.nama })) || []
            ) || [],
          policies: accommodation.akomodasi_content?.[0]?.kebijakan
            ? accommodation.akomodasi_content[0].kebijakan.split("\n").map(p => ({ policyname: p }))
            : [],
          room_and_price:
            accommodation.akomodasi_room_and_price?.map(room => ({
              nama: room.nama,
              harga: room.harga,
              AkomodasiFile: room.AkomodasiFile || [],
              amenity: room.amenity?.map(f => ({ nama: f })) || [],
            })) || [],
        };

        setTourData(transformedData);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        setTourData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    { id: "description", label: t("detail.description") },
    { id: "facilities", label: t("detail.facility") },
    ...(tourData?.room_and_price?.length > 0
      ? [{ id: "room_and_price", label: t("detail.roomnprice") }]
      : []),
    { id: "policies", label: t("detail.policy") },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-cyan-600" />
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
          <Navbar />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen pt-20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {t("detail.noaccomodation")}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t("detail.backtohome")}
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-8 pt-24">
        <TourImage images={tourData.images} title={tourData.title} />
        <TourHeader
          title={tourData.title}
          price={tourData.price}
          location={tourData.location}
          id={tourData.id}
          type={tourData.type}
          image={tourData.images?.[0]}
          content={{
            description: tourData.description,
            policies: tourData.policies,
            itinerary: [],
            priceTable: [],
          }}
          room_and_price={tourData.room_and_price}
        />
        <div className="mt-8 mb-1">
          <nav className="flex space-x-7">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-1 font-medium text-lg navbar-menu-item relative ${
                  activeTab === tab.id ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="min-h-96">
          {activeTab === "description" && (
            <TourDescription description={tourData.description} />
          )}
          {activeTab === "facilities" && (
            <TourFacilities facilities={tourData.facilities} />
          )}
          {activeTab === "room_and_price" && (
            <TourRoomAndPrice roomAndPrice={tourData.room_and_price} />
          )}
          {activeTab === "policies" && (
            <TourPolicies policies={tourData.policies} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccoDetail;