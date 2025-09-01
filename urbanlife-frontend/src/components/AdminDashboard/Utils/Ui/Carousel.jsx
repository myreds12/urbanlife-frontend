import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import './Carousel.css';

const Carousel = ({ items, renderItem, gap = 20 }) => {
  const options = {
    loop: true,
    dragFree: true,
    align: 'start',
    containScroll: 'keepSnaps',
    slidesToScroll: 1,
    watchSlides: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
    ClassNames()
  ]);

  // tambah padding kanan-kiri biar seam ga dempet
  const containerStyle = {
    display: 'flex',
    gap: `${gap}px`,
    padding: `0 ${gap / 2}px`, // padding simetris biar first-last dapet gap pas clone
    margin: 0, // reset margin
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" style={containerStyle}>
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