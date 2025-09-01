import { Link } from "react-router-dom";
import "../../../../styles/LandingPage/HomePage/PopularCard.css";


const PopularCard = ({ item }) => {
  return (
    <>
      <div className="categories-card">
          <div className="image-categories">
            <img src={item.image} alt={item.title} />
            <div className="country-categories">{item.country}</div>
          </div>
          <div className="body-categories">
            <h2 className="title-categories">{item.title}</h2>
            <p className="categories-categories">{item.destinations}</p>
            <p className="price-categories">From Rp {item.price}</p>
          </div>
      </div>

    </>
  );
};

export default PopularCard;
