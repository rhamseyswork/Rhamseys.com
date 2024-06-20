import { useState } from 'react'
import slides from './SlideShowIndex';
import { FaArrowRight, FaArrowLeft, FaCircle, FaRegCircle } from "react-icons/fa";
import './slideshow.module.css'


const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleArrowClick = (arrowCount) => {
    setCurrentSlide((prevSlide) => (prevSlide + arrowCount + slides.length) % slides.length);
  };

  return (
    <div className="slideshow-module">
      <span className="slideshow-module-movement">
        <div className="slideshow-module-image">
          <img src={slides[currentSlide]} alt="SlideShowWheel" />
        </div>
        <button className="slideshow-module-curr-mod left" onClick={() => handleArrowClick(-1)}>
          <FaArrowLeft />
        </button>
        <button className="slideshow-module-curr-mod right" onClick={() => handleArrowClick(1)}>  
          <FaArrowRight />
        </button>
      </span>
      <div className="slideshow-module-curr-sl">
        {slides.slice(0, 5).map((slide, index) => (
          <span key={index} className="slide-item">
            {index === currentSlide ? <FaCircle /> : <FaRegCircle />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
