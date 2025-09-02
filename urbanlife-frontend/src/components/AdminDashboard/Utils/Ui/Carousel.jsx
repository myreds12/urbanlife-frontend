import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import "./Carousel.css";

const Carousel = ({ items, renderItem }) => {
  const options = {
    loop: true,
    dragFree: false,
    align: "start",
    containScroll: "keepSnaps",
    slidesToScroll: 1,
    speed: 10,
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  // Enable mouse wheel scrolling
  useEffect(() => {
    if (!emblaApi) return;

    const handleWheel = (event) => {
      event.preventDefault();
      const wheelDelta = event.deltaX || event.deltaY; // Support both horizontal and vertical scroll
      if (wheelDelta > 0) {
        emblaApi.scrollNext(); // Scroll right/down
      } else if (wheelDelta < 0) {
        emblaApi.scrollPrev(); // Scroll left/up
      }
    };

    const viewport = emblaApi.containerNode().parentElement;
    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
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
