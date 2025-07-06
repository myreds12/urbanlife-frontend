import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../AdminDashboard/Utils/Ui/button/Button';
import ModalDestination from '../Utils/modal/ModalDestination';

const TourHeader = ({ title, price }) => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleBookNow = () => {
    const bookingData = {
      date: 'Kam, 08 Mei 2025',
      duration: '1 - 12 hours',
      location: 'Nusa Penida',
      vehicle: title,
      image: 'image-url',
      price: `Rp ${price}`,
    };
    navigate("/OrderDetail", { state: bookingData });
  };

  const shareData = {
    title: "Bagikan Tour",
    location: "Nusa Penida",
    description: title,
    image: 'image-url',
    url: `${window.location.origin}/tour/${title.replace(/\s+/g, '-').toLowerCase()}`
  };

  const arrowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );

  const shareIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
      className="w-5 h-5">
      <path fill="currentColor" d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 
        0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 
        0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 
        32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 
        45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 
        14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 
        0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 
        14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 
        448c-17.7 0-32-14.3-32-32l0-64z"/>
    </svg>
  );

  return (
    <>
      <div className="flex items-center justify-between mt-5 rounded-lg">
        <div className="text-2xl font-semibold text-gray-900">{title}</div>
        <div className="flex items-center gap-3">
          <div>
            <p className="text-gray-400 text-sm">Start From</p>
            <h4 className="text-2xl font-bold text-red-600">
              IDR {price.toLocaleString()}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="md"
              endIcon={arrowIcon}
              onClick={handleBookNow}
              className="rounded-md px-10"
            >
              Book Now
            </Button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm bg-white hover:bg-gray-100 transition"
            >
              {shareIcon}
            </button>
          </div>
        </div>
      </div>

      {isShareModalOpen && (
        <ModalDestination
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          shareData={shareData}
        />
      )}
    </>
  );
};

export default TourHeader;
