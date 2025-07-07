import React from "react";

const PriceSection = ({ amount, onPayment, disabled = false }) => {
  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 
      w-full md:max-w-md lg:max-w-sm mx-auto md:mx-0 
      md:sticky md:top-4"
    >
      <div className="mb-6 text-center">
        <h3 className="text-sm sm:text-base font-medium text-gray-600 mb-1">
          Final Amount
        </h3>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{Number(amount).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}</p>
      </div>

      <button
        onClick={onPayment}
        disabled={disabled}
        className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition-all ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl"
        }`}
      >
        Select Payment Option
      </button>

      {disabled && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Please agree to terms and conditions to continue
          </p>
        )}
      </div>
  );
};

export default PriceSection;
