import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../styles/LandingPage/Payment/PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Header */}
      <header className="w-full py-4 flex justify-center items-center space-x-2 bg-white/80 backdrop-blur-sm">
        <img src="/images/All/Logo.png" alt="UrbanLife Logo" className="h-10" />
        <div className="text-sm text-gray-600 font-medium">
          {t("payment.beyond")}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <img
            src="/images/All/email-box.png"
            alt="Email Box"
            className="w-48 h-48 mx-auto animate-float"
          />
        </div>
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{t("payment.success")}</h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md">
          {t("payment.instructiion")}
          <br />
          {t("payment.read")}
        </p>
        <button
          onClick={handleGoHome}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          {t("payment.home")}
        </button>
      </main>

      {/* Footer (optional, can be removed if not needed) */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        <p>© 2025 UrbanLife. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentSuccess;
