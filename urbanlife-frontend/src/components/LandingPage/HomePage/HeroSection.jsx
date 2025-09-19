import { useEffect, useState } from "react";
import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";
import apiClient from "../../AdminDashboard/Utils/ApiClient/apiClient";

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(heroData, "heroData");

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await apiClient.get("/hero-section");
        const active = data.data?.find(
          (h) => h.status === true
        );
        setHeroData(active || null);
      } catch (err) {
        console.error("❌ Failed to fetch hero section", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  const getImageUrl = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    } else if (image?.url) {
      return `${apiClient.defaults.baseURL}/public/${image.url
        .replace(/\\/g, "/")
        .replace(/^uploads\//, "")}`;
    }
    return "";
  };

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${getImageUrl(heroData)})`,
      }}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-6 lg:gap-45 py-8 sm:py-12 lg:py-20 min-h-screen">
        {/* Hero Text - Only visible on desktop */}
        <div className="hidden lg:block flex-1 max-w-2xl mb-20">
          <h1 className="playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-left text-white leading-tight">
            {heroData?.title || "Discover the beauty places around the world"}
          </h1>
        </div>

        {/* CardForm */}
        <div className="w-full lg:w-auto lg:min-w-[400px] lg:max-w-[400px] flex-shrink-0 cardform">
          <CardForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
