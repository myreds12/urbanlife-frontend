import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/CategoriesCard.css";


const CategoriesCard = ({ country, title, destinations, price, image }) => {
  return (
    <>
      <div className="categories-card">
          <div className="image-categories">
            <img src={image} alt={title} />
            <div className="country-categories">{country}</div>
          </div>
          <div className="body-categories">
            <h2 className="title-categories">{title}</h2>
            <p className="categories-categories">{destinations}</p>
            <p className="price-categories">From Rp {price}</p>
          </div>
      </div>

    </>
  );
};

export default CategoriesCard;