import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import "../../../../styles/LandingPage/HomePage/DateInput.css";
import { useTranslation } from 'react-i18next';

export const DateInput = ({ label, selected, onChange, minDate }) => {
    const { t } = useTranslation();
  
  const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      wrapperClassName="w-full"
      className="w-full px-4 py-2.5 bg-gray-100 rounded-md text-sm text-gray-500 flex items-center justify-start gap-2"
    >
      <Calendar size={14} className="text-gray-400" />
      {value || placeholder}
    </button>
  ));

  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        {label}
      </label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd-MM-yyyy"
        minDate={minDate}
        placeholderText={t("dateinput.input")}
        customInput={<CustomInput />}
        popperClassName="custom-datepicker"
      />
    </div>
  );
};
