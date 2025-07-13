import { useState } from "react";

import Slide from "./Slide";

function Welcome() {
  return (
    <>
      <Slide />

     
      <section
        id="Home"
        className="relative w-full h-screen bg-white overflow-hidden px-6 md:px-12 py-12 pt-[120px] text-center"
      >
       
        <div className="relative z-10 mt-16 max-w-xl text-left text-gray-800 mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-lime-700 mb-4">
            Sip Natural, Feel Better!
          </h1>
          <h2 className="text-xl sm:text-2xl mb-6">
            Herbal Tea for every Moment
          </h2>
          <button
            onClick={() => console.log("Explore clicked")}
            aria-label="Explore herbal tea"
            className="bg-lime-300 hover:bg-lime-700 hover:text-white text-gray-900 font-semibold text-lg px-8 py-3 rounded-full transition-all"
          >
            Explore
          </button>
        </div>

        
        <div className="absolute top-1/4 right-12 w-40 h-40 rounded-full bg-lime-700 text-white flex items-center justify-center p-4 z-20 shadow-lg">
          <p className="text-sm sm:text-base font-bold text-center leading-tight">
            100%<br />Original<br />Ingredients
          </p>
        </div>

       
        <img
          src="/Images/Tea1.png"
          alt="A steaming cup of herbal tea with natural ingredients"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-h-[60%] object-contain z-0"
        />
      </section>
    </>
  );
}

export default Welcome;