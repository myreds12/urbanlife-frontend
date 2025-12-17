import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Button from "../../AdminDashboard/Utils/Ui/button/Button";
import ModalDestination from "../Utils/modal/ModalDestination";

const TourHeader = ({
  title,
  price,
  location,
  id,
  type,
  image,
  content,
  harga_anak,
  durasi_hari,
  itinerary = [],
  room_and_price = [],
  durasi = [],
  harga_dewasa = 0,
  tipe,
  price_list,
}) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleBookNow = () => {
    const tanggalHariIni = new Date().toISOString().split("T")[0];

    const bookingData = {
      id,
      title,
      type: type || "travel_package",
      country: location?.split(", ")?.[1] || "Unknown",
      location: location?.split(", ")?.[0] || "Unknown",
      image: image || "/public/images/error/No_Image_Available.jpg",
      content: content || {
        description: "No description available.",
        policies: [],
        itinerary: [],
        priceTable: [],
      },
      tanggal: tanggalHariIni,
    };

    switch ((type || "").toLowerCase()) {
      case "travel_package":
        bookingData.price = harga_dewasa ?? price ?? 0;
        bookingData.itinerary = itinerary;
        bookingData.harga_dewasa = harga_dewasa;
        bookingData.harga_anak = harga_anak;
        bookingData.durasi_hari = durasi_hari;
        break;
      case "akomodasi":
        bookingData.room_and_price = room_and_price;
        bookingData.price = room_and_price?.[0]?.harga ?? 0;
        break;
      case "kendaraan":
        bookingData.durasi = durasi;
        bookingData.tipe = tipe;
        bookingData.price = durasi?.[0]?.harga
          ? parseInt(durasi[0].harga)
          : price ?? 0;
        break;
      case "airport_shuttle":
        bookingData.price = price_list?.[0]?.harga ?? 0;
        bookingData.price_list = price_list;
        break;
      case "port_shuttle":
        bookingData.price = price_list?.[0]?.harga ?? 0;
        bookingData.price_list = price_list;
        break;
      default:
        bookingData.price = price ?? 0;
    }

    console.log("Navigating to DaytourDetail with data:", bookingData);

    navigate(`/OrderDetail?type=${(type || "").toLowerCase()}&id=${id}`, {
      state: bookingData,
    });
  };

const shareData = {
  title: t('sharemodal.share'),
  location: location || "", // Jangan split, kirim langsung
  description: title,
  image: image || "/public/images/error/No_Image_Available.jpg",
  url: `${window.location.origin}/tour/${title
    .replace(/\s+/g, "-")
    .toLowerCase()}?id=${id}`,
};


  const arrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );

  const shareIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="w-5 h-5"
    >
      <path
        fill="currentColor"
        d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"
      />
    </svg>
  );

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-4 md:gap-0 cm-50">
        <div>
          <div className="text-xl md:text-2xl font-semibold text-gray-900">
            {title}
          </div>
          {type === "travel_package"
          ? <p className="text-xl font-semibold text-gray-600">
            {i18n.language === "en" ? "Duration" : "Durasi"}: {durasi}
          </p>
          : <></>}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">{t("detail.startsfrom")}</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-sm md:text-base font-semibold text-red-600">
                Rp.
              </span>
              <span className="text-xl md:text-2xl font-bold text-red-600">
                {(Number(price) || 0).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="primary"
              size="md"
              endIcon={arrowIcon}
              onClick={handleBookNow}
              className="rounded-md w-full md:w-auto px-4 md:px-10 flex-1"
            >
              {t("detail.booknow")}
            </Button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-lg transition duration-200"
            >
              {shareIcon}
            </button>
          </div>
        </div>
      </div>
      {isShareModalOpen && (
        <ModalDestination
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            const url = new URL(window.location);
            url.searchParams.delete("id");
            window.history.replaceState({}, "", url);
          }}
          shareData={shareData}
        />
      )}
    </>
  );
};

export default TourHeader;
