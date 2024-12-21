import React, { useState } from "react";
import R100 from "../../images/R100-removebg-preview.png";
import R300 from "../../images/R300-removebg-preview.png";
import R500 from "../../images/R500-removebg-preview.png";
import R1000 from "../../images/R1000-removebg-preview.png";
import R1500 from "../../images/R1500-removebg-preview.png";

import "./Carousel.css";
import {useNftFunctions} from "../utils/tokenNFTfunctions";



const Carousel: React.FC = () => {

  const [position, setPosition] = useState<number>(1);

  const items = 
  [
    {id: 4, image: R100, tokens: "50 Tokens" },
    {id: 5, image: R300, tokens: "140 Tokens" },
    {id: 6, image: R500, tokens: "225 Tokens" },
    {id: 7, image: R1000, tokens: "425 Tokens" },
    {id: 8, image: R1500, tokens: "625 Tokens" },
  ];

  const handleItemClick = (index: number): void => {
    setPosition(index + 1);
  };

  const {buyNft} = useNftFunctions()
  const HandleCompra = async(itemID:number)=>{
    try {const produto = await buyNft(itemID)}
    catch (error){
      console.error('erro', error);
    }
  }



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
                    onClick={() => HandleCompra(item.id)}
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
