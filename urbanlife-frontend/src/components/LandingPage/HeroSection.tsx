import SearchForm from "./SearchForm";

const HeroSection = () => {
  return (
    <section className="hero min-h-screen bg-teal-100 relative overflow-hidden">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          {/* Teks utama akan ditambahkan nanti */}
          <SearchForm />
        </div>
      </div>
      <img
        src="/images/plane.svg"
        alt="Plane"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 opacity-80"
      />
    </section>
  );
};

export default HeroSection;