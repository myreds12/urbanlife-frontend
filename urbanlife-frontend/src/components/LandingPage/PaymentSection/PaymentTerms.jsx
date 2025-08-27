// src/components/PaymentSelection/PaymentTerms.jsx
import React from "react";
import { useTranslation, Trans } from "react-i18next";

const PaymentTerms = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm text-gray-600 leading-relaxed">
        <Trans
          i18nKey="payment.proceeding"
          components={{
            terms: (
              <a
                href="#"
                className="text-cyan-600 hover:text-cyan-700 underline"
                onClick={(e) => e.preventDefault()}
              />
            ),
            privacy: (
              <a
                href="#"
                className="text-cyan-600 hover:text-cyan-700 underline"
                onClick={(e) => e.preventDefault()}
              />
            ),
          }}
        />{" "}
      </p>
    </div>
  );
};

export default PaymentTerms;
