import React from "react";

const StartCard = ({handleState, handleTimerStart}) => {
  return (
    <div className="flex flex-col justify-center h-[90vh]">
      <div className="lg:w-6/12 w-10/12 mx-auto px-10 py-16 outline outline-black outline-2 rounded-3xl shadow-2xl">
        <h1 className="font-black font-Inter mb-6 drop-shadow-sm">
          Assesment pengukuran keborosan
        </h1>
        <p className=" font-medium drop-shadow-sm mb-5">
          Coba jawab pertanyaan berikut degan seksama
        </p>
        <p className=" font-medium drop-shadow-sm mb-4">
          Jangan lupa terdapat waktu terbatas
        </p>
        <button className="bg-skin-main text-white px-3 py-3 rounded-lg hover:bg-green-900 transition-all shadow-md" onClick={() => {handleState("quiz"); handleTimerStart();}}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartCard;
