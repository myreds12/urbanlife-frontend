import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import apiClient from "../../../components/AdminDashboard/Utils/ApiClient/apiClient";

const ServiceScheduleCard = () => {
  const { t, i18n } = useTranslation();
  console.log('Current language:', i18n.language); // Debug bahasa saat ini

  useEffect(() => {
    console.log('Language changed to:', i18n.language); // Debug perubahan bahasa
  }, [i18n.language]);

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get("/service-schedule");
      const data = res.data.data || [];
      console.log('API schedule data:', data); // Debug data API

      // Transform data dari API ke format UI
      const transformedSchedule = data.map(item => ({
        day: item.hari,
        time: item.jam_buka,
        highlight: item.is_special_day
      }));

      setSchedule(transformedSchedule);
    } catch (err) {
      console.error(t("servicenschedule.error_fetch_schedule"), err);
      setError(t("servicenschedule.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 max-sm:px-10 py-10">
        <div className="flex flex-col lg:flex-row items-start gap-y-10 lg:gap-x-12">
          <div className="w-full lg:w-[60%]">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-96 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="w-full lg:w-[40%]">
            <div className="space-y-2 mb-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className="h-10 w-full bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 max-sm:px-10 py-10 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchSchedule}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {t("servicenschedule.try")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 max-sm:px-10 py-10">
      <div className="flex flex-col lg:flex-row items-start gap-y-10 lg:gap-x-12">
        {/* Kiri - Teks */}
        <div className="w-full lg:w-[60%]">
          <h2 className="playfair text-3xl font-bold text-[#071C4D] mb-4 leading-tight">
            {t("servicenschedule.title")}
          </h2>
          <p className="text-[#4f4f4f] text-base leading-relaxed">
            {t("servicenschedule.desc")}
          </p>
        </div>

        {/* Kanan - Schedule */}
        <div className="w-full lg:w-[40%]">
          {schedule.length === 0 ? (
            <p className="text-gray-500 italic">{t("servicenschedule.no_data")}</p>
          ) : (
            <div className="space-y-2 mb-4">
              {schedule.map(({ day, time, highlight }) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#071C4D]" />
                    <span className="text-[#071C4D] font-semibold text-sm uppercase">
                      {day}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      highlight ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link to="/ContactUs">
            <button className="w-full bg-[#0092B8] hover:bg-[#007F9F] text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300">
              {t("servicenschedule.button")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceScheduleCard;