import { Link } from "react-router-dom";
import "../../../../styles/LandingPage/HomePage/PartnerCard.css";

const PartnerCard = ({ image }) => {
  return (
    <>
      <div className="partner-card">
        <div className="image-partner">
          <img src={image} alt="partner"/>
        </div>
      </div>
    </>
  );
};

export default PartnerCard;
