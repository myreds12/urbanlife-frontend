import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../../../styles/LandingPage/HomePage/DestinationCard.css";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const DestinationCard = ({ travel }) => {
  const navigate = useNavigate();

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
        ? `${apiClient.defaults.baseURL.replace(
            /\/$/,
            ""
          )}/public/${travel.file_url
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

  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={travel.image} alt={travel.nama} />
        <div className="country-label">{travel.lokasi?.negara?.nama}</div>
        <div className="heart-icon"></div>
        <button onClick={handleBookNow} className="book-btn">
          Book now{" "}
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
            : travel.item_type?.toLowerCase() != "kendaraan"
            ? `Durasi akan dipilih ketika pemesanan`
            : "1 - 12 hours"}
          {/* {travel?.durasi?.lenght > 0
            ? `${travel.durasi} ${travel.tipe_durasi}`
            : "1 - 12 hours"} */}
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
  );
};

export default DestinationCard;
