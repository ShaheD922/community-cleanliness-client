import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RecentComplaints = () => {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/models?limit=6") // latest 6 issues
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Recent Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div key={issue._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{issue.title}</h3>
            <p className="text-gray-600 truncate">{issue.description}</p>
            <p className="text-sm mt-1">
              Category: {issue.category || "N/A"} | Location: {issue.location || "Unknown"}
            </p>
            <button
              onClick={() => navigate(`/issue/${issue._id}`)}
              className="mt-2 bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentComplaints;
