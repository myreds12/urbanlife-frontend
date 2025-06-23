import { Link } from "react-router-dom";
import "../../components/LandingPage/PartnerCard1.css";


const PartnerCard1 = ({ image }: {image: string }) => {
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