import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RecentComplaints = () => {
  const [issues, setIssues] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/models")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error(err));
  }, []);

  const displayedIssues = showAll ? issues : issues.slice(0, 9);

  return (
    <section className="my-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold mb-8 text-green-700 text-center dark:text-green-400">
        Recent Complaints
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedIssues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md dark:shadow-gray-900 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
          
            {issue.image ? (
              <img
                src={issue.image}
                alt={issue.title || "Issue image"}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-52 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-300 text-sm">
                No Image
              </div>
            )}

           
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {issue.title || "Untitled Issue"}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                {issue.description || "No description provided."}
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <p>
                  <span className="font-medium text-green-700 dark:text-green-400">
                    Category:
                  </span>{" "}
                  {issue.category || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-green-700 dark:text-green-400">
                    Location:
                  </span>{" "}
                  {issue.location || "Unknown"}
                </p>
              </div>

              <button
                onClick={() => navigate(`/issue/${issue._id}`)}
                className="w-full bg-green-700 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white py-2.5 rounded-lg font-medium transition-all duration-300"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {issues.length > 9 && !showAll && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="bg-green-700 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white px-8 py-3 rounded-full font-medium shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            View All
          </button>
        </div>
      )}
    </section>
  );
};

export default RecentComplaints;
