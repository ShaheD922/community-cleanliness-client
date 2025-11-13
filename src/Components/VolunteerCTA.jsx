import React from "react";

const VolunteerCTA = () => {
  return (
    <section className="my-8 bg-green-700 text-white p-8 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Join the Clean Drive!</h2>
      <p className="mb-4">
        Become a volunteer and help keep your community clean and green.
      </p>
      <button className="bg-white text-green-700 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
        Join Now
      </button>
    </section>
  );
};

export default VolunteerCTA;
