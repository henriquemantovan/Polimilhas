import React, { useState } from "react";
import R100 from "../../images/R100-removebg-preview.png";
import R300 from "../../images/R300-removebg-preview.png";
import R500 from "../../images/R500-removebg-preview.png";
import R1000 from "../../images/R1000-removebg-preview.png";
import R1500 from "../../images/R1500-removebg-preview.png";

import "./Carousel.css";

const Carousel: React.FC = () => {
  const [position, setPosition] = useState<number>(1);

  const items = [
    { image: R100, tokens: "1000 Tokens" },
    { image: R300, tokens: "2800 Tokens" },
    { image: R500, tokens: "4500 Tokens" },
    { image: R1000, tokens: "8500 Tokens" },
    { image: R1500, tokens: "12500 Tokens" },
  ];

  const handleItemClick = (index: number): void => {
    setPosition(index + 1);
  };

  
  return (
    <div className="carousel-container">
      <main
        id="carousel"
        style={{ "--position": position } as React.CSSProperties}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${position === index + 1 ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
          
          >
            <img src={item.image} alt={`Item ${index + 1}`} />
            <p className="item-text">{item.tokens}</p>
            <button className="item-button"
                    onClick={() => alert("oi")}
            >Resgate seu cupom
            </button>
          </div>
        ))}
      </main>
      <div className="dots">
        {items.map((_, index) => (
          <div
            key={index}
            className={`dot ${position === index + 1 ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
  
};

export default Carousel;
