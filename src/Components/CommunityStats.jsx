import React, { useEffect, useState } from "react";

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
    <section className="my-12 px-4 md:px-10 lg:px-20 py-12 rounded-2xl shadow-xl 
        bg-gradient-to-r from-green-400 via-green-300 to-green-500">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-emerald-700">
        Community Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <p className="text-4xl font-bold text-green-700">{stats.users}</p>
          <p className="mt-3 text-lg font-medium text-gray-600">Total Users</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <p className="text-4xl font-bold text-green-700">{stats.resolved}</p>
          <p className="mt-3 text-lg font-medium text-gray-600">Issues Resolved</p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <p className="text-4xl font-bold text-green-700">{stats.pending}</p>
          <p className="mt-3 text-lg font-medium text-gray-600">Issues Pending</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
//