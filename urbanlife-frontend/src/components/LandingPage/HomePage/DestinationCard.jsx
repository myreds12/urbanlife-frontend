import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../../../styles/LandingPage/HomePage/DestinationCard.css";
import ModalDestination from "../Utils/modal/ModalDestination";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const DestinationCard = ({ travel }) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Menambahkan/menghapus kelas modal-open pada auto-scroll-wrapper
  useEffect(() => {
    const wrapper = document.querySelector(".auto-scroll-wrapper");
    if (isShareModalOpen) {
      console.log("Adding modal-open class to auto-scroll-wrapper for:", travel.nama);
      wrapper?.classList.add("modal-open");
    } else {
      console.log("Removing modal-open class from auto-scroll-wrapper for:", travel.nama);
      wrapper?.classList.remove("modal-open");
    }
    // Cleanup saat component unmount
    return () => {
      wrapper?.classList.remove("modal-open");
    };
  }, [isShareModalOpen, travel.nama]);

  console.log(travel, "travel Data");

  const handleBookNow = () => {
    // Ambil tanggal hari ini dalam format YYYY-MM-DD
    const tanggalHariIni = new Date().toISOString().split("T")[0];

    // Siapkan data yang akan dipassing ke OrderDetail
    let bookingData = {
      id: travel.id,
      title: travel.nama,
      type: travel.item_type?.toLowerCase(),
      country: travel.lokasi?.negara?.nama || "Unknown",
      location: travel.lokasi?.nama || "Unknown",
      image: travel.file_url
        ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${travel.file_url
            .replace(/\\/g, "/")
            .replace(/^uploads\//, "")}`
        : "/images/default-thumbnail.png",
      content: travel.content || [],
      tanggal: tanggalHariIni,
    };

    // Tambahan properti tergantung jenis item
    switch (travel.item_type?.toLowerCase()) {
      case "travel_package":
        bookingData.price = travel.harga_dewasa ?? 0;
        bookingData.harga_dewasa = travel.harga_dewasa;
        bookingData.harga_anak = travel.harga_anak;
        bookingData.durasi_hari = travel.durasi_hari;
        break;

      case "akomodasi":
        bookingData.room_and_price = travel.room_and_price || [];
        bookingData.price = travel.room_and_price?.[0]?.harga ?? 0;
        break;

      case "kendaraan":
        bookingData.durasi = travel.durasi || [];
        bookingData.tipe = travel.tipe;
        bookingData.price = travel.durasi?.[0]?.harga
          ? parseInt(travel.durasi[0].harga)
          : 0;
        break;

      default:
        bookingData.price = 0;
    }

    // Debug
    console.log("Handle Booking Data:", bookingData);

    // Navigate ke OrderDetail page
    navigate(
      `/OrderDetail?type=${travel.item_type?.toLowerCase()}&id=${travel.id}`,
      {
        state: bookingData,
      }
    );
  };

  // Data untuk sharing
  const shareData = {
    title: "Bagikan Destinasi",
    location: travel.lokasi?.negara?.nama || "Unknown",
    description: `${travel.nama} - ${travel.item_type?.toLowerCase() === "kendaraan" && travel.durasi?.length > 0
      ? `${travel.durasi[0].durasi}`
      : travel.item_type?.toLowerCase() !== "kendaraan"
      ? `Durasi akan dipilih ketika pemesanan`
      : "1 - 12 hours"}`,
    image: travel.file_url
      ? `${apiClient.defaults.baseURL.replace(/\/$/, "")}/public/${travel.file_url
          .replace(/\\/g, "/")
          .replace(/^uploads\//, "")}`
      : "/images/default-thumbnail.png",
    url: `${window.location.origin}/destination/${travel.nama
      .replace(/\s+/g, "-")
      .toLowerCase()}?id=${travel.id}`,
  };

  return (
    <>
      <div className="destination-card">
        <div className="card-image">
          <img src={travel.image} alt={travel.nama} />
          <div className="country-label">{travel.lokasi?.negara?.nama}</div>
          <button
            onClick={() => {
              console.log(
                "Share button clicked for:",
                travel.nama,
                "Setting isShareModalOpen to true"
              );
              setIsShareModalOpen(true);
            }}
            className="share-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z" />
            </svg>
          </button>
          <button onClick={handleBookNow} className="book-btn">
            More Detail{" "}
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

        <div className="card-body">
          <h2 className="card-title">{travel.nama}</h2>
          <p className="destinations">
            {travel.item_type?.toLowerCase() === "kendaraan" &&
            travel.durasi?.length > 0
              ? `${travel.durasi[0].durasi}`
              : travel.item_type?.toLowerCase() !== "kendaraan"
              ? `Durasi akan dipilih ketika pemesanan`
              : "1 - 12 hours"}
          </p>
          <p className="price">
            From{" "}
            {Number(
              travel.item_type?.toLowerCase() === "kendaraan"
                ? travel?.durasi[0]?.harga ?? 0
                : travel.item_type?.toLowerCase() === "travel_package"
                ? travel.harga_dewasa
                : travel.harga
            ).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </div>

      {/* Share Modal menggunakan Portal */}
      {isShareModalOpen &&
        createPortal(
          <ModalDestination
            isOpen={isShareModalOpen}
            onClose={() => {
              console.log(
                "Modal closed for:",
                travel.nama,
                "Setting isShareModalOpen to false"
              );
              setIsShareModalOpen(false);
            }}
            shareData={shareData}
          />,
          document.body
        )}
    </>
  );
};

export default DestinationCard;