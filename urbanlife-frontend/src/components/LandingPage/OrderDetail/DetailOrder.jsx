import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from "react-google-recaptcha";


const DetailOrder = ({ orderItems = [], finalAmount = null, onPayment, disabled = false }) => {
  const { t, i18n } = useTranslation();
  console.log('Current language:', i18n.language); // Debug bahasa saat ini

  const [captchaToken, setCaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (token) => {
    setCaptchaToken(token);
  };

  const handleClick = async () => {
    if (!captchaToken) {
      alert("Silakan verifikasi reCAPTCHA terlebih dahulu!");
      return;
    }
    
    setIsLoading(true); 
    try {
      await onPayment();
    } catch (error) {
      console.error("Terjadi kesalahan saat proses pembayaran:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Language changed to:', i18n.language); // Debug perubahan bahasa
  }, [i18n.language]);

  console.log(orderItems, finalAmount, 'detailorder');

  const formatCurrency = (amount) => {
    if (!amount) return 'Rp. 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('IDR', 'Rp.');
  };

  const formatFinalAmount = (amount) => {
    if (!amount) return 'IDR 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Detail Order Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('detailorder.title')}</h3>

        {/* Gray divider line */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Order Items List */}
        <div className="space-y-4">
          {orderItems.map((item, index) => (
            <div key={item.item_id || index} className="space-y-2">
              <div className="text-gray-700">
                {index + 1}. {item.title || t('detailorder.item_default')}
              </div>
              <div className="flex justify-between items-center text-gray-600 ml-4">
                <span>{t('detailorder.subtotal')}</span>
                <span>{formatCurrency(item.total_harga || finalAmount)}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Final Amount Section */}
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-700">{t('detailorder.final_amount')}</span>
        <span className="text-2xl font-bold text-red-500">
          {formatFinalAmount(finalAmount)}
        </span>
      </div>

      {/* Payment Button */}
      <div className="pt-4">
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={handleVerify}
          className="mb-3 flex justify-center"
        />

        <button
          onClick={handleClick}
          disabled={disabled || isLoading}
          className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition-all ${disabled || isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-600 active:bg-cyan-700 shadow-lg hover:shadow-xl"
            }`}
        >
          {isLoading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin w-5 h-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
              </svg>
              {t('detailorder.processing')}...
            </span>
          ) : (
            t('detailorder.select_payment')
          )}
        </button>
      </div>
    </div>
  );
};

export default DetailOrder;