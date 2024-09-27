import "./Home.scss";
import "./Home.scss";
import React from "react";
import SimpleSlider from "../../Components/Slide/Slide";
import SwipeToSlide from "../../Components/Scroolcart/Scroolcart";
import HomeCart from "../../Components/HomeCart/HomeCart";

const Home = () => {
  return (
    <div className="Home-container">
      <div className="home-sile">
        <SimpleSlider />
      </div>

      <div className="sell-products">
        <SwipeToSlide />
      </div>

      <div className="products">
        <HomeCart />
      </div>
    </div>
  );
};

export default Home;
