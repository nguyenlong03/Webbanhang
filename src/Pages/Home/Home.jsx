
import './Home.scss';
import React from "react";
import SimpleSlider from "../../components/Slide/Slide";
import HomeCart from "../../components/HomeCart/HomeCart";

const Home = () => {
  return <div className="Home-container">
    <div className="home-sile">
     <SimpleSlider/>
    </div>

    <div className="home-cart">
    <HomeCart/>
    </div>
    

  </div>;
};

export default Home;
