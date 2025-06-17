const HeroSection = () => {
  return (
    <section className="hero min-h-screen bg-teal-100 relative overflow-hidden pt-24">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold text-white">Discover the beauty of Southeast Asia</h1>
          <p className="text-3xl text-white mt-4">Indonesia & Vietnam await!</p>
        </div>
      </div>
      <img
        src="/images/plane.svg"
        alt="Plane"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 opacity-80"
      />
      <img
        src="/images/building-background.jpg"
        alt="Building Background"
        className="absolute bottom-0 left-0 w-full h-1/3 object-cover opacity-50"
      />
    </section>
  );
};

export default HeroSection;