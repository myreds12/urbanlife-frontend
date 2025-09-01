// import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import "../../../styles/LandingPage/HomePage/DiscoverCard.css";
// import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";
// import { useTranslation } from "react-i18next";
// import useEmblaCarousel from "embla-carousel-react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const dummyImages = [
//   "/public/images/error/No_Image_Available.jpg",
//   "/public/images/error/No_Image_Available_2.jpg",
//   "/public/images/error/No_Image_Available_3.jpg",
// ];

// const getRandomDummyImage = () =>
//   dummyImages[Math.floor(Math.random() * dummyImages.length)];

// const DiscoverCard = () => {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { t } = useTranslation();

//   // === Embla setup ===
//   const [emblaRef, emblaApi] = useEmblaCarousel({
//     align: "start",
//     loop: true,
//     slidesToScroll: 1,
//   });
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState([]);

//   const scrollPrev = useCallback(
//     () => emblaApi && emblaApi.scrollPrev(),
//     [emblaApi]
//   );
//   const scrollNext = useCallback(
//     () => emblaApi && emblaApi.scrollNext(),
//     [emblaApi]
//   );
//   const scrollTo = useCallback(
//     (index) => emblaApi && emblaApi.scrollTo(index),
//     [emblaApi]
//   );

//   useEffect(() => {
//     if (!emblaApi) return;
//     setScrollSnaps(emblaApi.scrollSnapList());
//     emblaApi.on("select", () =>
//       setSelectedIndex(emblaApi.selectedScrollSnap())
//     );
//   }, [emblaApi]);

//   // === Fetch data ===
//   const fetchCountries = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiClient.get(
//         "/negara?take=10&page=1&orderByMostItems=true"
//       );
//       if (response.data.status === 200) {
//         const filteredCountries = response.data.data.slice(0, 6); // ambil max 6 misalnya
//         setCountries(filteredCountries);
//       } else {
//         setError("Failed to fetch countries data");
//       }
//     } catch (err) {
//       setError("Error fetching data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchCountries();
//   }, []);

//   // === Loading Skeleton ===
//   if (loading) {
//     return (
//       <div className="flex gap-4">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="discover-card">
//             <div className="image-container">
//               <div className="animate-pulse bg-gray-300 h-48 w-full"></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchCountries}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {t("discover.try")}
//         </button>
//       </div>
//     );
//   }

//   if (!countries.length) {
//     return <p>No data available</p>;
//   }

//   return (
//     <div className="relative w-full">
//       {/* Carousel viewport */}
//       <div className="overflow-hidden px-4 md:px-8 lg:px-10" ref={emblaRef}>
//         <div className="flex">
//           {countries.map((country) => (
//             <div
//               className="flex-[0_0_80%] md:flex-[0_0_33%] lg:flex-[0_0_25%] px-2"
//               key={country.id}
//             >
//               <div className="discover-card embla__slide">
//                 <div className="image-container">
//                   <img
//                     src={
//                       country.url
//                         ? `${import.meta.env.VITE_API_URL}/public/${country.url
//                             .replace(/\\/g, "/")
//                             .replace(/^uploads\//, "")}`
//                         : getRandomDummyImage()
//                     }
//                     alt={country.nama || "Country Image"}
//                     onError={(e) => {
//                       e.target.src = getRandomDummyImage();
//                     }}
//                   />

//                   <div className="description relative z-10">
//                     <div className="country-title">
//                       {country.nama || "Unknown"}
//                     </div>
//                     <h2 className="city-title">
//                       {`${country.total_lokasi ?? 0} Cities`}
//                     </h2>
//                     <p className="desc-text">
//                       {`${country.total_lokasi ?? 0} Destinations, ${
//                         country.total_akomodasi ?? 0
//                       } Hotels, ${country.total_kendaraan ?? 0} Vehicles`}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white via-white/70 to-transparent z-10"></div> */}
//         <div className="hidden md:block pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white via-white/70 to-transparent z-10"></div>

//       </div>

//       <button
//         className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:shadow-lg rounded-full w-12 h-12 flex items-center justify-center shadow-md z-20 transition"
//         onClick={scrollPrev}
//       >
//         ‹
//       </button>
//       <button
//         className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:shadow-lg rounded-full w-10 h-10 flex items-center justify-center shadow-md z-20 transition"
//         onClick={scrollNext}
//       >
//         ›
//       </button>

//       <div className="flex justify-center mt-4 gap-2">
//         {scrollSnaps.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === selectedIndex ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onClick={() => scrollTo(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiscoverCard;
