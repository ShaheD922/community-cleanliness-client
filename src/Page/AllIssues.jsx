import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import LoadingPage from "../Components/LoadingPage"; 

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
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

  if (loading) return <LoadingPage />;

  if (!issues.length)
    return <p className="text-center mt-8 text-xl">No issues found!</p>;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.2)", transition: { duration: 0.3 } }
  };

  const displayedIssues = showAll ? issues : issues.slice(0, 6);

  return (
    <div className="p-6">
     
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">All Issues</h1>

 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedIssues.map(issue => (
          <motion.div
            key={issue._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <img
              src={issue.image || "https://via.placeholder.com/400x250"}
              alt={issue.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{issue.title}</h2>
                <p className="text-gray-600 mt-1"><span className="font-bold">Category :</span> {issue.category}</p>
                <p className="text-sm text-gray-500 mt-1"><span className="font-bold">Location :</span> {issue.location || "Unknown"}</p>
                <p className="text-sm text-gray-500 mt-1"><span className="font-bold">Price : </span>${issue.amount || "none"}</p>
              </div>
              <button
                onClick={() => navigate(`/issue/${issue._id}`)}
                className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                See Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      
      {!showAll && issues.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors duration-300"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllIssues;
