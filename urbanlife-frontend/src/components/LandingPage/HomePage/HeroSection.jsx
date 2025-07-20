import { useEffect, useRef } from 'react';
import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";
import backgroundImg from '../../../../public/images/LandingPage/Parallax/backgroundimg.svg';
import planeImg from '../../../../public/images/LandingPage/Parallax/planeimg.svg';
import buildingImg from '../../../../public/images/LandingPage/Parallax/buildingimg.svg';

const HeroSection = () => {
  const backgroundRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight) {
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundPositionY = `${scrollY * 0.1}px`;
        }
        if (textRef.current) {
          const opacity = Math.max(0.5, 1 - (scrollY / windowHeight) * 1.5);
          textRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
          textRef.current.style.opacity = opacity;
        }
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="hero-section" ref={backgroundRef}>
      {/* Background Layer dengan Gedung dan Pesawat */}
      <div className="parallax-layer">
        <img src={buildingImg} alt="Building" className="building-image" />
        <img src={planeImg} alt="Plane" className="plane-image" />
      </div>

      {/* Main Content - PALING DEPAN */}
      <div className="hero-content">
        <div className="max-w-7xl mx-auto mt-10 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-16 lg:gap-50 py-10 md:py-20">
          {/* Hero Text */}
          <div ref={textRef} className="hidden md:block" style={{ width: "60%" }}>
            <p className="playfair text-7xl/25 font-bold text-left text-white py-5 ml-5">
              Discover <br />
              the beauty of places <br />
              around the world
            </p>
          </div>

          {/* CardForm (tetap di-komentarin) */}
          <div
            className="w-full md:w-auto"
            style={{ minWidth: "350px", maxWidth: "400px", flexShrink: 0 }}
          >
            {/* <CardForm /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;