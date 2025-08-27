import React from "react";
import { Star, MapPin, Users, Clock, Settings, Car } from "lucide-react";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { formatBookingData } from "../../AdminDashboard/Utils/FormatData/bookingFormatData";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("Rp", "IDR");

  const handleDetailClick = () => {
    const bookingData = formatBookingData(service);

    navigate(`/Detail/${service.id}`, { state: bookingData });
  };
  const getPrice = () => {
    if (service.item_type === "KENDARAAN") {
      return Number(service.durasi?.[0]?.harga || service.harga || 0);
    }
    if (service.item_type === "AKOMODASI") {
      return Number(service.room_and_price?.[0]?.harga || service.harga || 0);
    }
    if (service.item_type === "TRAVEL_PACKAGE") {
      return Number(service.harga_dewasa) || Number(service.harga_anak) || 0;
    }
    return Number(service.harga || 0);
  };

  const getUnitLabel = () => {
    if (service.item_type === "KENDARAAN")
      return "/ " + (service.durasi?.[0]?.durasi || "duration");
    if (service.item_type === "AKOMODASI") return "/ night";
    if (service.item_type === "TRAVEL_PACKAGE") return "/ person";
    return "/ unit";
  };

  const imageUrl =
    service.file_url &&
    `${apiClient.defaults.baseURL}/public/${service.file_url
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;

  const renderBadge = () => (
    <>
      {/* Negara - pojok kiri atas */}
      {service.lokasi?.negara?.nama && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold shadow">
            {service.lokasi.negara.nama}
          </span>
        </div>
      )}

      {/* Item Type - pojok kiri bawah */}
      <div className="absolute bottom-3 left-3 z-10">
        <span
          className={`${
            service.item_type === "KENDARAAN"
              ? "bg-green-100 text-green-800"
              : service.item_type === "AKOMODASI"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          } px-3 py-1 rounded-full text-xs font-semibold shadow`}
        >
          {service.item_type === "KENDARAAN"
            ? "Rent Car"
            : service.item_type === "AKOMODASI"
            ? "Accommodation"
            : "Day Tour"}
        </span>
      </div>
    </>
  );

  const renderDetailInfo = () => {
    if (service.item_type === "KENDARAAN") {
      return (
        <div className="flex gap-6 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {service.kapasitas || 6} passengers
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {service.durasi?.[0]?.durasi || "-"}
          </div>
        </div>
      );
    }

    if (service.item_type === "AKOMODASI") {
      return (
        <div className="mb-2">
          <div className="flex items-start gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-sm font-semibold text-gray-700">
              Location
            </span>
          </div>
          <p className="text-sm text-gray-600 ml-6 leading-relaxed">
            {service.lokasi?.nama || "-"}
          </p>
        </div>
      );
    }

    if (service.item_type === "TRAVEL_PACKAGE") {
      const destinations =
        Array.isArray(service.itinerary) && service.itinerary.length > 0
          ? service.itinerary.map((item) => item.nama).join(", ")
          : "-";

      return (
        <div className="mb-2">
          <div className="flex items-start gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="text-sm font-semibold text-gray-700">
              Destinations
            </span>
          </div>
          <p className="text-sm text-gray-600 ml-6 leading-relaxed">
            {destinations}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow border hover:shadow-lg transition-all duration-300 max-w-5xl mx-auto lg:flex overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-full lg:w-1/3 aspect-[4/3] overflow-hidden rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none">
        <img
          src={imageUrl || "/public/images/error/No_Image_Available.jpg"}
          alt={service.nama}
          className="object-cover w-full h-full"
          onError={(e) =>
            (e.target.src = "/public/images/error/No_Image_Available.jpg")
          }
        />
        {renderBadge()}
      </div>

      {/* DETAILS */}
      <div className="w-full lg:w-2/3 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight">
            {service.nama}
          </h3>

          {/* Rating */}
          <div className="flex items-center text-sm text-gray-500 mb-2 gap-2">
            <span className="text-yellow-500 font-semibold">★ 4.5</span>
            <span className="text-gray-400">(124 traveler reviews)</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {service.content?.[0]?.deskripsi ||
              "Comfortable, clean, and affordable service."}
          </p>

          {renderDetailInfo()}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-200 mt-4 flex-wrap gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Start from</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-red-500">
                {formatPrice(getPrice())}
              </span>
              <span className="text-sm text-gray-500">{getUnitLabel()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDetailClick(service)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-full font-medium transition"
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
