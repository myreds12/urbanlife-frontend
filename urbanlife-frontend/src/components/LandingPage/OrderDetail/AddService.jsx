import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

const AddServices = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-2">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-cyan-600 font-semibold text-base"
      >
        <span>Add other services</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Dropdown */}
      <div
        className={`transition-all duration-300 ease-in-out mt-4 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <button className="w-full flex justify-between items-center px-4 py-3 border border-cyan-500 rounded-md text-cyan-600 hover:bg-gray-100 mb-2">
          <span>Rent car</span>
          <Plus size={18} />
        </button>

        <button className="w-full flex justify-between items-center px-4 py-3 border border-cyan-500 rounded-md text-cyan-600 hover:bg-gray-100">
          <span>Accomodation</span>
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default AddServices;
