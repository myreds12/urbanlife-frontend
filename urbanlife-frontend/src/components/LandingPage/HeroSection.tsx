import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="hero min-h-screen bg-teal-100 relative overflow-hidden pt-20">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white">Discover the beauty of Southeast Asia</h1>
          <p className="text-2xl text-white mt-4">Indonesia & Vietnam await!</p>
          <SearchForm />
        </div>
      </div>
      <img
        src="/images/plane.svg"
        alt="Plane"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 opacity-80"
      />
      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-50 h-1/3 flex justify-center items-center">
        {/* Placeholder untuk DestinationCard */}
      </div>
    </section>
  );
};

export default HeroSection;