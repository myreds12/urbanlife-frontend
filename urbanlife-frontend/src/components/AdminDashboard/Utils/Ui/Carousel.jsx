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
    speed: 10,
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  useEffect(() => {
    if (!emblaApi) return;

    let lastWheelEvent = 0;
    const throttleDelay = 300; // Throttle setiap 300ms

    const handleWheel = (event) => {
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelEvent < throttleDelay) return;
      lastWheelEvent = now;

      const wheelDelta = event.deltaX || event.deltaY;
      const threshold = 50; // Ambang batas untuk sensitivitas scroll
      if (wheelDelta > threshold) {
        emblaApi.scrollNext();
      } else if (wheelDelta < -threshold) {
        emblaApi.scrollPrev();
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