import "./Home.scss";
import React from "react";
import SimpleSlider from "../../Components/Slide/Slide";
import HomeCart from "../../Components/HomeCart/HomeCart";
import SwipeToSlide from "../../Components/Scroolcart/Scroolcart";
const Home = () => {
  return (
    <div className="Home-container">
      <div className="home-sile">
        <SimpleSlider />
      </div>
      <div className="home-cart">
        <SwipeToSlide />
      </div>
      <div className="filter-cart">
        <HomeCart />
      </div>
    </div>
  );
};

export default Home;
