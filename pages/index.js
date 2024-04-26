import React, { useState, useRef, useEffect } from "react";
import Document from "./document";
import StartCard from "./components/StartCard";
import Footer from "./components/Footer";
import Question from "./components/Question";
import questions from "./../database/questions";
import HighScores from "./components/HighScores";
import AllDone from "./components/AllDone";
import Github from "./components/Github";
import TimeUp from "./components/TimeUp";
import Navbar from "./components/navbar";
import Blog from "./components/blog";
const Home = () => {

  return (
    <div className="h-screen bg-skin-gray">
      <Document />
     <Navbar/>
    <Blog/>
    </div>
  );
};

export default Home;
