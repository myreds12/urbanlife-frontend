import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 z-50 rounded-[1vw] flex items-center justify-between w-11/12 max-w-10xl">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="bg-white p-2 rounded-lg flex items-center">
          <img src="/public/logo.png" alt="Urbanlife Logo" className="h-6 mr-2" />
          
        </div>
      </div>

      {/* Menu Section */}
      <div className="hidden lg:flex space-x-6">
        <div className="relative group">
          <span className="text-gray-800 hover:text-teal-500 cursor-pointer">Place to see</span>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md w-32">
            <Link to="/home" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</Link>
          </div>
        </div>
        <Link to="/transportation" className="text-gray-800 hover:text-teal-500">Transportation services</Link>
        <Link to="/accommodation" className="text-gray-800 hover:text-teal-500">Accommodation</Link>
        <Link to="/day-tour" className="text-gray-800 hover:text-teal-500">Day tour</Link>
        <Link to="/news" className="text-gray-800 hover:text-teal-500">News</Link>
        <Link to="/contact" className="text-gray-800 hover:text-teal-500 flex items-center">
          <span>Eng</span>
          <span className="ml-1 text-gray-500">🌐</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg w-48">
          <ul className="flex flex-col space-y-2 p-4">
            <li><Link to="/place-to-see" className="text-gray-800 hover:text-teal-500">Place to see</Link></li>
            <li><Link to="/transportation" className="text-gray-800 hover:text-teal-500">Transportation services</Link></li>
            <li><Link to="/accommodation" className="text-gray-800 hover:text-teal-500">Accommodation</Link></li>
            <li><Link to="/day-tour" className="text-gray-800 hover:text-teal-500">Day tour</Link></li>
            <li><Link to="/news" className="text-gray-800 hover:text-teal-500">News</Link></li>
            <li>
              <Link to="/contact" className="text-gray-800 hover:text-teal-500 flex items-center">
                <span>Eng</span>
                <span className="ml-1 text-gray-500">🌐</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Contact Us Button */}
      <div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm">
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;