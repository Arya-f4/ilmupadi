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

const Home = () => {

  return (
    <div className="h-screen">
      <Document />
      <div className=" bg-skin-main py-5 px-7 flex items-center justify-between shadow-lg fixed w-screen top-0 z-40">
        <div className="flex items-center">
          <p
            className="text-left text-white font-light mr-3 cursor-pointer hover:text-gray-200 transition-all"
            onClick={() => {
              handleState("highscore");
            }}
          >
            View HighScores
          </p>
          <i className="fas fa-hand-point-left fa-lg text-white"></i>
        </div>
        <p className="text-right text-white font-light">Time: 00:{time / 1000}</p>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className=" justify-center">
          {state === "start" && (
            <StartCard
              handleState={handleState}
              handleTimerStart={handleTimerStart}
            />
          )}
          {state === "quiz" && (
            <Question
              questionText={questions[questionNo].questionText}
              options={questions[questionNo].options}
              answer={questions[questionNo].answer}
              handleQuestion={handleQuestion}
              handleState={handleState}
              handleScore={handleScore}
              handleWrongAnswer={handleWrongAnswer}
            />
          )}
          {state === "highscore" && (
            <HighScores
              handleState={handleState}
              highScore={highScore}
              hadleClearHighScore={hadleClearHighScore}
            />
          )}
          {state === "done" && (
            <AllDone
              score={score}
              handleHighScore={handleHighScore}
              handleState={handleState}
              handleReset={handleReset}
            />
          )}
          {state === "timeup" && (
            <TimeUp
              handleState={handleState}
            />

          )}
        </div>
        <Github />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
