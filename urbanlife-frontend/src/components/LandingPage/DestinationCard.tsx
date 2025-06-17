import { Link } from "react-router-dom";

const DestinationCard = ({ title, price, image }: { title: string; price: string; image: string }) => {
  return (
    <div className="destination-card">
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="country-label">Vietnam</div>
        <div className="heart-icon"></div>
        <Link to="/book" className="book-btn">
          Book now <span className="arrow">→</span>
        </Link>
      </div>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="destinations">4 Destination</p>
        <p className="price">From Rp {price}</p>
      </div>
    </div>
  );
};

export default DestinationCard;