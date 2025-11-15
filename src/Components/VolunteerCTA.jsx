import React from "react";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const VolunteerCTA = () => {
  return (
    <section className="my-12 px-6 md:px-20 py-16 rounded-2xl shadow-xl 
        bg-gradient-to-r from-green-700 via-green-500 to-green-500 text-white text-center">
      

      <Zoom duration={800}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          <Typewriter
            words={["Join the Clean Drive!"]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={100}
            deleteSpeed={50}
          />
        </h2>
      </Zoom>

   
      <Zoom delay={300} duration={800}>
        <p className="mb-8 text-lg md:text-xl">
          <Typewriter
            words={["Become a volunteer and help keep your community clean and green"]}
            loop={1}
            cursor
            cursorStyle=""
            typeSpeed={50}
          />
        </p>
      </Zoom>

      
      <Zoom delay={600} duration={800}>
        <button
          className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold 
            hover:bg-gray-200 transition transform hover:scale-105 hover:shadow-lg 
            motion-safe:animate-pulse"
        >
          Join Now
        </button>
      </Zoom>
    </section>
  );
};

export default VolunteerCTA;
