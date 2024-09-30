import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Slider.css";

const Slider = ({ sliderItems, time }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === sliderItems.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev) => prev + 1);
      }
    }, time || 3000); // Default 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, sliderItems.length, time]);

  return (
    <section className="slider">
      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {sliderItems.map((sliderItem, index) => (
            <div
              className="slider-item"
              key={index}
              style={{ backgroundImage: `url(${sliderItem.image})` }}
            >
              <div className="text">
                <h1>{sliderItem.title}</h1>
                <p>{sliderItem.description}</p>
                <Link to={sliderItem.path}>{sliderItem.pathname}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {sliderItems.map((_, index) => (
          <span
            onClick={() => setActiveIndex(index)}
            key={index}
            className={`pagination-item ${
              activeIndex === index ? "active" : ""
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

Slider.propTypes = {
  sliderItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      path: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    })
  ).isRequired,
  time: PropTypes.number,
};

export default Slider;
