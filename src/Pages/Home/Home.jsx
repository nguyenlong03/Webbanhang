
import './Home.scss';
import React from "react";
import SimpleSlider from "../../Components/Slide/Slide";
import HomeCart from "../../Components/HomeCart/HomeCart";
import Filter from '../../Components/Filter/Filter';

const Home = () => {
  return <div className="Home-container">
    <div className="home-sile">
     <SimpleSlider/>
    </div>

    <div className="home-cart">
    <HomeCart/>
    </div>
    
    <div className="filter-cart">
    <Filter/>
    <HomeCart/>
    </div>

  </div>;
};

export default Home;
