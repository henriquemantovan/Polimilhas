import React, { useState } from "react";
import "./Carousel.css"; 

const Carousel: React.FC = () => {
  const [position, setPosition] = useState<number>(1); 

  const handleRadioChange = (newPosition: number): void => {
    setPosition(newPosition);
  };

  return (
    <div className="carousel-container">
      <input
        type="radio"
        name="position"
        checked={position === 1}
        onChange={() => handleRadioChange(1)}
      />
      <input
        type="radio"
        name="position"
        checked={position === 2}
        onChange={() => handleRadioChange(2)}
      />
      <input
        type="radio"
        name="position"
        checked={position === 3}
        onChange={() => handleRadioChange(3)}
      />
      <input
        type="radio"
        name="position"
        checked={position === 4}
        onChange={() => handleRadioChange(4)}
      />
      <input
        type="radio"
        name="position"
        checked={position === 5}
        onChange={() => handleRadioChange(5)}
      />

      <main id="carousel" style={{ "--position": position } as React.CSSProperties}>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
      </main>
    </div>
  );
};

export default Carousel;
