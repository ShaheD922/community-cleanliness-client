import React, { useEffect, useState } from "react";

const CommunityStats = () => {
  const [stats, setStats] = useState({ users: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/stats") // server থেকে total users, resolved, pending
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-8 bg-green-100 p-6 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Community Stats</h2>
      <div className="flex justify-around flex-wrap gap-4">
        <div>
          <p className="text-3xl font-bold">{stats.users}</p>
          <p>Total Users</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{stats.resolved}</p>
          <p>Issues Resolved</p>
        </div>
        <div>
          <p className="text-3xl font-bold">{stats.pending}</p>
          <p>Issues Pending</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
