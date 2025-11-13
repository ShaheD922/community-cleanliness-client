import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/models")
      .then(res => res.json())
      .then(data => {
        setIssues(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8 text-xl">Loading issues...</p>;
  if (!issues.length) return <p className="text-center mt-8 text-xl">No issues found!</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map(issue => (
        <div key={issue._id} className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition">
          <img
            src={issue.image || "https://via.placeholder.com/400x250"}
            alt={issue.title}
            className="rounded-xl w-full h-52 object-cover"
          />
          <h2 className="text-xl font-semibold mt-3">{issue.title}</h2>
          <p className="text-gray-600 mt-1">{issue.category}</p>
          <p className="text-sm text-gray-500 mt-1">📍 {issue.location || "Unknown"}</p>
          <p className="text-sm text-gray-500">💰 {issue.amount || "N/A"}</p>

          <button
            onClick={() => navigate(`/issue/${issue._id}`)}
            className="mt-3 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            See Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllIssues;
