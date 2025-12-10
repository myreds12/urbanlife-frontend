import { Link, useNavigate } from "react-router-dom";
import "../../../../styles/LandingPage/HomePage/PopularCard.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalDestination from "../../Utils/modal/ModalDestination";
import { formatBookingData } from "../../../AdminDashboard/Utils/FormatData/bookingFormatData";
import { useTranslation } from "react-i18next";


const PopularCard = ({ item }) => {
  const navigate = useNavigate()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { t } = useTranslation()

  useEffect(() => {
    const wrapper = document.querySelector(".auto-scroll-wrapper");
    if (isShareModalOpen) {
      wrapper?.classList.add("modal-open");
    } else {
      wrapper?.classList.remove("modal-open");
    }
    return () => wrapper?.classList.remove("modal-open");
    }, [isShareModalOpen, item.nama]);

  const handleBookNow = () => {
    const bookingData = formatBookingData(item);
  
    console.log("Handle Booking Data:", bookingData);
    
    navigate(`/Detail/${item.id}`, { state: bookingData });
  };
  
  const shareData = {
    title: "Share Destination",
    location: item.lokasi?.negara?.nama || "Unknown",
    // description: `${item.nama} - ${item.item_type === "kendaraan" && item.durasi?.length > 0
    //   ? `${item.durasi[0].durasi}`
    //   : item.item_type !== "kendaraan"
    //   ? t('sharemodal.duration')
    //   : "1 - 12 hours"}`,
    description: item.nama,
    image: item.image,
    url: `${window.location.origin}/destination/${item.nama
      .replace(/\s+/g, "-")
      .toLowerCase()}?id=${item.id}`,
  };
  
  let harga = 0;

  if (item?.item_type === "kendaraan") {
      harga = item?.kendaraan_durasi?.[0]?.harga ?? 0;
  } else if (item?.item_type === "travel_package") {
      harga = item?.harga_dewasa ?? 0;
  } else if (item?.item_type === "airport_shuttle") {
      harga = item?.airport_shuttle_price?.[0]?.harga ?? 0;
  } else if (item?.item_type === "port_shuttle") {
      harga = item?.port_shuttle_price?.[0]?.harga ?? 0;
  } else {
      harga = item?.akomodasi_room_and_price?.[0]?.harga ?? 0;
  }

  return (
    <>
      <div className="categories-card">
          <div className="image-categories">
            <img src={item.image} alt={item.nama} />
            <div className="country-categories">{item.lokasi?.negara?.nama}</div>
            <button
            onClick={() => {
              console.log("Share button clicked for:", item.nama, "Setting isShareModalOpen to true");
              setIsShareModalOpen(true);
            }}
            className="share-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z" />
            </svg>
          </button>
          <button onClick={handleBookNow} className="book-btn">
            {t("cardform.more_detail")}
            <span className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </button>
          </div>
          <div className="body-categories">
            <h2 className="title-categories">{item.nama}</h2>
            <p className="categories-categories">{item.destinations}</p>
            <p className="price-categories">
              {t("cardform.from")} {Number(
              harga
            ).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}  
            </p>
          </div>
      </div>
      {isShareModalOpen &&
        createPortal(
          <ModalDestination
            isOpen={isShareModalOpen}
            onClose={() => {
              console.log("Modal closed for:", item.nama, "Setting isShareModalOpen to false");
              setIsShareModalOpen(false);
            }}
            shareData={shareData}
          />,
          document.body
        )}
    </>
  );
};

export default PopularCard;
