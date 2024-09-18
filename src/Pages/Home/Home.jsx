import React from "react";
import HomeCart from "../../components/HomeCart/HomeCart";
import SimpleSlider from "../../components/Slider/Slider";

const Home = () => {
  return <div className="Home-container">
    <div className="home-slide">
      <SimpleSlider/>
    </div>
    <div className="home-cart">
     <HomeCart/>
    </div>
    <div className="home-fillter">
       
    </div>
    <div className="home-producs">

    </div>

  </div>;
};

export default Home;
