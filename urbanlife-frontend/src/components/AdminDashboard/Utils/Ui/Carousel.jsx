import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import "./Carousel.css";

const Carousel = ({ items, renderItem }) => {
  const options = {
    loop: false,
    dragFree: false, // Tetap nonaktif untuk kontrol snap
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    speed: 2, // Kecepatan animasi lebih lambat
    skipSnaps: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);
  const dragTimeout = useRef(null);

  useEffect(() => {
    if (!emblaApi) return;

    const handleDragStart = () => {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
      }
    };

    const handleDragEnd = () => {
      // Tambahkan delay sebelum animasi selesai
      dragTimeout.current = setTimeout(() => {
        emblaApi.scrollTo(emblaApi.selectedScrollSnap());
      }, 200); // Delay 200ms untuk mengurangi kecepatan pergeseran
    };

    emblaApi.on("dragStart", handleDragStart);
    emblaApi.on("dragEnd", handleDragEnd);

    // Hapus event listener wheel
    return () => {
      emblaApi.off("dragStart", handleDragStart);
      emblaApi.off("dragEnd", handleDragEnd);
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
      }
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