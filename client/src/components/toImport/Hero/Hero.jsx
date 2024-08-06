import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className='hero-text'>
       <p>This is the Hero text</p>
      </div>
      <div className='hero-container-image'>
        <div className="hero-image">
          <img
            src='/images/Hero.jpeg'
            alt="Hero"
          />
          <div className="hero-overlay">
            <img
              src='/images/HeroTopImage.png'
              alt="Hero"
              className="hero-overlay-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;