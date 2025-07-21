import { useEffect, useRef } from 'react';
import "../../../styles/LandingPage/HomePage/HeroSection.css";
import CardForm from "./CardForm/CardForm";
import backgroundImg from '../../../../public/images/LandingPage/Parallax/backgroundimg.svg';
import planeImg from '../../../../public/images/LandingPage/Parallax/planeimg.svg';
import buildingImg from '../../../../public/images/LandingPage/Parallax/buildingimg.svg';

const HeroSection = () => {
  const backgroundRef = useRef(null);
  const buildingRef = useRef(null);
  const planeRef = useRef(null);
  const textRef = useRef(null);
  const formref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Only apply parallax when hero section is visible
      if (scrollY < windowHeight * 1.2) {
        // Background layer - slowest movement
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Building layer - medium movement (closer to viewer)
        if (buildingRef.current) {
          buildingRef.current.style.transform = `translate(-50%, ${scrollY * 0.4}px)`;
        }
        
        // Plane layer - fastest movement (furthest from viewer)
        if (planeRef.current) {
          planeRef.current.style.transform = `translate(-50%, ${scrollY * -0.3}px)`;
        }
        
        // Text layer - subtle movement with fade
        if (textRef.current) {
          const opacity = Math.max(0.3, 1 - (scrollY / windowHeight) * 1.2);
          textRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
          textRef.current.style.opacity = opacity;
        }
        
        // CardForm layer - subtle movement with fade
        if (formref.current) {
          const opacity = Math.max(0.3, 1 - (scrollY / windowHeight) * 1.2);
          formref.current.style.transform = `translateY(${scrollY * 0.15}px)`;
          formref.current.style.opacity = opacity;
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

    // Set initial state
    handleScroll();
    
    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="hero-section">
      {/* Background Layer - Paling Belakang */}
      <div className="parallax-background" ref={backgroundRef}>
        <img src={backgroundImg} alt="Background" className="background-image" />
      </div>

      {/* Plane Layer - Layer Tengah (bergerak ke atas saat scroll) */}
      <div className="parallax-plane">
        <img 
          ref={planeRef}
          src={planeImg} 
          alt="Plane" 
          className="plane-image" 
        />
      </div>

      {/* Building Layer - Layer Depan (bergerak ke bawah saat scroll) */}
      <div className="parallax-building">
        <img 
          ref={buildingRef}
          src={buildingImg} 
          alt="Building" 
          className="building-image" 
        />
      </div>

      {/* Main Content - PALING DEPAN */}
      <div className="hero-content">
        <div className="max-w-7xl mx-auto mt-7 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-16 lg:gap-50 py-10 md:py-20">
          {/* Hero Text */}
          <div ref={textRef} className="hero-text hidden md:block" style={{ width: "60%"}}>
            <p className="playfair hero-title font-bold text-left text-white py-5 ml-5 leading-tight">
              Discover <br />
              the beauty places
              around the world
            </p>
          </div>

          {/* CardForm */}
          <div ref={formref} className="card-form-container w-full md:w-auto" style={{ minWidth: "350px", maxWidth: "400px", flexShrink: 0 }}>
            <CardForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;