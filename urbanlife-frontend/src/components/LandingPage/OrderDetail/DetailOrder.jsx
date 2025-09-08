import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from "react-google-recaptcha";


const DetailOrder = ({ orderItems = [], finalAmount = null, onPayment, disabled = false }) => {
  const { t, i18n } = useTranslation();
  console.log('Current language:', i18n.language); // Debug bahasa saat ini

  const [captchaToken, setCaptchaToken] = useState(null);

  const handleVerify = (token) => {
    setCaptchaToken(token);
  };

  const handleClick = () => {
    if (!captchaToken) {
      alert("Silakan verifikasi reCAPTCHA terlebih dahulu!");
      return;
    }
    onPayment();
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
          disabled={disabled}
          className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition-all ${disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-cyan-600 hover:bg-cyan-600 active:bg-cyan-700 shadow-lg hover:shadow-xl"
            }`}
        >
          Select Payment
        </button>
      </div>
    </div>
  );
};

export default DetailOrder;