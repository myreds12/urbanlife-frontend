import React from "react";
import { Star, MapPin, Users, Clock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatBookingData } from "../../AdminDashboard/Utils/FormatData/bookingFormatData";
import { useTranslation } from 'react-i18next';
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // ====== PRICE FORMATTING ======
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("Rp", "IDR");

  const getPrice = () => {
    if (service.item_type === "KENDARAAN") {
      return Number(service.durasi?.[0]?.harga || service.harga || 0);
    }
    if (service.item_type === "AKOMODASI") {
      return Number(service.room_and_price?.[0]?.harga || service.harga || 0);
    }
    if (service.item_type === "TRAVEL_PACKAGE") {
      return Number(service.harga_dewasa || service.harga_anak || service.harga || 0);
    }
    if (["AIRPORT_SHUTTLE", "PORT_SHUTTLE"].includes(service.item_type)) {
      return Number(service.price?.[0]?.harga || 0);
    }
    return Number(service.harga || 0);
  };

  const getUnitLabel = () => {
    if (service.item_type === "KENDARAAN")
      return "/ " + (service.durasi?.[0]?.durasi || "duration");
    if (service.item_type === "AKOMODASI") return "/ night";
    if (["TRAVEL_PACKAGE", "AIRPORT_SHUTTLE", "PORT_SHUTTLE"].includes(service.item_type)) return t("servicepage./person");
    return t("servicepage.per_unit");
  };

  // ====== GET DESCRIPTION BY LANGUAGE ======
  const getDescription = () => {
    const language = i18n.language === "id" ? "INDONESIA" : "ENGLISH";
    const content = service.content?.find(c => c.bahasa === language) || 
                    service.content?.[0] || 
                    { deskripsi: t("servicepage.default_description") };
    return content.deskripsi || t("servicepage.default_description");
  };

  // ====== GET ITINERARY BY LANGUAGE ======
  const getDestinations = () => {
    const language = i18n.language === "id" ? "INDONESIA" : "ENGLISH";
    const filteredItinerary = Array.isArray(service.itinerary) 
      ? service.itinerary.filter(item => item.bahasa === language)
      : [];
    return filteredItinerary.length > 0 
      ? filteredItinerary.map(item => item.nama).join(", ")
      : t("servicepage.no_destinations");
  };

  const handleDetailClick = () => {
    try {
      const bookingData = formatBookingData(service);
      navigate(`/Detail/${service.id}`, { state: bookingData });
    } catch (error) {
      console.error("Error formatting booking data:", error.message);
    }
  };

  const renderDetailInfo = () => {
    if (service.item_type === "KENDARAAN") {
      return (
        <div className="mb-4">
          <div className="flex items-start gap-4 text-sm text-gray-600">
            {service.kapasitas && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{t('servicepage.passengers', { count: service.kapasitas })}</span>

              </div>
            )}
            {service.transmission && (
              <div className="flex items-center gap-1">
                <Settings className="w-4 h-4 text-gray-400" />
                <span>{service.transmission}</span>
              </div>
            )}
            {service.durasi?.[0]?.durasi && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{service.durasi[0].durasi}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (service.item_type === "AKOMODASI") {
      return (
        <div className="mb-4">
          <div className="flex items-start gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700">{t("servicepage.location")}</span>
          </div>
          <p className="text-sm text-gray-600 ml-6 leading-relaxed">
            {service.lokasi?.nama || t("servicepage.nolocation")}
          </p>
        </div>
      );
    }

    if (service.item_type === "TRAVEL_PACKAGE") {
      return (
        <div className="mb-4">
          <div className="flex items-start gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700">{t("servicepage.destination")}</span>
          </div>
          <p className="text-sm text-gray-600 ml-6 leading-relaxed">
            {getDestinations()}
          </p>
        </div>
      );
    }

    return null;
  };

  const imageUrl =
    service.file_url &&
    `${apiClient.defaults.baseURL}/public/${service.file_url
      .replace(/\\/g, "/")
      .replace(/^uploads\//, "")}`;

  // ====== SERVICE TYPE STYLING ======
  const getServiceTypeStyle = () => {
    if (service.item_type === "KENDARAAN") return "bg-green-100 text-green-800";
    if (service.item_type === "AKOMODASI") return "bg-purple-100 text-purple-800";
    if (service.item_type === "TRAVEL_PACKAGE") return "bg-blue-100 text-blue-800";
    if (["AIRPORT_SHUTTLE", "PORT_SHUTTLE"].includes(service.item_type)) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 max-w-5xl mx-auto flex flex-col lg:flex-row overflow-hidden min-h-[320px]">
      {/* ====== IMAGE SECTION ====== */}
      <div className="relative w-full lg:w-2/5 h-60 lg:h-auto">
        <img
          src={imageUrl || "/public/images/error/No_Image_Available.jpg"}
          alt={service.nama}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={(e) => (e.target.src = "/public/images/error/No_Image_Available.jpg")}
        />
        {/* Country Badge */}
        {service.lokasi?.negara?.nama && (
          <div className="absolute top-4 left-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
              {service.lokasi.negara.nama}
            </span>
          </div>
        )}
        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
              {t("servicepage.popular")}
            </span>
          </div>
        )}
        {/* Service Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`${getServiceTypeStyle()} backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm`}
          >
            {service.item_type === "KENDARAAN"
              ? t("servicepage.rentcar")
              : service.item_type === "AKOMODASI"
              ? t("servicepage.accommodation")
              : service.item_type === "TRAVEL_PACKAGE"
              ? t("servicepage.daytour")
              : service.item_type === "AIRPORT_SHUTTLE"
              ? t("servicepage.airport_shuttle")
              : t("servicepage.port_shuttle")
            }
          </span>
        </div>
      </div>

      {/* ====== CONTENT SECTION ====== */}
      <div className="w-full lg:w-3/5 p-6 flex flex-col justify-between">
        <div className="flex-grow">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 leading-tight line-clamp-2">
            {service.nama}
          </h3>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {service.rating || 4.0}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({service.reviews || 0} {t("servicepage.traveler_reviews")})
            </span>
          </div>
          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
            "{getDescription()}"
          </p>
          {/* Service-specific Information */}
          {renderDetailInfo()}
        </div>

        {/* ====== PRICE & ACTION SECTION ====== */}
        <div className="flex items-end justify-between pt-4 border-t border-gray-200 mt-4 flex-wrap gap-4">
          {/* Price */}
          <div>
            <div className="text-sm text-gray-500 mb-1">{t("servicepage.startsfrom")}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-red-500">
                {formatPrice(getPrice())}
              </span>
              <span className="text-sm text-gray-500">{getUnitLabel()}</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleDetailClick(service)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-medium transition"
            >
              {t("servicepage.detail")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;