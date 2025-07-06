import { useNavigate } from 'react-router-dom';
import Button from '../../AdminDashboard/Utils/Ui/button/Button';

const TourHeader = ({ title, price }) => {
  const navigate = useNavigate();

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

  // Ikon panah untuk tombol
  const arrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );

  return (
    <div className="flex items-center justify-between mt-5 rounded-lg">
      <div className="text-2xl font-semibold text-gray-900">{title}</div>
      <div className="flex items-center gap-5">
        <div>
          <p className="text-gray-400 text-sm">Start From</p>
          <h4 className="text-2xl font-bold text-red-600">IDR {price.toLocaleString()}</h4>
        </div>
        <Button
          variant="primary"
          size="md"
          endIcon={arrowIcon}
          onClick={handleBookNow}
          className="rounded-md px-15 font-bold"
        >
          BOOK NOW
        </Button>
      </div>
    </div>
  );
};

export default TourHeader;