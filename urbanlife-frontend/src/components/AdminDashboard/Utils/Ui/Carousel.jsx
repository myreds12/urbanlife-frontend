import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import "./Carousel.css";

const Carousel = ({ items, renderItem }) => {
  const options = {
    loop: true,
    dragFree: false,
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    speed: 5, // Transisi lebih lambat
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  // Event listener wheel dihapus untuk menonaktifkan scroll mouse
  useEffect(() => {
    if (!emblaApi) return;
    // Tidak ada logika wheel, sehingga scroll mouse tidak memengaruhi carousel
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, index) => (
            <div className="embla__slide" key={index}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;