import { Link } from "react-router-dom";
import "../../../styles/LandingPage/HomePage/PartnerCard1.css";


const PartnerCard1 = ({ image }) => {
  return (
    <>
        <div className="partner1-card">
        <div className="image-partner1">
        <img src={image}/>
      </div>
    </div>
    </>
  );
};

export default PartnerCard1;