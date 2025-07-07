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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-4 md:gap-0">
        <div className="text-xl md:text-2xl font-semibold text-gray-900">{title}</div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
        <div>
        <p className="text-gray-400 text-sm mb-1">Start From</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-sm md:text-base font-semibold text-red-600">IDR</span>
          <span className="text-xl md:text-2xl font-bold text-red-600">
            {price.toLocaleString()}
          </span>
        </div>
      </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="primary"
            size="md"
            endIcon={arrowIcon}
            onClick={handleBookNow}
            className="rounded-md w-full md:w-auto px-4 md:px-10 flex-1"
          >
            Book Now
          </Button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="w-11 h-11 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-lg transition duration-200"
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
