import React from "react";

const VolunteerCTA = () => {
  return (
    <section className="my-12 px-6 md:px-20 py-16 rounded-2xl shadow-xl 
        bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-white text-center
        animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-emerald-900 
          animate-bounce">
        Join the Clean Drive!
      </h2>
      <p className="mb-8 text-lg md:text-xl">
        Become a volunteer and help keep your community clean and green.
      </p>
      <button
        className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold 
          hover:bg-gray-200 transition transform hover:scale-105 hover:shadow-lg 
          motion-safe:animate-pulse"
      >
        Join Now
      </button>
    </section>
  );
};

export default VolunteerCTA;
