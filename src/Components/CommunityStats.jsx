import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const CommunityStats = () => {
  const [stats, setStats] = useState({ users: 0, resolved: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <button className="btn loading btn-primary">Loading...</button>
      </div>
    );
  }

  return (
    <section
      className="my-12 px-4 md:px-10 lg:px-20 py-12 rounded-2xl shadow-xl 
        bg-gradient-to-r from-green-700 via-green-500 to-green-500"
    >
      
      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-white">
        <Typewriter
          words={["Community Stats"]}
          loop={1}
          cursor={false}
          typeSpeed={50}
        />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <Zoom>
          <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p className="text-4xl font-bold text-green-700">
              <Typewriter
                words={[stats.users.toString()]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
            <p className="mt-3 text-lg font-medium text-gray-600">
              <Typewriter
                words={["Total Users"]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
          </div>
        </Zoom>

        <Zoom delay={200}>
          <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p className="text-4xl font-bold text-green-700">
              <Typewriter
                words={[stats.resolved.toString()]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
            <p className="mt-3 text-lg font-medium text-gray-600">
              <Typewriter
                words={["Issues Resolved"]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
          </div>
        </Zoom>

        <Zoom delay={400}>
          <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <p className="text-4xl font-bold text-green-700">
              <Typewriter
                words={[stats.pending.toString()]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
            <p className="mt-3 text-lg font-medium text-gray-600">
              <Typewriter
                words={["Issues Pending"]}
                loop={1}
                cursor={false}
                typeSpeed={50}
              />
            </p>
          </div>
        </Zoom>
      </div>
    </section>
  );
};

export default CommunityStats;
