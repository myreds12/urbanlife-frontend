import { Link } from "react-router-dom";
import "../../../../styles/LandingPage/HomePage/DiscoverCard.css";

const DiscoverCard = ({ country }) => {
  const getRandomDummyImage = () =>
    [
      "/public/images/error/No_Image_Available.jpg",
      "/public/images/error/No_Image_Available_2.jpg",
      "/public/images/error/No_Image_Available_3.jpg",
    ][Math.floor(Math.random() * 3)];

  return (
    <div className="discover-card">
      <div className="image-container">
        <img
          src={
            country.url
              ? `${import.meta.env.VITE_API_URL}/public/${country.url
                  .replace(/\\/g, "/")
                  .replace(/^uploads\//, "")}`
              : getRandomDummyImage()
          }
          alt={country.nama || "Country Image"}
          onError={(e) => {
            e.target.src = getRandomDummyImage();
          }}
        />
        <div className="description relative z-10">
          <div className="country-title">{country.nama || "Unknown"}</div>
          <h2 className="city-title">{`${country.total_lokasi ?? 0} Cities`}</h2>
          <p className="desc-text">
            {`${country.total_lokasi ?? 0} Destinations, ${
              country.total_akomodasi ?? 0
            } Hotels, ${country.total_kendaraan ?? 0} Vehicles`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverCard;