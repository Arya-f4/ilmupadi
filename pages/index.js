import React, { useState, useRef, useEffect } from "react";
import Document from "./document";
import Footercomponent from "./components/Footer";
import Navbar from "./components/navbar";
import Blog from "./components/blog";
import Hero from "./components/Hero";
const Home = () => {

  return (
    <div className="h-full bg-skin-gray">
      <Document />
     <Navbar/>
     <Hero/>
    <Blog/>
    <Footercomponent/>
    </div>
  );
};

export default Home;
